import store from "./store";

// POST request function
export const post = async ({ path, requestBody, header = {} }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = store.getState().auth.token;

  // Check if requestBody is FormData
  const isFormData = requestBody instanceof FormData;

  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: token ? `Bearer ${token}` : undefined, // Add Authorization header if token exists
      ...header,
    },
    body: isFormData ? requestBody : JSON.stringify(requestBody),
  });

  const body = await response.json();
  return body;
};

// GET request function
export const get = async ({ path, header = {}, responseType = "json" }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = store.getState().auth.accessToken; // Get the token from the Redux store

  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined, 
      ...header,
    },
  });

  // Handle different response types
  if (responseType === "blob") {
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } else {
    const body = await response.json();
    return body;
  }
};

// PUT request function
export const put = async ({ path, requestBody, header = {} }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = store.getState().auth.token;
  const response = await fetch(`${baseUrl}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined, // Add Authorization header if token exists
      ...header,
    },
    body: JSON.stringify(requestBody),
  });

  const body = await response.json();
  return body;
};

// PATCH request function
export const patch = async ({ path, requestBody, header = {} }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = store.getState().auth.token;
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined, // Add Authorization header if token exists
        ...header,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text(); // or response.json()
      console.error("Server error:", errorBody);
      throw new Error(`Request failed with status ${response.status}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error in patch request:", error);
    throw error;
  }
};