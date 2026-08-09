export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,

    
    exp: Date.now() + 10 * 60 * 1000,
  };

  return btoa(JSON.stringify(payload));
};


export const decodeToken = (token) => {
  return JSON.parse(atob(token));
};


export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);

  return decoded.exp < Date.now();
};


export const refreshToken = (user) => {
  return generateToken(user);
};