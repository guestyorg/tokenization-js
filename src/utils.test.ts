import {
  findScriptElement,
  getEnv,
  injectScriptElement,
  getScriptUrl,
} from './utils';

describe('findScriptElement', () => {
  it('should return null if no script element is found', () => {
    const url =
      'https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js';
    const script = findScriptElement(url);

    expect(script).toBeNull();
  });

  it('should return the script element if it is found', () => {
    const url =
      'https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js';
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.setAttribute('data-guesty-tok-key', '123');
    document.head.appendChild(script);

    const foundScript = findScriptElement(url);

    expect(foundScript).toBe(script);
  });
});

describe('getEnv', () => {
  it('should return the env if it is present in the key', () => {
    const apiKey = 'pk_test_123';
    const env = getEnv(apiKey);

    expect(env).toBe('test');
  });

  it('should return `production` if the env is not found in the key', () => {
    const apiKey = 'pk_123';
    const env = getEnv(apiKey);

    expect(env).toBe('production');
  });
});

describe('getScriptUrl', () => {
  it('should return the production url if env is production', () => {
    const url = getScriptUrl('production');

    expect(url).toBe(
      'https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js'
    );
  });

  it('should return the env url if an env is not production', () => {
    const url = getScriptUrl('test');

    expect(url).toBe(
      'https://d2g7j5hs6q3xyb.cloudfront.net/branches/test/guesty-pay/static/v1.js'
    );
  });
});

describe('injectScriptElement', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('should inject a script element', () => {
    const apiKey = ' pk_123';
    const url =
      'https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js';
    const onSuccess = jest.fn();
    const onError = jest.fn();

    injectScriptElement({ apiKey, url, onSuccess, onError });

    const script = document.head.querySelector('script');
    if (!script) {
      throw new Error('Script element not found');
    }

    expect(script).toBeInstanceOf(HTMLScriptElement);
    expect(script.src).toBe(url);
    expect(script.async).toBe(true);
    expect(script.getAttribute('data-guesty-tok-key')).toBe(apiKey);
    expect(script.onerror).toBe(onError);
    expect(script.onload).toBe(onSuccess);
  });
});
