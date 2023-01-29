import clsx from "clsx";
import Image, { ImageProps } from "next/image";

interface AvatarProps extends Omit<ImageProps, "height" | "width"> {
  /** @default sm */
  variant?: "sm" | "md" | "lg" | "xl";

  /** defaults to variant size */
  height?: ImageProps["height"];

  /** defaults to variant size */
  width?: ImageProps["width"];
}

const VariantMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

function Avatar(props: AvatarProps) {
  const { className, children, variant: size, width, height, ...rest } = props;

  return (
    <Image
      className={clsx(
        className,
        "inline-block rounded-full",
        `ring-2 ring-white`
      )}
      width={width ?? VariantMap[size!]}
      height={height ?? VariantMap[size!]}
      {...rest}
    >
      {children}
    </Image>
  );
}

export default Avatar;
