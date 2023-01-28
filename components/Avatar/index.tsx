import clsx from "clsx";
import Image, { ImageProps } from "next/image";

interface AvatarProps extends Omit<ImageProps, "height" | "width"> {
  /** @default sm */
  variant?: "sm" | "md" | "lg" | "xl";

  /**
   * className: ```ring-${color}```
   *
   * @default white */
  ringColor?: string;

  /**
   * className: ```ring-${number}```
   *
   * @default 2 */
  ringSize?: number;

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
  const {
    className,
    children,
    variant: size,
    ringColor = "white",
    ringSize = 2,
    width,
    height,
    ...rest
  } = props;

  return (
    <Image
      className={clsx(
        className,
        "inline-block rounded-full",
        `ring-${ringColor} ring-${ringSize}`
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
