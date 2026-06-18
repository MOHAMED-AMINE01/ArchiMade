import { forwardRef } from "react";
import variants from "../data/image-variants.json";

type VariantEntry = {
  width: number;
  height: number;
  widths: number[];
  logo?: boolean;
};

const manifest = variants as Record<string, VariantEntry>;

/** Layout hints for the `sizes` attribute. */
export const IMAGE_SIZES = {
  full: "100vw",
  service: "(max-width: 1024px) 100vw, 25vw",
  columns: "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw",
  galleryWide: "(max-width: 768px) 100vw, 66vw",
  logo: "(max-width: 768px) 96px, 192px",
} as const;

export type ResponsiveImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
};

function stemFromSrc(src: string): string | null {
  const match = src.match(/^\/img\/(.+)\.webp$/);
  return match ? match[1] : null;
}

function buildSrcSet(stem: string, widths: number[], ext: "webp" | "avif"): string {
  return widths
    .map((w) => `/img/${stem}-${w}w.${ext} ${w}w`)
    .join(", ");
}

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  function ResponsiveImage(
    {
      src,
      width,
      height,
      alt,
      className,
      loading,
      fetchPriority,
      sizes = IMAGE_SIZES.full,
    },
    ref,
  ) {
    const entry = manifest[src];
    const stem = stemFromSrc(src);

    if (!entry || !stem || entry.widths.length < 2) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading={loading}
          fetchPriority={fetchPriority}
        />
      );
    }

    const defaultW = entry.widths[entry.widths.length - 1];
    const avifSrcSet = buildSrcSet(stem, entry.widths, "avif");
    const webpSrcSet = buildSrcSet(stem, entry.widths, "webp");

    return (
      <picture>
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        <img
          ref={ref}
          src={`/img/${stem}-${defaultW}w.webp`}
          srcSet={webpSrcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading={loading}
          fetchPriority={fetchPriority}
        />
      </picture>
    );
  },
);
