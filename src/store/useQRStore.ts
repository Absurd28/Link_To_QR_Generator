import { create } from 'zustand';

export type QRConfig = {
  url: string;
  pattern: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
  eyeShape: 'square' | 'dots' | 'rounded' | 'extra-rounded';
  colorType: 'single' | 'gradient';
  primaryColor: string;
  secondaryColor: string;
  gradientType: 'linear' | 'radial';
  logo?: string;
  logoSize: number;
  removeLogoBackground: boolean;
  frameText: string;
};

interface QRState {
  config: QRConfig;
  setConfig: (config: Partial<QRConfig>) => void;
}

export const useQRStore = create<QRState>((set) => ({
  config: {
    url: 'https://github.com/aryan-prince',
    pattern: 'dots',
    eyeShape: 'extra-rounded',
    colorType: 'gradient',
    primaryColor: '#8B5CF6',
    secondaryColor: '#D9F99D',
    gradientType: 'linear',
    logoSize: 0.15,
    removeLogoBackground: true,
    frameText: 'SCAN ME',
  },
  setConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),
}));
