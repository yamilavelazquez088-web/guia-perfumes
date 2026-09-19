"use client";

import { useState } from "react";
import { Wind, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QRCode from "qrcode.react";

const ArgentinaFlag = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 9 6" 
    className="h-4 w-6 shadow-sm rounded-sm border border-zinc-200"
  >
    <rect width="9" height="6" fill="#74ACDF"/>
    <rect width="9" height="2" y="2" fill="#fff"/>
    <circle cx="4.5" cy="3" r="0.7" fill="#f6b40e"/>
  </svg>
);

export default function Header() {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [appUrl, setAppUrl] = useState("");

  const handleQrButtonClick = () => {
    setAppUrl(window.location.href);
    setIsQrModalOpen(true);
  };

  return (
    <>
      <div className="w-full bg-transparent text-muted-foreground p-2 text-center text-xs">
        <p>
          Diseñado por : Yamila Velázquez Zara 7002
        </p>
      </div>
      <header className="flex w-full items-center justify-between border-b p-4 shrink-0">
        <div className="flex items-center gap-2">
          <Wind className="h-6 w-6 text-primary" />
          <div className="flex items-center gap-2">
            <span className="font-headline text-2xl font-bold">ZARA PERFUMES</span>
            <ArgentinaFlag />
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleQrButtonClick}
          aria-label="Mostrar código QR para compartir"
        >
          <QrCode className="h-4 w-4" />
        </Button>
      </header>
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Comparte Zara Perfumes</DialogTitle>
            <DialogDescription>
              Escanea este código QR con tu teléfono para descubrir las fragancias de Zara.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            {appUrl && (
              <QRCode
                value={appUrl}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}