const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src');

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import RaisedButton from '@guestyci/foundation/RaisedButton' are tree-shakeable.
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob
    .sync('**/index.js', { cwd: from })
    .map(path.dirname);

  await Promise.all(
    directoryPackages.map(async (directoryPackage) => {
      const packageJson = {
        sideEffects: false,
        module: path.join('../esm', directoryPackage, 'index.js'),
      };
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      const [typingsExist] = await Promise.all([
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
      ]);

      return packageJsonPath;
    })
  );
}

async function createPackageFile() {
  const packageData = await fse.readFile(
    path.resolve(packagePath, './package.json'),
    'utf8'
  );
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);
  const newPackageData = {
    ...packageDataOther,
    private: false,
    main: './index.js',
    module: './esm/index.js',
  };
  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(
    targetPath,
    JSON.stringify(newPackageData, null, 2),
    'utf8'
  );
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData) {
  const license = `/** @license Guesty v${packageData.version}
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    ['./index.js', './esm/index.js', './umd/production.min.js'].map(
      async (file) => {
        try {
          await prepend(path.resolve(buildPath, file), license);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log(`Skipped license for ${file}`);
          } else {
            throw err;
          }
        }
      }
    )
  );
}

async function run() {
  try {
    await createModulePackages({ from: srcPath, to: buildPath });
    const packageData = await createPackageFile();
    await Promise.all(
      [
        './README.md',
        './CHANGELOG.md',
        './.npmignore',
        './.npmrc',
        './.gitignore',
      ]
        .filter((file) => fse.existsSync(file))
        .map((file) => includeFileInBuild(file))
    );

    await addLicense(packageData);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
