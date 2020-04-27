export function formatDownloads(downloads, maxPrecision = 2) {
  let letter = null;
  if (downloads < 1000) {
    letter = '';
  } else if (downloads < 1000000) {
    downloads = downloads / 1000;
    letter = 'k';
  } else if (downloads < 1000000000) {
    downloads = downloads / 1000000;
    letter = 'M';
  } else {
    downloads = downloads / 1000000000;
    letter = 'G';
  }

  if (downloads % 10 === 0 || Number.isInteger(downloads)) {
    return downloads.toFixed(0) + letter;
  }

  return downloads.toFixed(maxPrecision) + letter;
}
