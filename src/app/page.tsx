"use client";

import { useRef, useState } from "react";
import { useQRStore, QRConfig } from "@/store/useQRStore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LucideQrCode, Download, Settings, Palette, 
  Image as ImageIcon, Layout, Sparkles, Wand2,
  Check, Upload, Trash2, Sliders
} from "lucide-react";
import { QRPreview, QRPreviewHandle } from "@/components/QRPreview";
import confetti from "canvas-confetti";

const PRESETS: Array<{ name: string; icon: string; config: Partial<QRConfig> }> = [
  {
    name: "Cyberpunk",
    icon: "🏮",
    config: {
      pattern: "dots",
      eyeShape: "extra-rounded",
      primaryColor: "#00ffcc",
      secondaryColor: "#ff00ff",
      colorType: "gradient",
      gradientType: "linear"
    }
  },
  {
    name: "Apple Minimalist",
    icon: "🍏",
    config: {
      pattern: "square",
      eyeShape: "square",
      primaryColor: "#000000",
      secondaryColor: "#333333",
      colorType: "single"
    }
  },
  {
    name: "Sunset Glow",
    icon: "🌅",
    config: {
      pattern: "rounded",
      eyeShape: "rounded",
      primaryColor: "#f093fb",
      secondaryColor: "#f5576c",
      colorType: "gradient",
      gradientType: "radial"
    }
  },
  {
    name: "Oceanic",
    icon: "🌊",
    config: {
      pattern: "classy",
      eyeShape: "extra-rounded",
      primaryColor: "#4facfe",
      secondaryColor: "#00f2fe",
      colorType: "gradient",
      gradientType: "linear"
    }
  }
];

