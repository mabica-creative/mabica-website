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
import { Textarea } from "@/components/ui/Textarea";

import { updateAudiobook } from "@/lib/action";
import { Audiobook } from "@prisma/client";

export function DialogUpdateAudiobook({ data }: { data: Audiobook }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  // Generate slug in real-time whenever the title changes
  useEffect(() => {
    if (title == "") {
      setSlug(data.slug);
    } else {
      const generateSlug = (text: string) => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // Remove special characters
          .replace(/\s+/g, "-"); // Replace spaces with hyphens
      };
      setSlug(generateSlug(title));
    }
  }, [title, data.slug]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form
          action={async (formData: FormData) => {
            const rawFormData = {
              id: data?.id,
              title: formData.get("title"),
              slug,
              imageUrl: formData.get("image"),
              synopsis: formData.get("synopsis"),
            };

            console.log(rawFormData);
            await updateAudiobook(data?.slug, rawFormData);
          }}
        >
          <DialogHeader>
            <DialogTitle>Update Audiobook</DialogTitle>
            <DialogDescription>Isi semuanya tolol</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                defaultValue={data?.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" required value={slug} disabled />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                required
                defaultValue={data?.imageUrl}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="synopsis">Synopsis</Label>
              <Textarea
                id="synopsis"
                name="synopsis"
                required
                defaultValue={data?.synopsis}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Update Audiobook</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
