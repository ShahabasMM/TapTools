export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://taptools.app").replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}
