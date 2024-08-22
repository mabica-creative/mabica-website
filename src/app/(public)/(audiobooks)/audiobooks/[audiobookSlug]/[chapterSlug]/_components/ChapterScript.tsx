interface ChapterScriptProps {
  script: string;
}

const ChapterScript = ({ script }: ChapterScriptProps) => {
  return (
    <div className="container space-y-2 py-2 opacity-80">
      <hr />
      <div>
        {script.split("\\n").map((item, index) => (
          <p key={index}>
            {item}
            <br />
          </p>
        ))}
      </div>
      <hr />
    </div>
  );
};

export { ChapterScript };
