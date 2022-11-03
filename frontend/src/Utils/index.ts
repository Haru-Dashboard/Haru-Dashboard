export function convertRemToPixels(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getFaviconSrc(url: string): string {
  const faviconSrc = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=64`;
  return faviconSrc;
}

export function clearChromeLocalStorage(): void {
  chrome.storage.local.clear();
}
