
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";  // Using the shadcn/ui button component

interface OutOfCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: () => void;
  onReferral: () => void;
}

export function OutOfCreditsModal({
  isOpen,
  onClose,
  onTopUp,
  onReferral
}: OutOfCreditsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kredit Habis</DialogTitle>
          <DialogDescription>
            Anda telah menggunakan semua kredit yang tersedia. Isi ulang kredit untuk terus menggunakan fitur Scryptex.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-amber-800">Tips:</h4>
            <p className="text-sm text-amber-700 mt-1">
              Dapatkan kredit gratis dengan mengundang teman menggunakan kode referral Anda.
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={onReferral} className="w-full sm:w-auto">
            Undang Teman
          </Button>
          <Button onClick={onTopUp} className="w-full sm:w-auto">
            Top Up Kredit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
