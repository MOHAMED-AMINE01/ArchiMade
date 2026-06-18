import { forwardRef } from "react";
import variants from "../data/image-variants.json";

type ImageTier = "render3d" | "display" | "standard" | "logo";

type VariantEntry = {
  width: number;
  height: number;
  widths: number[];
  tier?: ImageTier;
  deliveryFormat?: "auto" | "webp";
  sourceMaxWidth?: number;
  logo?: boolean;
};

const manifest = variants as Record<string, VariantEntry>;

/** Layout hints for the `sizes` attribute (retina + transform buffer). */
export const IMAGE_SIZES = {
  full: "100vw",
  service: "(max-width: 1024px) 100vw, 40vw",
  columns: "(max-width: 768px) 55vw, (max-width: 1280px) 40vw, 30vw",
  galleryWide: "(max-width: 768px) 100vw, 75vw",
  logo: "(max-width: 768px) 280px, 400px",
} as const;

export function intrinsicFromSrc(src: string) {
  const key = decodeURI(src);
  const e = manifest[key];
  return e
    ? { width: e.width, height: e.height }
    : { width: 1536, height: 1024 };
}

export function isRender3d(src: string): boolean {
  return manifest[decodeURI(src)]?.tier === "render3d";
}

export function isDisplayTier(src: string): boolean {
  const tier = manifest[decodeURI(src)]?.tier;
  return tier === "render3d" || tier === "display";
}

export function getTierSizesScale(tier?: ImageTier): number {
  if (tier === "render3d" || tier === "display") return 1.15;
  return 1;
}

function scaleSizes(sizes: string, scale: number): string {
  if (scale === 1) return sizes;
  return sizes.replace(/(\d+(?:\.\d+)?)(px|vw)/g, (_, n, unit) => {
    const scaled = Math.ceil(parseFloat(n) * scale);
    return `${scaled}${unit}`;
  });
}

export type ResponsiveImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  /** Multiplies numeric px/vw in `sizes` so the browser picks a larger srcset entry. */
  sizesScale?: number;
  /** `webp` skips AVIF (3D renders). `auto` uses manifest or AVIF+WebP. */
  format?: "auto" | "webp";
  decoding?: "async" | "sync" | "auto";
};

function stemFromSrc(src: string): string | null {
  const match = src.match(/^\/img\/(.+)\.webp$/);
  return match ? match[1] : null;
}

function buildSrcSet(
  stem: string,
  widths: number[],
  ext: "webp" | "avif",
): string {
  return widths.map((w) => `/img/${stem}-${w}w.${ext} ${w}w`).join(", ");
}

export const ResponsiveImage = forwardRef<
  HTMLImageElement,
  ResponsiveImageProps
>(function ResponsiveImage(
  {
    src,
    width,
    height,
    alt,
    className,
    loading,
    fetchPriority,
    sizes = IMAGE_SIZES.full,
    sizesScale,
    format = "auto",
    decoding = "async",
  },
  ref,
) {
  const key = decodeURI(src);
  const entry = manifest[key];
  const stem = stemFromSrc(key);
  const tier = entry?.tier;
  const resolvedSizesScale = sizesScale ?? getTierSizesScale(tier);
  const resolvedSizes = scaleSizes(sizes, resolvedSizesScale);
  const webpOnly =
    format === "webp" ||
    entry?.deliveryFormat === "webp" ||
    tier === "render3d";

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
        decoding={decoding}
      />
    );
  }

  const defaultW = entry.widths[entry.widths.length - 1];
  const webpSrcSet = buildSrcSet(stem, entry.widths, "webp");
  const avifSrcSet = buildSrcSet(stem, entry.widths, "avif");

  return (
    <picture>
      {!webpOnly && (
        <source type="image/avif" srcSet={avifSrcSet} sizes={resolvedSizes} />
      )}
      {!webpOnly && (
        <source type="image/webp" srcSet={webpSrcSet} sizes={resolvedSizes} />
      )}
      <img
        ref={ref}
        src={`/img/${stem}-${defaultW}w.webp`}
        srcSet={webpSrcSet}
        sizes={resolvedSizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
      />
    </picture>
  );
});
