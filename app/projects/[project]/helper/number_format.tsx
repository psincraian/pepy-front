export function formatDownloads(
  downloads: number,
  maxPrecision: number = 2,
): string {
  let letter: string = "";
  if (downloads < 1_000) {
    letter = "";
  } else if (downloads < 1_000_000) {
    downloads = downloads / 1_000;
    letter = "k";
  } else if (downloads < 1_000_000_000) {
    downloads = downloads / 1_000_000;
    letter = "M";
  } else {
    downloads = downloads / 1_000_000_000;
    letter = "G";
  }

  if (downloads % 10 === 0 || Number.isInteger(downloads)) {
    return downloads.toFixed(0) + letter;
  }

  return downloads.toFixed(maxPrecision) + letter;
}
