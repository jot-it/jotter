import { ComponentPropsWithoutRef } from "react";

function Block(props: ComponentPropsWithoutRef<"div">) {
  return <div {...props} />;
}

export default Block;
