import type { Locale } from "./config";
import { fr, type Dict } from "./dict.fr";
import { en } from "./dict.en";
import { pt } from "./dict.pt";

export type { Dict };

export const DICTS: Record<Locale, Dict> = { fr, en, pt };
