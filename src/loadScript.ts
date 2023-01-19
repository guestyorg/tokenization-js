import { findScriptElement, injectScriptElement, getScriptUrl } from './utils';

export interface LoadScriptOptions {
  env?: string;
}

const namespace = 'guestyTokenization';

export const loadScript = (options: LoadScriptOptions = {}) => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  const existingNamespace = window[namespace];
  const env = options.env || 'production';
  const url = getScriptUrl(env);

  if (findScriptElement(url) && existingNamespace) {
    return Promise.resolve(existingNamespace);
  }

  return new Promise((resolve, reject) => {
    injectScriptElement({
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
