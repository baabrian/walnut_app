export enum LOCAL_STORAGE {
  TOKEN = 'TOKEN',
  EXPIRY = 'EXPIRY',
}

export const setSession = (token: string, expiry: string): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE.EXPIRY, expiry);
  } catch (e) {
    console.log('error in set session');
  }
};

export const clearSession = (): void => {
  try {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.EXPIRY);
  } catch (e) {
    console.log('error in clearing session');
  }
};

export const isSessionValid = (): boolean => {
  try {
    const expiry = localStorage.getItem(LOCAL_STORAGE.EXPIRY);
    if (expiry) {
      return new Date(expiry) > new Date(Date.now());
    }

    return false;
  } catch (e) {
    console.log('session is not valid');
    return false;
  }
};

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE.TOKEN)}`,
});
