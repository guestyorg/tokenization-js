import { findScriptElement, injectScriptElement } from './utils';
import { NAMESPACE, SCRIPT_URL } from './constants';
import { LoadScriptOptions } from '../types';

export const loadScript = (options: LoadScriptOptions = {}) => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  const existingScript = findScriptElement(SCRIPT_URL);
  const existingNamespace = window[NAMESPACE];
  if (existingScript) {
    if (existingNamespace) {
      return Promise.resolve(existingNamespace);
    }
    existingScript.remove();
  }

  return new Promise((resolve, reject) => {
    injectScriptElement({
      url: SCRIPT_URL,
      sandbox: options.sandbox ?? false,
      onSuccess: () => {
        const newNamespace = window[NAMESPACE];

        if (newNamespace) {
          resolve(newNamespace);
        } else {
          reject(new Error('Guesty Tokenization is not available'));
        }
      },
      onError: () => {
        reject(new Error(`The script ${SCRIPT_URL} failed to load`));
      },
    });
  });
};
