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

export function ProDialogLinkSharing(props: ProDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Access Pro Features</DialogTitle>
          <DialogDescription>
            You&apos;ve accessed a link with Pro features selected. To proceed, you need to:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Log in to your account.</li>
              <li>Upgrade to a Pro subscription if you haven&apos;t already.</li>
            </ul>
            <p className="mt-2">
              Unlock powerful features such as extendend historical data, geographic download data, or advanced
              analytics.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              props.setIsOpen(false);
              router.push("/login");
            }}
          >
            Log In
          </Button>
          <Button
            className="bg-gray-600 hover:bg-gray-700"
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
}
