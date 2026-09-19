
"use client";

import Header from "@/components/scentsense/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import RecommendationEngine from "@/components/scentsense/RecommendationEngine";
import { Flower2, User } from "lucide-react";

const KidsIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="8" cy="7" r="2" />
    <path d="M8 9v6" />
    <path d="M6 12h4" />
    <path d="M7 21v-6h2v6" />
    <circle cx="16" cy="7" r="2" />
    <path d="M16 9v6" />
    <path d="M14 12h4" />
    <path d="M15 21v-6h2v6" />
    <path d="M10 12h4" />
  </svg>
);

export default function Home() {
  const categories = [
    {
      name: "Mujer",
      icon: Flower2,
      href: `/fragrances/${encodeURIComponent("Mujer")}`,
      bgColor: "bg-pink-100 hover:bg-pink-200",
    },
    {
      name: "Hombre",
      icon: User,
      href: `/fragrances/${encodeURIComponent("Hombre")}`,
      bgColor: "bg-sky-100 hover:bg-sky-200",
    },
    {
      name: "Niños & Niñas",
      icon: KidsIcon,
      href: `/fragrances/${encodeURIComponent("Niños & Niñas")}`,
      bgColor: "bg-yellow-100 hover:bg-yellow-200",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-4xl space-y-12">
          <section className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              TU GUÍA DE PERFUMES ZARA
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Selecciona una sección para explorar el catálogo o usa nuestro recomendador inteligente.
            </p>
          </section>
          
          <div className="space-y-4">
             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
               {categories.map((category) => {
                 const Icon = category.icon;
                 return (
                   <Link href={category.href} key={category.name} passHref>
                     <Card
                       className={cn(
                         "cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background border-none",
                         category.bgColor
                       )}
                     >
                       <CardHeader>
                         <div className="flex flex-col items-center gap-3">
                           <Icon className="h-16 w-16 text-primary" />
                           <CardTitle className="font-headline text-2xl">
                             {category.name}
                           </CardTitle>
                         </div>
                       </CardHeader>
                     </Card>
                   </Link>
                 );
               })}
             </div>
          </div>

          <RecommendationEngine />

        </div>
      </main>
    </div>
  );
}
