import MarkdownIt from "markdown-it";

export type Props = {
  value: string;
};

const md = new MarkdownIt();

function Line(props: Props) {
  const html = md.render(props.value);

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}

export default Line;
