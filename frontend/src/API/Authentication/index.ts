export function saveToken(tokens: string) {
  localStorage.setItem('accessToken', tokens);
}
export function checkTokenValidate(): boolean {
  const tokens = localStorage.getItem('accessToken');
  if (
    tokens != null &&
    tokens != 'null' &&
    tokens != undefined &&
    tokens != 'undefined'
  ) {
    return true;
  } else {
    localStorage.removeItem('accessToken');
    return false;
  }
}
export function getAccessToken(): string {
  const token = 'Bearer ' + localStorage.getItem('accessToken');
  return token;
}
