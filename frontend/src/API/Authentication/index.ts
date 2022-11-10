export function Authentication() {
  const backURL = process.env.REACT_APP_BACKURL;
  const emails = process.env.REACT_APP_BACK_TMP_EMAIL;
  const URLNext = 'users/login';
  fetch(backURL + URLNext, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emails }),
  })
    .then((response) => response.json())
    .then((data) => {
      saveToken(data.accessToken);
    });
}
export function saveToken(tokens: string) {
  localStorage.setItem('accessToken', tokens);
}
export function checkTokenValidate(): boolean {
  const tokens = localStorage.getItem('accessToken');
  if (tokens !== null && tokens !== undefined) {
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
