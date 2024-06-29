import Link from "next/link";

interface BookChapterTypes {
  slugBook: string;
  slugChapter: string;
  title: string;
}

export function BookChapter({ slugBook, slugChapter, title }: BookChapterTypes) {
  return (
    <Link href={`/audiobook/${slugBook}/${slugChapter}`} className="border border-text border-2 duration-300 hover:bg-primary hover:shadow-xl rounded-lg py-2 px-5">{title}</Link>
  )
}
