const backURL = process.env.REACT_APP_BACKURL;

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
  const refreshToken = new URL(location.toString()).searchParams.get(
    'refresh_token',
  );
  if (accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);

    // TODO
    // move refreshToken from localStorage to somewhere else (cookie? or chrome.storage?)
    localStorage.setItem('refreshToken', refreshToken);
    // TODO: hide url
    chrome.tabs.update({ url: 'index.html' });
  }
  if (accessToken || refreshToken) {
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
  let flag = true;
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    const response = await fetch(backURL + 'auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refreshToken: refreshToken,
        accessToken: accessToken,
      }),
    });
    if (response.ok) {
      flag = false;
      const data: { accessToken: string } = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
    }
  }
  if (flag) {
    clearToken();
  }
  // Note Now you have a valid accessToken or you don't have any tokens.
  // TODO: use store(redux) instead of location.reload()
  location.reload();
}

export function clearToken(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userName');
}

export function logout() {
  // TODO: send logout signal to backend
}
