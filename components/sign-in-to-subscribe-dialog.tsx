import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export function SignInToSubscribeDialog(props: {
  open: boolean
  onClose: () => void
}) {

  const router = useRouter();
  router.prefetch("/user/login");

  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to Subscribe</DialogTitle>
          <DialogDescription>
            Create an account or sign in to subscribe to package updates and access more features.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={props.onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/user/login")}>
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}