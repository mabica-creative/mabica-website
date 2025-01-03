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

import { DetailAudiobook } from "@prisma/client";
import { updateDetailAudiobookBySlug } from "@/lib/actions/updateDetailAudiobookBySlug";

export function DialogUpdateDetailAudiobook({
  audiobookSlug,
  data,
  audiobookId,
}: {
  audiobookSlug: string;
  audiobookId: number;
  data: DetailAudiobook;
}) {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form
          action={async (formData: FormData) => {
            const rawFormData = {
              id: audiobookId,
              author: formData.get("author"),
              editor: formData.get("editor"),
              genre: formData.get("genre"),
              voiceActor: formData.get("voice"),
              status: formData.get("status"),
            };

            await updateDetailAudiobookBySlug(audiobookSlug, rawFormData);
            toast({
              title: "Detail Audiobook is Updated",
              description: "Clone Dialog Now",
            });
            window.location.reload();
          }}
        >
          <DialogHeader>
            <DialogTitle>Update Detail</DialogTitle>
            <DialogDescription>Isi semuanya tolol</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                required
                defaultValue={data?.author}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="editor">Editor</Label>
              <Input
                id="editor"
                name="editor"
                required
                defaultValue={data?.editor}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                required
                defaultValue={data?.genre}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="voice">Voice Actor</Label>
              <Input
                id="voice"
                name="voice"
                required
                defaultValue={data?.voiceActor}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                required
                defaultValue={data?.status}
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
