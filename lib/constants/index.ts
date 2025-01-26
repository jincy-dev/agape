export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Agape";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Fashion meets love";
export const SERVER_URL =
  process.env.NEXT_PUBLICJ_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  name: 'peter',
  email: 'peter@example.com',
  password: 'password',
  confirmPassword: 'password',
};
