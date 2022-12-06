import {
  findScriptElement,
  injectScriptElement,
  getEnv,
  getScriptUrl,
} from './utils';

const namespace = 'guestyTokenization';

/**
 *
 * @param apiKey
 * @returns {Promise<Object>} reference to the global window Guesty Tokenization object
 */

export const loadScript = (apiKey: string) => {
  if (!apiKey) {
    return Promise.reject(new Error('API key is required'));
  }

  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  const existingNamespace = window[namespace];
  const env = getEnv(apiKey);
  const url = getScriptUrl(env);

  if (findScriptElement(url) && existingNamespace) {
    return Promise.resolve(existingNamespace);
  }

  return new Promise((resolve, reject) => {
    injectScriptElement({
      apiKey,
      url,
      onSuccess: () => {
        const newNamespace = window[namespace];

        if (newNamespace) {
          resolve(newNamespace);
        } else {
          reject(new Error('Guesty Tokenization is not available'));
        }
      },
      onError: () => {
        reject(new Error(`The script ${url} failed to load`));
      },
    });
  });
};
