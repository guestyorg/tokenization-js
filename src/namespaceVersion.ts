import { NAMESPACE } from './constants';

type TokenizationVersion = 'v1' | 'v2' | 'v3';

const hasHandle3DSChallenge = (namespace: object) =>
  'handle3DSChallenge' in namespace;

export const namespaceMatchesVersion = (
  namespace: unknown,
  version: TokenizationVersion
): boolean => {
  if (!namespace || typeof namespace !== 'object') {
    return false;
  }

  if (version === 'v3') {
    return hasHandle3DSChallenge(namespace);
  }

  return !hasHandle3DSChallenge(namespace);
};

export const clearMismatchedNamespace = (version: TokenizationVersion) => {
  const existingNamespace = window[NAMESPACE];

  if (
    existingNamespace &&
    !namespaceMatchesVersion(existingNamespace, version)
  ) {
    delete window[NAMESPACE];
  }
};
