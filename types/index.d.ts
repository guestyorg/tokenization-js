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
type TCardholderNameInput = 'firstName' | 'lastName' | 'cardHolderId';
type TBillingAddressInput = 'street' | 'city' | 'state' | 'zipCode' | 'country';
type TPaymentDetailsInput = 'cardNumber' | 'expirationDate' | 'csc';

type TInput =
  | TCardholderNameInput
  | TBillingAddressInput
  | TPaymentDetailsInput;

export interface GuestyTokenizationRenderOptions {
  containerId: string;
  providerId: string;
  amount: number;
  currency: string;
  onStatusChange?: (status: boolean) => void;
  styles?: GuestyTokenizationStyles;
  lang?: string;
  initialValues?: {
    [key in Exclude<TInput, 'cardHolderId' | TPaymentDetailsInput>]?: string;
  };
  showInitialValuesToggle?: boolean;
  initialValuesToggleLabel?: string;
  sections?: Section[];
  showSupportedCards?: boolean;
  showPciCompliantLink?: boolean;
  inputsConfig?: {
    [key in TInput]?: {
      label?: string;
      placeholder?: string;
    };
  };
}

export interface PaymentMethod {
  _id: string;
}

export interface GuestyTokenizationNamespace {
  render: (options: GuestyTokenizationRenderOptions) => Promise<void>;
  destroy: () => Promise<void>;
  submit: () => Promise<PaymentMethod>;
  validate: () => void;
}

export interface LoadScriptOptions {
  sandbox?: boolean;
}

export function loadScript(
  options?: LoadScriptOptions
): Promise<GuestyTokenizationNamespace | null>;

declare global {
  interface Window {
    guestyTokenization?: GuestyTokenizationNamespace | null;
  }
}
