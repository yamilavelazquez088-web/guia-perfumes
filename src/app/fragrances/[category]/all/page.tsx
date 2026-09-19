"use client";

import { useEffect, useState } from "react";
import type { Fragrance, FragranceCategory } from "@/lib/types";
import Header from "@/components/scentsense/Header";
import FragranceList from "@/components/scentsense/FragranceList";
import FragranceDetail from "@/components/scentsense/FragranceDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { zaraFragrances } from "@/lib/data";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AllFragrancesPage() {
  const params = useParams();
  const category = decodeURIComponent((Array.isArray(params.category) ? params.category[0] : params.category)) as FragranceCategory;

  const [displayedFragrances, setDisplayedFragrances] = useState<Fragrance[]>([]);
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);

  useEffect(() => {
    if (category) {
      const filtered = zaraFragrances.filter(
        (f) => f.category === category
      );
      setDisplayedFragrances(filtered);
    }
  }, [category]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col items-center p-4 md:p-8">
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex justify-start">
              <Link href={`/fragrances/${category}`} passHref>
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <section className="text-center">
              <h1 className="font-headline text-3xl font-bold tracking-tight md:text-5xl">
                Catálogo Completo de {category}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Explora todas las fragancias que ofrecemos en esta categoría.
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
