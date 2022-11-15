const backURL = process.env.REACT_APP_BACKURL;

// TODO
// move refreshToken from localStorage to somewhere else (cookie or chrome.storage)

export function tokenExists(): boolean {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    clearToken();
    return false;
  }
  return true;
}

export function getAccessToken(): string {
  const token = 'Bearer ' + localStorage.getItem('accessToken');
  return token;
}

export function saveTokenFromParams(): void {
  const accessToken = new URL(location.toString()).searchParams.get(
    'access_token',
  );
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    // TODO: hide url
    // refresh token도 저장
    chrome.tabs.update({ url: 'index.html' });
  }
}

export async function isValid(accessToken: string): Promise<boolean> {
  const response = await fetch(backURL + 'users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return true;
  }
  return false;
}

export async function reissueToken(accessToken: string): Promise<void> {
  // TODO: use store(redux) instead of location.reload()
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(backURL + 'auth/refresh', {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: refreshToken,
      accessToken: accessToken,
    }),
  });
  if (response.ok) {
    const data: { refreshToken: string; accessToken: string } =
      await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    location.reload();
    return;
  }
  clearToken();
  location.reload();
}

export function clearToken(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
