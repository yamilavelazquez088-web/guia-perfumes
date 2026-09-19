import type { Fragrance } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FragranceDetailProps {
  fragrance: Fragrance;
}

export default function FragranceDetail({ fragrance }: FragranceDetailProps) {
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Mujer":
        return {
          nameBg: "bg-pink-100 text-pink-950 border-pink-200",
          equivBg: "bg-pink-50 border-pink-200",
          equivLabel: "bg-pink-600 text-white",
          equivText: "text-pink-900"
        };
      case "Hombre":
        return {
          nameBg: "bg-sky-100 text-sky-950 border-sky-200",
          equivBg: "bg-sky-50 border-sky-200",
          equivLabel: "bg-sky-600 text-white",
          equivText: "text-sky-900"
        };
      case "Niños & Niñas":
        return {
          nameBg: "bg-yellow-100 text-yellow-950 border-yellow-200",
          equivBg: "bg-yellow-50 border-yellow-200",
          equivLabel: "bg-yellow-600 text-white",
          equivText: "text-yellow-900"
        };
      default:
        return {
          nameBg: "bg-secondary text-secondary-foreground border-border",
          equivBg: "bg-muted/30 border-muted",
          equivLabel: "bg-primary text-primary-foreground",
          equivText: "text-foreground"
        };
    }
  };

  const theme = getCategoryTheme(fragrance.category);
  const isKids = fragrance.category === "Niños & Niñas";
  const hasExtraInfo = isKids ? !!fragrance.collection : !!fragrance.equivalence;
  const extraInfoLabel = isKids ? "COLECCIÓN" : "EQUIVALENCIA";
  const extraInfoValue = isKids ? fragrance.collection : fragrance.equivalence;

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex flex-col space-y-4">
        <Badge variant="secondary" className="w-fit font-medium">{fragrance.scentFamily}</Badge>
        <div className={cn("px-4 py-2 rounded-lg border shadow-sm w-fit", theme.nameBg)}>
          <h2 className="font-fragrance-name text-3xl font-bold md:text-4xl">
            {fragrance.name}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground italic leading-relaxed">{fragrance.description}</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Sección de Notas */}
        <div className="space-y-6">
          <NoteCategory title="Notas de Salida" notes={fragrance.notes.top} />
          <NoteCategory
            title="Notas de Corazón"
            notes={fragrance.notes.middle}
          />
          <NoteCategory title="Notas de Fondo" notes={fragrance.notes.base} />
        </div>

        {/* Sección de Equivalencia / Colección al costado */}
        {hasExtraInfo && (
          <div className={cn("p-6 rounded-xl border-2 shadow-sm flex flex-col gap-3 md:mt-2", theme.equivBg)}>
            <div className={cn("w-fit px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest", theme.equivLabel)}>
              {extraInfoLabel}
            </div>
            <p className={cn("font-bold text-2xl md:text-3xl font-fragrance-name leading-tight", theme.equivText)}>
              {extraInfoValue}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function NoteCategory({ title, notes }: { title: string; notes: string[] }) {
  if (notes.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {notes.map((note) => (
          <Badge key={note} variant="outline" className="text-sm font-medium">
            {note}
          </Badge>
        ))}
      </div>
    </div>
  );
}
