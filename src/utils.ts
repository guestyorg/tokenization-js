export const getEnv = (apiKey: string) =>
  apiKey.split('_').slice(0, -1)[1] || 'production';

export const getScriptUrl = (env: string) => {
  return env === 'production'
    ? 'https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js'
    : `https://d2g7j5hs6q3xyb.cloudfront.net/branches/${env}/guesty-pay/static/v1.js`;
};

export const findScriptElement = (url: string) => {
  return document.querySelector(`script[src="${url}"]`);
};

export interface InjectScriptElementOptions {
  apiKey: string;
  url: string;
  onSuccess: () => void;
  onError: () => void;
}

export const injectScriptElement = ({
  apiKey,
  url,
  onSuccess,
  onError,
}: InjectScriptElementOptions) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.setAttribute('data-guesty-tok-key', apiKey);
  script.onerror = onError;
  script.onload = onSuccess;

  document.head.appendChild(script);
};
