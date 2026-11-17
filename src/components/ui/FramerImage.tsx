import Image from "next/image";
import { getImageDimensions } from "@/lib/asset-dimensions";

interface FramerImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

/**
 * Renders an asset from /public/assets/framer/ (or /public/assets/) at its exact
 * intrinsic aspect ratio without fixed aspect-ratio cropping.
 */
export function FramerImage({
  src,
  alt,
  className = "w-full h-auto rounded-[12px]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px",
  quality = 90,
}: FramerImageProps) {
  const { width, height } = getImageDimensions(src);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={className}
    />
  );
}
