export interface GuestyTokenizationStyles {
  mobileBreakpoint?: number;
  fontFamily?: string;
  fontSizeMd?: number;
  fontSizeLg?: number;
  fontWeightRegular?: number;
  fontWeightBold?: number;
  colorText?: string;
  colorTextError?: string;
  colorBorder?: string;
  colorBorderError?: string;
  colorBorderHover?: string;
  colorPlaceholder?: string;
  colorBackground?: string;
  colorFormBackground?: string;
  colorBackgroundError?: string;
  colorBackgroundDisabled?: string;
  inputHeight?: number;
  inputPadding?: number;
  borderRadius?: number;
}

type Section = 'cardholderName' | 'paymentDetails' | 'billingAddress';

export interface GuestyTokenizationV1RenderOptions {
  containerId: string;
  providerId: string;
  amount: number;
  currency: string;
  onStatusChange?: (status: boolean) => void;
  styles?: GuestyTokenizationStyles;
  lang?: string;
  initialValues?: {
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  showInitialValuesToggle?: boolean;
  initialValuesToggleLabel?: string;
  sections?: Section[];
  showSupportedCards?: boolean;
  showPciCompliantLink?: boolean;
}

export interface GuestyTokenizationV2RenderOptions {
  containerId: string;
  providerId: string;
  onStatusChange?: (status: boolean) => void;
  styles?: GuestyTokenizationStyles;
  lang?: string;
  initialValues?: {
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  showInitialValuesToggle?: boolean;
  initialValuesToggleLabel?: string;
  sections?: Section[];
  showSupportedCards?: boolean;
  showPciCompliantLink?: boolean;
}

export interface GuestyTokenizationV2SubmitPayload {
  listingId: string;
  quoteId: string;
  amount: number;
  currency: string;
  guest: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
}

export interface PaymentMethod {
  _id: string;
}

export interface GuestyTokenizationV1Namespace {
  render: (options: GuestyTokenizationV1RenderOptions) => Promise<void>;
  destroy: () => Promise<void>;
  submit: () => Promise<PaymentMethod>;
  validate: () => void;
}

export interface GuestyTokenizationV2Namespace {
  render: (options: GuestyTokenizationV2RenderOptions) => Promise<void>;
  destroy: () => Promise<void>;
  submit: (
    payload: GuestyTokenizationV2SubmitPayload
  ) => Promise<PaymentMethod>;
  validate: () => void;
}

type NamespaceBasedOnVersion<T extends LoadScriptOptions['version']> =
  T extends 'v1'
    ? GuestyTokenizationV1Namespace
    : T extends 'v2'
    ? GuestyTokenizationV2Namespace
    : GuestyTokenizationV1Namespace;

export interface LoadScriptOptions {
  sandbox?: boolean;
  version?: 'v1' | 'v2';
}

export function loadScript(
  options?: LoadScriptOptions
): Promise<NamespaceBasedOnVersion<LoadScriptOptions['version']> | null>;

declare global {
  interface Window {
    guestyTokenization?:
      | GuestyTokenizationV1Namespace
      | GuestyTokenizationV2Namespace
      | null;
  }
}
