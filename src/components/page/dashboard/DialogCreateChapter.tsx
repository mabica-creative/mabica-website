"use client";

import { useState, useEffect } from "react";
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
import { createChapter } from "@/lib/actions/createChapter";

export function DialogCreateChapter({
  audiobookSlug,
  audiobookId,
}: {
  audiobookSlug: string;
  audiobookId: number;
}) {
  const [number, setNumber] = useState<number>();
  const [slug, setSlug] = useState("");

  const { toast } = useToast();

  // Generate slug in real-time whenever the title changes
  useEffect(() => {
    setSlug(`${audiobookSlug}-${number}`);
  }, [number, audiobookSlug]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Chapter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form
          action={async (formData: FormData) => {
            const rawFormData = {
              chapterNumber: Number(formData.get("number")),
              slug,
              audiobookId: audiobookId,
            };
            await createChapter(rawFormData);
            toast({
              title: "Chapter is Created",
              description: "Clone Dialog Now",
            });
            window.location.reload();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Chapter</DialogTitle>
            <DialogDescription>Isi chapter yang ke berapa</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="number">Chapter Number</Label>
              <Input
                id="number"
                type="number"
                name="number"
                required
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="slug">Slug</Label>
              <Textarea id="slug" name="slug" required value={slug} disabled />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Chapter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
