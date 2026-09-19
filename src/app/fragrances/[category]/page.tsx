
"use client";

import { useState } from "react";
import type { Fragrance, FragranceCategory } from "@/lib/types";
import Header from "@/components/scentsense/Header";
import FragranceDetail from "@/components/scentsense/FragranceDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search, Sparkles } from "lucide-react";
import ScentFamilySelector from "@/components/scentsense/ScentFamilySelector";
import { cn } from "@/lib/utils";

export default function FragranceCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const category = decodeURIComponent(rawCategory || "") as FragranceCategory;

  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [equivalenceTerm, setEquivalenceTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/fragrances/search?category=${encodeURIComponent(category)}&query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleEquivalenceSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (equivalenceTerm.trim()) {
      router.push(`/fragrances/search?category=${encodeURIComponent(category)}&equivalence=${encodeURIComponent(equivalenceTerm.trim())}`);
    }
  };

  const getCategoryContent = (cat: FragranceCategory) => {
    switch (cat) {
      case "Mujer":
        return {
          bg: "bg-pink-100",
          text: "text-pink-800",
          button: "bg-pink-600 hover:bg-pink-700 text-white",
          inputBg: "bg-pink-50/50",
          border: "border-pink-200",
          namePlaceholder: "Ej: Wonder Rose, Deep Garden, Gardenia...",
          equivPlaceholder: "Ej: Good Girl, Black Opium, La Vie Est Belle...",
          showEquiv: true
        };
      case "Hombre":
        return {
          bg: "bg-sky-100",
          text: "text-sky-800",
          button: "bg-sky-600 hover:bg-sky-700 text-white",
          inputBg: "bg-sky-50/50",
          border: "border-sky-200",
          namePlaceholder: "Ej: Vibrant Leather, Seoul, Lisboa...",
          equivPlaceholder: "Ej: Aventus, 1 Million, Acqua di Gio...",
          showEquiv: true
        };
      case "Niños & Niñas":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          button: "bg-yellow-600 hover:bg-yellow-700 text-white",
          inputBg: "bg-yellow-50/50",
          border: "border-yellow-200",
          namePlaceholder: "Ej: Spider-Man, Mickey Mouse, Frozen...",
          equivPlaceholder: "",
          showEquiv: false
        };
      default:
        return {
          bg: "bg-secondary",
          text: "text-secondary-foreground",
          button: "bg-primary text-primary-foreground",
          inputBg: "bg-background",
          border: "border-input",
          namePlaceholder: "Buscar...",
          equivPlaceholder: "Buscar por equivalencia...",
          showEquiv: true
        };
    }
  };

  const theme = getCategoryContent(category);
  const isKids = category === "Niños & Niñas";

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col items-center p-4 md:p-8">
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex justify-start">
              <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <section className="text-center flex flex-col items-center">
              <div className={cn("px-8 py-2 rounded-full shadow-sm w-fit mb-4", theme.bg)}>
                  <h1 className={cn("font-headline text-3xl font-bold tracking-tight md:text-5xl", theme.text)}>
                  {category}
                  </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                {isKids ? "Busca tus personajes favoritos o explora por familia olfativa." : "Busca tu fragancia favorita o explora por familia olfativa."}
              </p>
            </section>

            <div className="space-y-6 bg-card p-6 rounded-xl border shadow-sm">
              <form onSubmit={handleSearch} className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
                    Buscar por Nombre
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={theme.namePlaceholder}
                    className={cn("w-full pl-10 h-12", theme.inputBg, theme.border)}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit" className={cn("w-full font-bold h-10", theme.button)}>
                    BUSCAR POR NOMBRE
                </Button>
              </form>

              {theme.showEquiv && (
                <form onSubmit={handleEquivalenceSearch} className="space-y-2 pt-4 border-t">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      Buscar por Equivalencia
                  </label>
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={theme.equivPlaceholder}
                      className={cn("w-full pl-10 h-12", theme.inputBg, theme.border)}
                      value={equivalenceTerm}
                      onChange={(e) => setEquivalenceTerm(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className={cn("w-full font-bold h-10", theme.button)}>
                      BUSCAR POR EQUIVALENCIA
                  </Button>
                </form>
              )}

              <Link href={`/fragrances/${encodeURIComponent(category)}/all`} passHref>
                <Button className="w-full h-12 mt-4 bg-black text-white hover:bg-zinc-800 font-bold border-none">
                  <BookOpen className="mr-2 h-5 w-5" />
                  VER CATÁLOGO COMPLETO
                </Button>
              </Link>
            </div>
            
            <div className="pt-8">
                <h3 className="font-headline text-2xl font-bold text-center mb-6">Explorar por Familia Olfativa</h3>
                <ScentFamilySelector category={category} />
            </div>

          </div>
        </main>
      </div>

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
