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

export interface GuestyTokenizationV3Styles {
  fontFamily?: string;
  fontSizeBase?: number;
  fontSizeMd?: number;
  fontSizeLg?: number;
  fontWeightRegular?: string | number;
  fontWeightBold?: string | number;
  borderRadius?: number;
  inputHeight?: number;
  inputPadding?: number;
  colorText?: string;
  colorTextError?: string;
  colorPlaceholder?: string;
  colorBorder?: string;
  colorBorderFocus?: string;
  colorFormBackground?: string;
  colorInputBackground?: string;
  // Explicitly unsupported in v3.
  mobileBreakpoint?: never;
  colorBorderError?: never;
  colorBorderHover?: never;
  colorBackground?: never;
  colorBackgroundError?: never;
  colorBackgroundDisabled?: never;
}

type Section = 'cardholderName' | 'paymentDetails' | 'billingAddress';
type TCardholderNameInput = 'firstName' | 'lastName' | 'cardHolderId';
type TBillingAddressInput = 'street' | 'city' | 'state' | 'zipCode' | 'country';
type TPaymentDetailsInput = 'cardNumber' | 'expirationDate' | 'csc';
type TBankDetailsInput =
  | 'nameOnCard'
  | 'accountHolderName'
  | 'routingNumber'
  | 'accountNumber'
  | 'accountType'
  | 'entityType';

type TInput =
  | TCardholderNameInput
  | TBillingAddressInput
  | TPaymentDetailsInput
  | TBankDetailsInput;

export interface GuestyTokenizationV1RenderOptions {
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

interface GuestyTokenizationV3BaseRenderOptions {
  containerId: string;
  providerId: string;
  onStatusChange?: (status: boolean) => void;
  styles?: GuestyTokenizationV3Styles;
  lang?: string;
  initialValues?: never;
  inputsConfig?: {
    [key in TInput]?: {
      label?: string;
      placeholder?: string;
    };
  };
  showReuseCheckbox?: boolean;
  showAddressToggle?: boolean;
  showNameToggle?: boolean;
  addressToggleLabel?: string;
  nameToggleLabel?: string;
  showSupportedCards?: boolean;
  showPciCompliantLink?: boolean;
  paymentMethod?: never;
}

interface GuestyTokenizationV3CountryOption {
  value: string;
  label: string;
}

interface GuestyTokenizationV3SharedInitialValues {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: GuestyTokenizationV3CountryOption;
}

export interface GuestyTokenizationV3CardInitialValues
  extends GuestyTokenizationV3SharedInitialValues {
  nameOnCard?: string;
  cardHolderId?: string;
  cardNumber?: string;
  expirationDate?: string;
  csc?: string;
  accountHolderName?: never;
  routingNumber?: never;
  accountNumber?: never;
  accountType?: never;
  entityType?: never;
}

export interface GuestyTokenizationV3AchInitialValues
  extends GuestyTokenizationV3SharedInitialValues {
  accountHolderName?: string;
  routingNumber?: string;
  accountNumber?: string;
  accountType?: '1' | '2';
  entityType?: '0' | '1';
  nameOnCard?: never;
  cardHolderId?: never;
  cardNumber?: never;
  expirationDate?: never;
  csc?: never;
}

export interface GuestyTokenizationV3CardRenderOptions
  extends GuestyTokenizationV3BaseRenderOptions {
  paymentMethod?: 'card';
  initialValues?: GuestyTokenizationV3CardInitialValues;
}

export interface GuestyTokenizationV3AchRenderOptions
  extends GuestyTokenizationV3BaseRenderOptions {
  paymentMethod: 'ach';
  initialValues?: GuestyTokenizationV3AchInitialValues;
}

export type GuestyTokenizationV3RenderOptions =
  | GuestyTokenizationV3CardRenderOptions
  | GuestyTokenizationV3AchRenderOptions;

export interface GuestyTokenizationV2ApiV2SubmitPayload {
  amount: number;
  currency: string;
  apiVersion: 'v2';
}

type ReservationOrQuote =
  | {
      reservationId: string;
      quoteId?: never;
      guest?: never;
    }
  | {
      quoteId: string;
      guest: {
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
      };
      reservationId?: never;
    };

export type GuestyTokenizationV2ApiV3SubmitPayload = {
  listingId: string;
  amount: number;
  currency: string;
  apiVersion?: 'v3';
} & ReservationOrQuote;

export type GuestyTokenizationV2SubmitPayload =
  | GuestyTokenizationV2ApiV2SubmitPayload
  | GuestyTokenizationV2ApiV3SubmitPayload;

export interface GuestyTokenizationV3SubmitGuest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface GuestyTokenizationV3CardSubmitPayload {
  amount?: number;
  currency?: string;
  skip3DS?: boolean;
  guest?: GuestyTokenizationV3SubmitGuest;
  listingId?: string;
  quoteId?: string;
  reservationId?: string;
  apiVersion?: 'v2' | 'v3';
  method?: 'verify' | 'verify_no_3ds';
}

export type GuestyTokenizationV3SubmitPayload =
  GuestyTokenizationV3CardSubmitPayload;

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

export interface GuestyTokenizationHandle3DSChallengeOptions {
  /** Opaque challenge payload returned by the Guesty backend. */
  threeDSChallenge: Record<string, unknown>;
}

export interface GuestyTokenizationV3Namespace {
  render: (options: GuestyTokenizationV3RenderOptions) => Promise<void>;
  destroy: () => Promise<void>;
  submit: () => Promise<PaymentMethod>;
  submit: (
    payload: GuestyTokenizationV3SubmitPayload
  ) => Promise<PaymentMethod>;
  validate: () => void;
  handle3DSChallenge: (
    options: GuestyTokenizationHandle3DSChallengeOptions
  ) => Promise<Record<string, unknown>>;
}

export interface LoadScriptOptions {
  sandbox?: boolean;
  version?: 'v1' | 'v2' | 'v3';
}

type NamespaceBasedOnVersion<T extends LoadScriptOptions['version']> =
  T extends 'v1'
    ? GuestyTokenizationV1Namespace
    : T extends 'v2'
    ? GuestyTokenizationV2Namespace
    : T extends 'v3'
    ? GuestyTokenizationV3Namespace
    : never;

export function loadScript<T extends LoadScriptOptions['version']>(
  options?: LoadScriptOptions & { version: T }
): Promise<NamespaceBasedOnVersion<T> | null>;

declare global {
  interface Window {
    guestyTokenization?:
      | GuestyTokenizationV1Namespace
      | GuestyTokenizationV2Namespace
      | GuestyTokenizationV3Namespace
      | null;
  }
}
