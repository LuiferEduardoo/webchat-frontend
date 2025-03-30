import Cookies from 'js-cookie';

export const getTokenCookie = (TOKEN_COOKIE_NAME: string) => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

export const removeTokenCookie = (TOKEN_COOKIE_NAME: string) => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};