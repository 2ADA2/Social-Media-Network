export const fetchLogout = async () => {
  fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  });
};

