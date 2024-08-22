import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ChaptersNavProps {
  audiobook: string;
  chapter: number;
}

const ChaptersNav = ({ audiobook, chapter }: ChaptersNavProps) => {
  return (
    <div className="container flex justify-between items-center">
      <Link
        href={`/audiobooks/${audiobook}/${chapter === 1 ? "" : `${audiobook}-${chapter - 1}`}`}
      >
        <Button variant="outline">Prev</Button>
      </Link>
      <h2>{chapter}</h2>
      <Link href={`/audiobooks/${audiobook}/${audiobook}-${chapter + 1}`}>
        <Button>Next</Button>
      </Link>
    </div>
  );
};

export { ChaptersNav };
