export const getEmail = () => {
  const email = localStorage.getItem('user');
  return email ? JSON.parse(email) : [];
};

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify(email));
};
