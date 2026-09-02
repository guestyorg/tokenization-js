export const findScriptElement = (url: string, sandbox = false) => {
  const scripts = document.querySelectorAll(`script[src="${url}"]`);

  for (let index = 0; index < scripts.length; index += 1) {
    const script = scripts.item(index);

    if (!script) {
      continue;
    }

    const isSandboxScript = script.getAttribute('data-env') === 'sandbox';

    if (isSandboxScript === sandbox) {
      return script;
    }
  }

  return null;
};

export interface InjectScriptElementOptions {
  url: string;
  sandbox: boolean;
  onSuccess: () => void;
  onError: () => void;
}

export const injectScriptElement = ({
  url,
  sandbox,
  onSuccess,
  onError,
}: InjectScriptElementOptions) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.onerror = onError;
  script.onload = onSuccess;

  if (sandbox) {
    script.setAttribute('data-env', 'sandbox');
  }

  document.head.insertBefore(script, document.head.firstElementChild);
};
