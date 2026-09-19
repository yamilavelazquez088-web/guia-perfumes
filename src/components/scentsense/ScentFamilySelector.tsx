
import { scentFamilies } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScentFamily, FragranceCategory } from "@/lib/types";
import Link from "next/link";

interface ScentFamilySelectorProps {
  category: FragranceCategory;
}

export default function ScentFamilySelector({
  category,
}: ScentFamilySelectorProps) {
  const getCardBackgroundColor = (category: FragranceCategory) => {
    switch (category) {
      case "Mujer":
        return "bg-pink-50 hover:bg-pink-100";
      case "Hombre":
        return "bg-sky-50 hover:bg-sky-100";
      case "Niños & Niñas":
        return "bg-yellow-50 hover:bg-yellow-100";
      default:
        return "hover:shadow-lg";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {scentFamilies.map((family) => {
        const Icon = family.icon;
        const href = `/fragrances/${encodeURIComponent(category)}/${encodeURIComponent(family.name)}`;
        return (
          <Link href={href} key={family.name} passHref>
            <Card
              className={cn(
                "cursor-pointer transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background h-full border-none shadow-sm",
                getCardBackgroundColor(category)
              )}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-6 w-6", family.color)} />
                  <CardTitle className="font-headline text-lg">{family.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">{family.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
