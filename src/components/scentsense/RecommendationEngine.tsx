"use client";

import { useState, useRef } from "react";
import { commonNotes } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCcw } from "lucide-react";
import { getRecommendations } from "@/app/actions";
import type { Fragrance } from "@/lib/types";
import FragranceList from "./FragranceList";
import FragranceDetail from "./FragranceDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function RecommendationEngine() {
  const { toast } = useToast();
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [recommendedFragrances, setRecommendedFragrances] = useState<Fragrance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  
  const topRef = useRef<HTMLDivElement>(null);
  const notesSectionRef = useRef<HTMLDivElement>(null);

  const toggleNote = (note: string) => {
    setSelectedNotes((prev) => {
      const isAlreadySelected = prev.includes(note);
      
      if (!isAlreadySelected && prev.length >= 3) {
        toast({
          title: "Límite de notas",
          description: "Puedes seleccionar hasta un máximo de 3 notas.",
          variant: "destructive",
        });
        return prev;
      }

      return isAlreadySelected
        ? prev.filter((n) => n !== note)
        : [...prev, note];
    });
  };

  const handleRecommendation = async () => {
    if (selectedNotes.length === 0) return;
    setIsLoading(true);
    setHasSearched(true);
    const recommendations = await getRecommendations(selectedNotes);
    setRecommendedFragrances(recommendations);
    setIsLoading(false);
    
    // Smooth scroll to the top of the engine component
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToNotes = () => {
    notesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section ref={topRef} className="rounded-xl border bg-card p-6 shadow-md border-zinc-200 overflow-hidden">
        {/* Cabecera Principal */}
        <div className="space-y-4 text-center mb-8 border-b pb-6">
          <h2 className="font-headline text-2xl font-bold leading-tight md:text-3xl uppercase text-primary">
            ELEGÍ HASTA 3 NOTAS Y DESCUBRÍ PERFUMES QUE LAS CONTIENEN
          </h2>
          
          {hasSearched && (
            <div className="flex justify-center animate-in fade-in slide-in-from-top-2 duration-500">
              <Button 
                variant="outline" 
                onClick={scrollToNotes}
                className="font-bold border-2 border-primary hover:bg-primary/5 transition-all h-10 px-6"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                CAMBIAR MIS NOTAS
              </Button>
            </div>
          )}
        </div>

        {/* Layout Dinámico: Solo divide la pantalla si ya se buscó */}
        <div className={cn(
          "grid grid-cols-1 gap-8 transition-all duration-500",
          hasSearched ? "lg:grid-cols-2 lg:divide-x lg:divide-zinc-200" : "max-w-3xl mx-auto"
        )}>
          
          {/* Columna de Resultados (Solo se muestra si hasSearched es true) */}
          {hasSearched && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700 lg:pr-8">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight">
                  Resultados para vos
                </h3>
                <span className="text-xs font-medium bg-black text-white px-2 py-1 rounded-full">
                  {recommendedFragrances.length} encontrados
                </span>
              </div>
              
              <FragranceList
                fragrances={recommendedFragrances}
                isLoading={isLoading}
                hasSearched={hasSearched}
                onSelectFragrance={setSelectedFragrance}
              />
            </div>
          )}

          {/* Columna de Selección de Notas */}
          <div className={cn(
            "space-y-8",
            hasSearched ? "lg:pl-8" : "w-full"
          )}>
            <div className="bg-secondary/20 p-6 rounded-xl border border-dashed border-zinc-300 h-full">
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={handleRecommendation}
                  disabled={selectedNotes.length === 0 || isLoading}
                  size="lg"
                  className="w-full font-bold h-14 shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-1 bg-black text-white hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    <span className="text-lg">
                      {isLoading ? "BUSCANDO..." : "BUSCAR PERFUMES"}
                    </span>
                  </div>
                  {selectedNotes.length > 0 && (
                    <span className="text-[10px] opacity-80 uppercase tracking-widest font-medium">
                      {selectedNotes.length} de 3 seleccionadas
                    </span>
                  )}
                </Button>
              </div>

              <div ref={notesSectionRef} className="mt-8 space-y-4">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  LISTADO DE NOTAS OLFATIVAS
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {commonNotes.map((note) => {
                    const isSelected = selectedNotes.includes(note);
                    return (
                      <Button
                        key={note}
                        variant="ghost"
                        onClick={() => toggleNote(note)}
                        className={cn(
                          "rounded-full transition-all text-xs h-9 px-4 border",
                          isSelected 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background font-bold" 
                            : "bg-background text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                        )}
                      >
                        {note}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Dialog
        open={!!selectedFragrance}
        onOpenChange={(isOpen) => !isOpen && setSelectedFragrance(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedFragrance && <FragranceDetail fragrance={selectedFragrance} />}
        </DialogContent>
      </Dialog>
    </>
  );
}