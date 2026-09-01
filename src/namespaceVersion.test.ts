import { namespaceMatchesVersion } from './namespaceVersion';

describe('namespaceMatchesVersion', () => {
  const v1Namespace = {
    render: jest.fn(),
    destroy: jest.fn(),
    submit: jest.fn(),
    validate: jest.fn(),
  };

  const v3Namespace = {
    ...v1Namespace,
    handle3DSChallenge: jest.fn(),
  };

  it('returns true for v1/v2-compatible namespaces without handle3DSChallenge', () => {
    expect(namespaceMatchesVersion(v1Namespace, 'v1')).toBe(true);
    expect(namespaceMatchesVersion(v1Namespace, 'v2')).toBe(true);
  });

  it('returns false for v3 when handle3DSChallenge is missing', () => {
    expect(namespaceMatchesVersion(v1Namespace, 'v3')).toBe(false);
  });

  it('returns true for v3 when handle3DSChallenge is present', () => {
    expect(namespaceMatchesVersion(v3Namespace, 'v3')).toBe(true);
  });

  it('returns false for v1/v2 when handle3DSChallenge is present', () => {
    expect(namespaceMatchesVersion(v3Namespace, 'v1')).toBe(false);
    expect(namespaceMatchesVersion(v3Namespace, 'v2')).toBe(false);
  });
});
