import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Heart, Wallet } from "lucide-react";
import Toast from "../ui/Toast";

const DONATION_DATA = {
  alias: "comoperrosygatosarms",
  cvu: "0000003100062549564900",
  titular: "Eliana Belen Bufarino"
};

export default function Donations() {
  const [copiedField, setCopiedField] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setShowToast(true);

    setTimeout(() => {
      setCopiedField(null);
      setShowToast(false);
    }, 3000);
  };

  return (
    <section
      id="donations"
      /* w-full y overflow-x-hidden previenen el desplazamiento lateral */
      className="section-padding bg-brand-moss relative overflow-x-hidden w-full"
    >
      <div className="max-w-4xl mx-auto text-center text-brand-bg relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          {/* ICONO */}
          <div className="inline-block p-4 bg-white/10 rounded-full mb-8 backdrop-blur-md">
            <Heart className="w-10 h-10 fill-brand-bg" />
          </div>

          {/* TITULO */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ayudanos a seguir rescatando animales 🌿
          </h2>

          {/* TEXTO */}
          <p className="text-xl text-brand-bg/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Tu ayuda nos permite alimentar, cuidar y encontrar hogar a los animales rescatados.
          </p>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* ALIAS */}
            <div className="bg-white/10 rounded-section p-8 md:p-10 text-brand-bg shadow-lg border border-white/20 backdrop-blur-sm flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex items-center gap-3 mb-6 opacity-60">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">
                    Alias Mercado Pago
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4 mb-2">
                  <h3 className="text-xl md:text-2xl font-mono font-bold break-all">
                    {DONATION_DATA.alias}
                  </h3>

                  <button
                    onClick={() => copyToClipboard(DONATION_DATA.alias, "alias")}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors shrink-0"
                    title="Copiar Alias"
                  >
                    {copiedField === "alias" ? (
                      <Check className="w-5 h-5 text-brand-light" />
                    ) : (
                      <Copy className="w-5 h-5 opacity-50" />
                    )}
                  </button>
                </div>

                <p className="opacity-80 font-medium text-sm">
                  {DONATION_DATA.titular}
                </p>
              </div>
            </div>

            {/* CVU */}
            <div className="bg-brand-light/20 rounded-section p-8 md:p-10 text-brand-bg shadow-lg border border-white/10 backdrop-blur-sm flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex items-center gap-3 mb-6 opacity-60">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">
                    Datos Bancarios (CVU)
                  </span>
                </div>

                <div className="flex justify-between items-center gap-3 mb-4 overflow-hidden">
                  <h3 className="text-sm md:text-base font-mono font-bold break-all bg-white/10 p-3 rounded-lg flex-1 min-w-0">
                    {DONATION_DATA.cvu}
                  </h3>

                  <button
                    onClick={() => copyToClipboard(DONATION_DATA.cvu, "cvu")}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors shrink-0"
                    title="Copiar CVU"
                  >
                    {copiedField === "cvu" ? (
                      <Check className="w-5 h-5 text-brand-light" />
                    ) : (
                      <Copy className="w-5 h-5 opacity-50" />
                    )}
                  </button>
                </div>

                <p className="opacity-80 text-xs italic">
                  Transferencia directa a C&G
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* TOAST */}
      <Toast
        isVisible={showToast}
        message={`¡${copiedField?.toUpperCase()} copiado correctamente!`}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}