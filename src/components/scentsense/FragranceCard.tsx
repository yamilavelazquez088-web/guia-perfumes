
import type { Fragrance } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FragranceCardProps {
  fragrance: Fragrance;
  onSelect: (fragrance: Fragrance) => void;
}

export default function FragranceCard({
  fragrance,
  onSelect,
}: FragranceCardProps) {
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Mujer":
        return {
          badge: "bg-pink-100 text-pink-800",
          name: "bg-pink-200 text-pink-950",
        };
      case "Hombre":
        return {
          badge: "bg-sky-100 text-sky-800",
          name: "bg-sky-200 text-sky-950",
        };
      case "Niños & Niñas":
        return {
          badge: "bg-yellow-100 text-yellow-800",
          name: "bg-yellow-200 text-yellow-950",
        };
      default:
        return {
          badge: "bg-secondary text-secondary-foreground",
          name: "bg-muted text-foreground",
        };
    }
  };

  const theme = getCategoryTheme(fragrance.category);

  return (
    <Card
      onClick={() => onSelect(fragrance)}
      className="group cursor-pointer transition-all hover:bg-secondary/50 overflow-hidden border shadow-sm"
      aria-label={`Ver detalles de ${fragrance.name}`}
    >
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-2">
            <div className={cn("px-3 py-1 rounded-md w-fit shadow-sm", theme.name)}>
              <h3 className="font-fragrance-name text-lg font-bold leading-tight">
                {fragrance.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               <Badge variant="outline" className="text-[10px] font-medium">{fragrance.scentFamily}</Badge>
               <Badge className={cn("text-[10px] border-none font-bold", theme.badge)}>{fragrance.category}</Badge>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}
