import { AlertCircle, ExternalLink } from "lucide-react";

export default function Denuncias() {
  const config = {
    title: "Denuncia de maltrato animal",
    description: "Si eres testigo de un caso de maltrato, tu reporte es fundamental. Actúa ahora.",
    buttonText: "Realizar denuncia",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSczB-o99SY-NIYu4W9C2ZTbWFLkkI9TA2jUvdjmgLqF98brWg/viewform",
    whatsappNumber: "5493471579923"
  };

  return (
    <section className="max-w-5xl mx-auto mt-20 mb-10 px-4" aria-label="Sección de denuncias">
      <div className="bg-white border border-brand-primary/20 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all">
        
        {/* Cabecera */}
        <div className="flex items-start gap-4 mb-8">
          <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary shrink-0">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-brand-dark">{config.title}</h4>
            <p className="text-slate-600 mt-2">{config.description}</p>
          </div>
        </div>

        {/* Info importante */}
        <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 mb-10">
          <p className="text-sm text-amber-900 leading-relaxed">
            <span className="font-bold block mb-2">⚠︎ Importante:</span>
            El formulario sirve para registrar casos y ayudar dentro de nuestras posibilidades. 
            <span className="font-semibold block mt-2">No reemplaza una denuncia oficial.</span> 
            Para denuncias formales, contactar al Juzgado de Faltas de Armstrong o al 911.
          </p>
          
          <div className="mt-6 pt-6 border-t border-amber-200">
            <p className="text-sm text-amber-900 mb-2">
              También podés comunicarte con la <strong>Municipalidad</strong> para consultas oficiales:
            </p>
            <a 
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-brand-primary hover:text-brand-dark flex items-center gap-2 transition-colors"
            >
              <span className="text-lg">✆</span> +54 9 3471 57-9923
            </a>
          </div>
        </div>

        {/* Botón centrado */}
        <div className="flex justify-center">
          <a 
            href={config.formUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl text-lg"
          >
            <ExternalLink className="w-5 h-5" />
            {config.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}