export default function Home() {
  const { config, setConfig } = useQRStore();
  const qrRef = useRef<QRPreviewHandle>(null);
  const [activeTab, setActiveTab] = useState<string>("content");

  const handleDownload = (ext: 'svg' | 'png') => {
    qrRef.current?.download(ext);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [config.primaryColor, config.secondaryColor, '#ffffff']
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const TabButton = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? "bg-white/10 text-white border border-white/10" 
          : "text-white/40 hover:text-white/60"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <main className="flex min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <nav className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-8 glass hidden md:flex">
        <div className="p-3 rounded-2xl bg-accent-violet shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          <LucideQrCode className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-4">
          {[
            { id: "content", icon: Layout },
            { id: "style", icon: Settings },
            { id: "colors", icon: Palette },
            { id: "branding", icon: ImageIcon },
            { id: "magic", icon: Sparkles },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-4 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-xl border border-white/10" 
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </nav>

      {/* Main Control Panel */}
      <aside className="w-full lg:w-[450px] h-screen overflow-y-auto border-r border-white/10 glass p-8 z-10 custom-scrollbar">
        <header className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Editor</h1>
          <p className="text-white/40 text-sm">Customize every pixel of your QR code.</p>
        </header>

        <div className="space-y-10 pb-20">
          <AnimatePresence mode="wait">
            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Target URL
                  </h3>
                  <input
                    type="text"
                    value={config.url}
                    onChange={(e) => setConfig({ url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-accent-violet/50 transition-all text-sm group-hover:bg-white/10"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "style" && (
              <motion.div
                key="style"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Settings className="w-3 h-3" /> Pixel Shape
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setConfig({ pattern: p as any })}
                        className={`p-4 rounded-2xl border text-xs capitalize transition-all relative overflow-hidden ${
                          config.pattern === p 
                            ? 'bg-accent-violet/20 border-accent-violet text-white' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        {p.replace('-', ' ')}
                        {config.pattern === p && <Check className="w-3 h-3 absolute top-2 right-2 text-accent-violet" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Sliders className="w-3 h-3" /> Eye Style
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['square', 'dots', 'rounded', 'extra-rounded'].map((e) => (
                      <button
                        key={e}
                        onClick={() => setConfig({ eyeShape: e as any })}
                        className={`p-4 rounded-2xl border text-xs capitalize transition-all relative overflow-hidden ${
                          config.eyeShape === e 
                            ? 'bg-accent-violet/20 border-accent-violet text-white' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        {e.replace('-', ' ')}
                        {config.eyeShape === e && <Check className="w-3 h-3 absolute top-2 right-2 text-accent-violet" />}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "colors" && (
              <motion.div
                key="colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Palette className="w-3 h-3" /> Color Mode
                  </h3>
                  <div className="flex gap-2">
                    {['single', 'gradient'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setConfig({ colorType: mode as any })}
                        className={`flex-1 py-3 rounded-xl text-xs capitalize transition-all border ${
                          config.colorType === mode 
                            ? 'bg-white/10 border-white/20 text-white' 
                            : 'bg-transparent border-transparent text-white/40'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] text-white/30 uppercase tracking-widest">Primary Color</label>
                      <div className="flex gap-3">
                        <input 
                          type="color" 
                          value={config.primaryColor}
                          onChange={(e) => setConfig({ primaryColor: e.target.value })}
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden"
                        />
                        <input 
                          type="text" 
                          value={config.primaryColor}
                          onChange={(e) => setConfig({ primaryColor: e.target.value })}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-mono outline-none"
                        />
                      </div>
                    </div>
                    {config.colorType === 'gradient' && (
                      <div className="space-y-3">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest">Secondary Color</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={config.secondaryColor}
                            onChange={(e) => setConfig({ secondaryColor: e.target.value })}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden"
                          />
                          <input 
                            type="text" 
                            value={config.secondaryColor}
                            onChange={(e) => setConfig({ secondaryColor: e.target.value })}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-mono outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "branding" && (
              <motion.div
                key="branding"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <ImageIcon className="w-3 h-3" /> Brand Assets
                  </h3>
                  
                  {config.logo ? (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                      <img src={config.logo} className="w-16 h-16 rounded-xl object-contain bg-white/5 p-2" alt="Logo" />
                      <div className="flex-1">
                        <p className="text-xs text-white/60 mb-2">Logo loaded</p>
                        <button 
                          onClick={() => setConfig({ logo: undefined })}
                          className="text-[10px] text-red-400 flex items-center gap-1 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="w-full h-40 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent-violet/30 hover:bg-white/5 transition-all group">
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      <div className="p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-white/40" />
                      </div>
                      <span className="text-sm text-white/30">Upload PNG or SVG</span>
                    </label>
                  )}
                </div>

                {config.logo && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest">Logo Size</label>
                        <span className="text-[10px] text-accent-violet font-mono">{Math.round(config.logoSize * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.05" 
                        max="0.4" 
                        step="0.01"
                        value={config.logoSize}
                        onChange={(e) => setConfig({ logoSize: parseFloat(e.target.value) })}
                        className="w-full accent-accent-violet"
                      />
                    </div>
                    
                    <button
                      onClick={() => setConfig({ removeLogoBackground: !config.removeLogoBackground })}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs hover:bg-white/10 transition-all"
                    >
                      <span className="text-white/60">Remove background behind logo</span>
                      <div className={`w-8 h-4 rounded-full transition-all relative ${config.removeLogoBackground ? 'bg-accent-violet' : 'bg-white/20'}`}>
                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${config.removeLogoBackground ? 'right-1' : 'left-1'}`} />
                      </div>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "magic" && (
              <motion.div
                key="magic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                 <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Wand2 className="w-3 h-3" /> Magic AI Styles
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setConfig(preset.config)}
                        className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{preset.icon}</span>
                          <div className="text-left">
                            <p className="text-sm font-semibold">{preset.name}</p>
                            <p className="text-[10px] text-white/30">Instantly apply theme</p>
                          </div>
                        </div>
                        <Check className="w-4 h-4 text-white/0 group-hover:text-white/40 transition-all" />
                      </button>
                    ))}
                  </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Controls for Mobile? Or maybe just status */}
      </aside>

      {/* Preview Area */}
      <section className="flex-1 h-screen relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_#111_0%,_#050505_100%)] overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-violet/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-lime/10 rounded-full blur-[120px] animate-pulse" />

        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff22 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          {/* Main QR Container */}
          <div className="relative p-10 group">
             {/* Frame/Border Glow */}
             <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/20 to-accent-lime/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="relative">
                <QRPreview ref={qrRef} />
                
                {/* Frame Text Placeholder */}
                <div className="mt-8 text-center">
                   <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">{config.frameText}</p>
                </div>
             </div>
          </div>

          {/* Export Actions */}
          <div className="flex gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload('png')}
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <Download className="w-4 h-4" />
              PNG
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload('svg')}
              className="px-10 py-4 rounded-2xl bg-white text-black text-sm font-bold flex items-center gap-2 shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all"
            >
              <Download className="w-4 h-4" />
              Export SVG
            </motion.button>
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </main>
  );
}
