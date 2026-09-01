import { findScriptElement, injectScriptElement } from './utils';
import {
  clearMismatchedNamespace,
  namespaceMatchesVersion,
} from './namespaceVersion';
import { NAMESPACE } from './constants';
import { LoadScriptOptions } from '../types';

export const loadScript = (options: LoadScriptOptions = {}) => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  const version = options.version ?? 'v1';
  const sandbox = options.sandbox ?? false;
  const scriptUrl = `https://pay.guesty.com/tokenization/${version}/init.js`;

  const existingScript = findScriptElement(scriptUrl, sandbox);
  const existingNamespace = window[NAMESPACE];

  if (
    existingScript &&
    existingNamespace &&
    namespaceMatchesVersion(existingNamespace, version)
  ) {
    return Promise.resolve(existingNamespace);
  }

  if (existingScript) {
    existingScript.remove();
  }

  clearMismatchedNamespace(version);

  return new Promise((resolve, reject) => {
    injectScriptElement({
      url: scriptUrl,
      sandbox,
      onSuccess: () => {
        const newNamespace = window[NAMESPACE];

        if (newNamespace && namespaceMatchesVersion(newNamespace, version)) {
          resolve(newNamespace);
          return;
        }

        if (newNamespace) {
          delete window[NAMESPACE];
        }

        reject(new Error('Guesty Tokenization is not available'));
      },
      onError: () => {
        reject(new Error(`The script ${scriptUrl} failed to load`));
      },
    });
  });
};
