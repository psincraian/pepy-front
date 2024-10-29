import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function ProDialog(props: ProDialogProps) {

  const router = useRouter();

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to Pro</DialogTitle>
          <DialogDescription>
            Get access to premium features including:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Geographic download data</li>
              <li>Python version analytics</li>
              <li>CI download filtering</li>
              <li>Extended historical data</li>
              <li>Advanced analytics</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => props.setIsOpen(false)}>
            Maybe Later
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              props.setIsOpen(false);
              router.push("/pricing");
            }}
          >
            View Pricing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};