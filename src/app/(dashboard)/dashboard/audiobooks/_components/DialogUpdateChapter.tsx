"use client";

import { useState, useEffect } from "react";

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

import { Chapter } from "@prisma/client";
import { updateChapter } from "@/lib/action";

export function DialogUpdateChapter({
  data,
  audiobookSlug,
  audiobookId,
  chapterId,
}: {
  data: Chapter;
  audiobookSlug: string;
  audiobookId: number;
  chapterId: number;
}) {
  const [number, setNumber] = useState<number>();
  const [slug, setSlug] = useState("");

  // Generate slug in real-time whenever the title changes
  useEffect(() => {
    if (!number) {
      setSlug(data.slug);
    } else {
      setSlug(`${audiobookSlug}-${number}`);
    }
  }, [number, audiobookSlug, data.slug]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={async (formData: FormData) => {
            const rawFormData = {
              chapterNumber: Number(formData.get("number") || number),
              slug,
              chapterId,
              audiobookId,
            };

            console.log(rawFormData);
            await updateChapter(data?.slug, rawFormData);
          }}
        >
          <DialogHeader>
            <DialogTitle>Update Chapter</DialogTitle>
            <DialogDescription>Pilih Number Chapter</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="number">Chapter Number</Label>
              <Input
                id="number"
                type="number"
                name="number"
                required
                defaultValue={data.chapterNumber}
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="number" required value={slug} disabled />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Update Detail</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
