import { loadScript } from './loadScript';
import * as utils from './utils';

const namespace = 'guestyTokenization';

describe('loadScript', () => {
  const injectScriptElementSpy = jest.spyOn(utils, 'injectScriptElement');
  const guestyTokenizationMock = {
    render: jest.fn(),
    destroy: jest.fn(),
    submit: jest.fn(),
    validate: jest.fn(),
  };

  beforeEach(() => {
    document.head.innerHTML = '';
  });

  afterEach(() => {
    injectScriptElementSpy.mockClear();
    delete window[namespace];
  });

  it('should return a promise', () => {
    expect(loadScript('123')).toBeInstanceOf(Promise);
  });

  it('should reject if no api key is provided', () => {
    // @ts-expect-error ignore invalid arguments error
    expect(loadScript()).rejects.toEqual(new Error('API key is required'));
  });

  it('should resolve with the global Guesty Tokenization object if it exists', async () => {
    document.head.innerHTML =
      '<script src="https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js" data-guesty-tok-key="123"></script>';
    window[namespace] = guestyTokenizationMock;

    const response = await loadScript('123');
    expect(injectScriptElementSpy).not.toHaveBeenCalled();
    expect(response).toEqual(guestyTokenizationMock);
  });

  it('should call injectScriptElement with the correct arguments', async () => {
    injectScriptElementSpy.mockImplementation(
      ({ onSuccess }: utils.InjectScriptElementOptions) => {
        window[namespace] = guestyTokenizationMock;

        process.nextTick(() => onSuccess());
      }
    );

    expect(window[namespace]).toBeUndefined();
    const response = await loadScript('123');
    expect(injectScriptElementSpy).toHaveBeenCalledWith({
      apiKey: '123',
      url: 'https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js',
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });
    expect(response).toEqual(window[namespace]);
  });

  it('should reject if the script fails to load', async () => {
    injectScriptElementSpy.mockImplementation(
      ({ onError }: utils.InjectScriptElementOptions) => {
        process.nextTick(() => onError());
      }
    );

    expect(window[namespace]).toBeUndefined();
    await expect(loadScript('123')).rejects.toEqual(
      new Error(
        'The script https://d2g7j5hs6q3xyb.cloudfront.net/production/guesty-pay/static/v1.js failed to load'
      )
    );
    expect(window[namespace]).toBeUndefined();
  });

  it('should reject if the script loaded but no guestyTokenization added on window', async () => {
    injectScriptElementSpy.mockImplementation(
      ({ onSuccess }: utils.InjectScriptElementOptions) => {
        process.nextTick(() => onSuccess());
      }
    );

    expect(window[namespace]).toBeUndefined();
    await expect(loadScript('123')).rejects.toEqual(
      new Error('Guesty Tokenization is not available')
    );
  });
});
