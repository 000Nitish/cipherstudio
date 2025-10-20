const API_URL = 'http://localhost:5000/api/users';

/**
 * Registers a new user.
 * @param {object} userData - The user's data, including username and password.
 * @returns {Promise<object>} The server's response.
 */
export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    // If the server responds with an error, throw it so we can catch it.
    throw new Error(data.msg || 'Failed to register');
  }
  return data;
};

/**
 * Logs in a user.
 * @param {object} userData - The user's data, including username and password.
 * @returns {Promise<object>} The server's response, containing the auth token.
 */
export const login = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || 'Failed to login');
  }
  return data;
};