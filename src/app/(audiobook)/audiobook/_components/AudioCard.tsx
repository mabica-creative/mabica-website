// Card of AudioBook 

import Image from 'next/image'
import Link from 'next/link'

interface AudioBookTypes {
  slug: string;
  image: string;
  title: string;
  tag: string;
}

export function AudioCard({slug, image, title, tag}: AudioBookTypes ) {
  return (
    <Link href={`/audiobook/${slug}`}>
      <div className="grid p-1 rounded-md w-54 overflow-hidden border border-text border-2 hover:bg-primary shadow-md hover:shadow-xl duration-300 gap-1 grid-flow-col h-max">
        <div className="row-span-3 w-20 rounded overflow-hidden border border-text">
          <Image
            src={image}
            width={100}
            height={100}
            alt={title + tag}
            className="w-full"
          />
        </div>
        <span className="opacity-50">{tag}</span>
        <h2 className="">{title}</h2>
      </div>
    </Link>
  )
}
