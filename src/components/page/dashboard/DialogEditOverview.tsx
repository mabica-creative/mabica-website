"use client";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

import { updateOverview } from "@/lib/actions/updateOverview";

export function DialogEditOverview({ dataOverview }: { dataOverview: any }) {
  const { toast } = useToast();
  if (!dataOverview) {
    return <p>Data overview tidak tersedia.</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Overview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <form
          action={async (formData: FormData) => {
            const rawFormData = Object.fromEntries(formData.entries());
            await updateOverview(rawFormData);
            toast({
              title: "Overview Updated",
              description: "Clone Dialog Now",
            });
            window.location.reload();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Overview</DialogTitle>
            <DialogDescription>
              Perbarui data sesuai kebutuhan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Header dan Header Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="header">Header</Label>
                <Input
                  id="header"
                  name="header"
                  defaultValue={dataOverview?.header}
                  required
                />
              </div>
              <div>
                <Label htmlFor="headerDescription">Header Description</Label>
                <Textarea
                  id="headerDescription"
                  name="headerDescription"
                  required
                  defaultValue={dataOverview?.headerDescription}
                />
              </div>
            </div>

            {/* Header Button dan Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="headerButton">Header Button</Label>
                <Input
                  id="headerButton"
                  name="headerButton"
                  defaultValue={dataOverview?.headerButton}
                  required
                />
              </div>
              <div>
                <Label htmlFor="headerButtonLink">Header Button Link</Label>
                <Input
                  id="headerButtonLink"
                  name="headerButtonLink"
                  defaultValue={dataOverview?.headerButtonLink}
                  required
                />
              </div>
            </div>

            {/* Banner Image dan Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="bannerImage">Banner Image</Label>
                <Input
                  id="bannerImage"
                  name="bannerImage"
                  defaultValue={dataOverview?.bannerImage}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bannerLink">Banner Link</Label>
                <Input
                  id="bannerLink"
                  name="bannerLink"
                  defaultValue={dataOverview?.bannerLink}
                  required
                />
              </div>
            </div>

            {/* About Image dan Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="aboutImage">About Image</Label>
                <Input
                  id="aboutImage"
                  name="aboutImage"
                  defaultValue={dataOverview?.aboutImage}
                  required
                />
              </div>
              <div>
                <Label htmlFor="aboutDescription">About Description</Label>
                <Textarea
                  id="aboutDescription"
                  name="aboutDescription"
                  required
                  defaultValue={dataOverview?.aboutDescription}
                />
              </div>
            </div>

            {/* Donation Heading, Button, dan Link */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="donationHeading">Donation Heading</Label>
                <Textarea
                  id="donationHeading"
                  name="donationHeading"
                  required
                  defaultValue={dataOverview?.donationHeading}
                />
              </div>
              <div>
                <Label htmlFor="donationButton">Donation Button</Label>
                <Input
                  id="donationButton"
                  name="donationButton"
                  defaultValue={dataOverview?.donationButton}
                  required
                />
              </div>
              <div>
                <Label htmlFor="donationButtonLink">Donation Button Link</Label>
                <Input
                  id="donationButtonLink"
                  name="donationButtonLink"
                  defaultValue={dataOverview?.donationButtonLink}
                  required
                />
              </div>
            </div>

            {/* Color dan Logo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  defaultValue={dataOverview?.color}
                  type="color"
                  required
                />
              </div>
              <div>
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  name="logo"
                  defaultValue={dataOverview?.logo}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Edit Overview</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
