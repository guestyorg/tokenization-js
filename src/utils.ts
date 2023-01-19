export const getScriptUrl = (env: string) => {
  return env === 'production'
    ? 'https://pay.guesty.com/tokenization/js/v1.js'
    : `https://pay-${env}.guesty.com/tokenization/js/v1.js`;
};

export const findScriptElement = (url: string) => {
  return document.querySelector(`script[src="${url}"]`);
};

export interface InjectScriptElementOptions {
  url: string;
  onSuccess: () => void;
  onError: () => void;
}

export const injectScriptElement = ({
  url,
  onSuccess,
  onError,
}: InjectScriptElementOptions) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.onerror = onError;
  script.onload = onSuccess;

  document.head.appendChild(script);
};
