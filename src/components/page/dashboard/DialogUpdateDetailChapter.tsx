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

import { DetailChapter } from "@prisma/client";
import { updateDetailChapterBySlug } from "@/lib/actions/updateDetailChapterBySlug";

export function DialogUpdateDetailChapter({
  data,
  chapterId,
  audiobookId,
  chapterSlug,
}: {
  data: DetailChapter;
  chapterId: number;
  chapterSlug: string;
  audiobookId: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form
          action={async (formData: FormData) => {
            const rawFormData = {
              content: formData.get("content"),
              audioUrl: formData.get("audioUrl"),
              chapterId,
              audiobookId,
            };

            // console.log(rawFormData);
            await updateDetailChapterBySlug(chapterSlug, rawFormData);
          }}
        >
          <DialogHeader>
            <DialogTitle>Update Detail</DialogTitle>
            <DialogDescription>isi boss</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="audioUrl">Audio Url</Label>
              <Input
                id="audioUrl"
                name="audioUrl"
                required
                defaultValue={data?.audioUrl}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                required
                defaultValue={data?.content}
              />
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
