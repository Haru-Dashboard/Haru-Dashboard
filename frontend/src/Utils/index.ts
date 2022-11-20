export function getFaviconSrc(url: string): string {
  const faviconSrc = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=64`;
  return faviconSrc;
}

export function isWithinHour(time: string): boolean {
  // Note: 1 hour equals to 3.6e+6 milliseconds
  return new Date().getTime() - Date.parse(time) <= 3.6e6;
}

export function isWithinDay(time: string): boolean {
  // Note: 1 day equals to 8.64e+7 milliseconds
  return new Date().getTime() - Date.parse(time) <= 8.64e7;
}
