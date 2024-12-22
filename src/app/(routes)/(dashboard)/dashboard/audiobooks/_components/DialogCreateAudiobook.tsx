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

import { createAudiobook } from "@/lib/actions/createAudiobook";

export function DialogCreateAudiobook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  // Generate slug in real-time whenever the title changes
  useEffect(() => {
    const generateSlug = (text: string) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
    };

    setSlug(generateSlug(title));
  }, [title]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Audiobook</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form
          action={async (formData: FormData) => {
            const rawFormData = {
              title: formData.get("title") as string,
              slug,
              imageUrl: formData.get("image") as string,
              synopsis: formData.get("synopsis") as string,
            };

            console.log(rawFormData);
            await createAudiobook(rawFormData);
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Audiobook</DialogTitle>
            <DialogDescription>Isi semuanya tolol</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" required value={slug} disabled />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="image">Image</Label>
              <Input id="image" name="image" required />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="synopsis">Synopsis</Label>
              <Textarea id="synopsis" name="synopsis" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Audiobook</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
