
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
          <DialogTitle>Out of Credits</DialogTitle>
          <DialogDescription>
            You have used all your available credits. Top up to continue using Scryptex features.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-amber-800">Tip:</h4>
            <p className="text-sm text-amber-700 mt-1">
              Get free credits by inviting friends using your referral code.
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={onReferral} className="w-full sm:w-auto">
            Invite Friends
          </Button>
          <Button onClick={onTopUp} className="w-full sm:w-auto">
            Top Up Credits
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
