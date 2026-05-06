"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQRStore } from '@/store/useQRStore';

export interface QRPreviewHandle {
  download: (ext: 'svg' | 'png') => void;
}

export const QRPreview = forwardRef<QRPreviewHandle>((_, ref) => {
  const { config } = useQRStore();
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    download: (ext: 'svg' | 'png') => {
      qrCodeRef.current?.download({ name: 'qr-code', extension: ext });
    }
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    qrCodeRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: config.url,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      },
      imageOptions: {
        hideBackgroundDots: config.removeLogoBackground,
        imageSize: config.logoSize,
        margin: 5,
        crossOrigin: 'anonymous'
      },
      dotsOptions: {
        color: config.primaryColor,
        type: config.pattern as any,
        gradient: config.colorType === 'gradient' ? {
          type: config.gradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: config.primaryColor },
            { offset: 1, color: config.secondaryColor }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: 'transparent',
      },
      cornersSquareOptions: {
        color: config.primaryColor,
        type: config.eyeShape as any,
      },
      cornersDotOptions: {
        color: config.primaryColor,
        type: config.eyeShape as any,
      }
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      qrCodeRef.current.append(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!qrCodeRef.current) return;

    qrCodeRef.current.update({
      data: config.url,
      dotsOptions: {
        color: config.primaryColor,
        type: config.pattern as any,
        gradient: config.colorType === 'gradient' ? {
          type: config.gradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: config.primaryColor },
            { offset: 1, color: config.secondaryColor }
          ]
        } : undefined
      },
      cornersSquareOptions: {
        color: config.primaryColor,
        type: config.eyeShape as any,
      },
      cornersDotOptions: {
        color: config.primaryColor,
        type: config.eyeShape as any,
      },
      image: config.logo,
      imageOptions: {
        hideBackgroundDots: config.removeLogoBackground,
        imageSize: config.logoSize,
      }
    });
  }, [config]);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef} 
        className="rounded-3xl overflow-hidden bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10" 
      />
    </div>
  );
});

QRPreview.displayName = 'QRPreview';
