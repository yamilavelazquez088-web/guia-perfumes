"use client";

import { Suspense, useEffect, useState } from "react";
import type { Fragrance, FragranceCategory } from "@/lib/types";
import Header from "@/components/scentsense/Header";
import FragranceList from "@/components/scentsense/FragranceList";
import FragranceDetail from "@/components/scentsense/FragranceDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { zaraFragrances } from "@/lib/data";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("query") || "";
  const equivalence = searchParams.get("equivalence") || "";
  const category = searchParams.get("category") as FragranceCategory | null;

  const [displayedFragrances, setDisplayedFragrances] = useState<Fragrance[]>([]);
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);

  useEffect(() => {
    if (category) {
      if (query) {
        const filtered = zaraFragrances.filter(
          (f) =>
            f.category === category &&
            f.name.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedFragrances(filtered);
      } else if (equivalence) {
        const filtered = zaraFragrances.filter(
          (f) =>
            f.category === category &&
            (
              (f.equivalence && f.equivalence.toLowerCase().includes(equivalence.toLowerCase())) ||
              (f.collection && f.collection.toLowerCase().includes(equivalence.toLowerCase()))
            )
        );
        setDisplayedFragrances(filtered);
      } else {
        setDisplayedFragrances([]);
      }
    } else {
        setDisplayedFragrances([]);
    }
  }, [query, equivalence, category]);

  if (!category) {
    return null;
  }
  
  const title = query ? `Resultados para "${query}"` : `Resultados para "${equivalence}"`;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col items-center p-4 md:p-8">
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex justify-start">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>

            <section className="text-center">
              <h1 className="font-headline text-3xl font-bold tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Mostrando fragancias en la categoría {category}.
              </p>
            </section>
            
            <FragranceList
              fragrances={displayedFragrances}
              isLoading={false}
              hasSearched={true} 
              onSelectFragrance={setSelectedFragrance}
            />
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


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <SearchResults />
        </Suspense>
    )
}
