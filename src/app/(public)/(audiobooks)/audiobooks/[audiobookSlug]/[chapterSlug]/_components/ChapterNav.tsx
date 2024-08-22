import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";

interface ChapterNavProps {
  audiobook: string;
}

const ChapterNav = ({ audiobook }: ChapterNavProps) => {
  return (
    <Breadcrumb className="container">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/audiobooks">Audiobooks</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/audiobooks/${audiobook}`}>
            {audiobook
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { ChapterNav };
