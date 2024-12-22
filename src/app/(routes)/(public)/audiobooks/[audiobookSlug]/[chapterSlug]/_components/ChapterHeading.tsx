import { cn } from "@/lib/utils/cn";

interface ChapterHeading {
  chapter: number;
}

const ChapterHeading = ({ chapter }: ChapterHeading) => {
  return (
    <h1
      className={cn(
        "font-semibold py-10 text-center text-lg",
        "lg:text-4xl lg:text-20",
      )}
    >
      {`Chapter ${chapter}`}
    </h1>
  );
};

export { ChapterHeading };
