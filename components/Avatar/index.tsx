import clsx from "clsx";
import Image, { ImageProps } from "next/image";

const SizeVariants = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
} as const;

const RingColorVariants = {
  white: "ring-white",
  blue: "ring-blue-600",
};

interface AvatarProps extends Omit<ImageProps, "height" | "width"> {
  size?: keyof typeof SizeVariants;
  ringColor?: keyof typeof RingColorVariants;
}

function Avatar(props: AvatarProps) {
  const { className, children, size = "sm", ringColor, ...rest } = props;

  return (
    <Image
      className={clsx(
        className,
        "inline-block rounded-full ring",
        ringColor && RingColorVariants[ringColor]
      )}
      width={SizeVariants[size]}
      height={SizeVariants[size]}
      {...rest}
    >
      {children}
    </Image>
  );
}

export default Avatar;
