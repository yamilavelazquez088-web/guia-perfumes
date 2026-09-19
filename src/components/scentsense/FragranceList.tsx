import type { Fragrance } from "@/lib/types";
import FragranceCard from "./FragranceCard";
import { Skeleton } from "@/components/ui/skeleton";

interface FragranceListProps {
  fragrances: Fragrance[];
  isLoading: boolean;
  hasSearched: boolean;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export default function FragranceList({
  fragrances,
  isLoading,
  hasSearched,
  onSelectFragrance,
}: FragranceListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (hasSearched && fragrances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
        <h3 className="text-xl font-semibold">No se encontraron fragancias</h3>
        <p className="mt-2 text-muted-foreground">
          No hay fragancias en nuestro catálogo para las familias seleccionadas.
        </p>
      </div>
    );
  }
  
  if (!hasSearched && fragrances.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {fragrances.map((fragrance) => (
        <FragranceCard
          key={fragrance.id}
          fragrance={fragrance}
          onSelect={onSelectFragrance}
        />
      ))}
    </div>
  );
}
