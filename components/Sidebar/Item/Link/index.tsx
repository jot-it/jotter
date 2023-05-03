import * as Accordion from "@radix-ui/react-accordion";
import Typography from "../../../Typography";
import NextLink from "next/link";

export type LinkProps = {
  type: "link";
  href: string;
  label: string;
};

function Link(props: LinkProps) {
  const { href, label } = props;

  return (
    <NextLink href={href}>
      <Typography
        className="rounded-lg px-2 py-3 text-gray-800 hover:bg-gray-100"
        variant="body1"
      >
        {label}
      </Typography>
    </NextLink>
  );
}

export default Link;
