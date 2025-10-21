const API_URL = 'http://localhost:5000/api/projects';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  };
};

export const saveProject = async (files) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ files }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to save');
    return data;
  } catch (error) {
    console.error("Error saving project:", error);
    alert(error.message);
  }
};

export const getProjects = async () => {
  try {
    const response = await fetch(API_URL, { headers: getAuthHeaders() });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch projects');
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    alert(error.message);
  }
};

export const updateProject = async (projectId, files) => {
  try {
    const response = await fetch(`${API_URL}/${projectId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ files }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update');
    return data;
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

// NEW: Function to delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/${projectId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete');
    return data;
  } catch (error) {
    console.error("Error deleting project:", error);
    alert(error.message);
  }
};