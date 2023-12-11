/* eslint-disable @next/next/no-img-element */
import { ComponentPropsWithoutRef } from "react";

type ImageProps = ComponentPropsWithoutRef<"img">;

function Image(props: ImageProps) {
  return <img loading="lazy" {...props} />;
}

export default Image;
