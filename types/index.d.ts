export interface GuestyTokenizationStyles {
  mobileBreakpoint: number;
  fontFamily: string;
  fontSizeMd: number;
  fontSizeLg: number;
  fontWeightRegular: number;
  fontWeightBold: number;
  colorText: string;
  colorTextError: string;
  colorBorder: string;
  colorBorderError: string;
  colorBorderHover: string;
  colorPlaceholder: string;
  colorBackgroundError: string;
  colorBackgroundDisabled: string;
}

export interface GuestyTokenizationRenderOptions {
  containerId: string;
  providerId: string;
  onStatusChange?: (status: boolean) => void;
  styles?: GuestyTokenizationStyles;
}

export interface GuestyTokenizationNamespace {
  render: (options: GuestyTokenizationRenderOptions) => Promise<void>;
  destroy: () => Promise<void>;
  submit: () => Promise<void>;
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
