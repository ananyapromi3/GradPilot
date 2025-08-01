// Mock authentication service
const API_URL = "https://gradpilot.me"; // Update with your actual API URL
// const API_URL = "http://localhost:8082"; // Use the correct backend URL for auth

export async function loginUser(email, password) {
  // Mock validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  let response;

  try {
    response = await fetch(
      // "http://57.159.24.58:8082/api/v1/auth/login",
      `${API_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...data.user, userType: "student" })
    );

    return {
      user: { ...data.user, userType: "student" },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function loginMentor(email, password) {
  // Mock validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  let response;

  try {
    response = await fetch(
      // "http://57.159.24.58:8082/api/v1/mentor/auth/login",
      `${API_URL}/api/v1/mentor/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Mentor login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...data.mentor, userType: "mentor" })
    );

    return {
      user: { ...data.mentor, userType: "mentor" },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function registerUser(userData) {
  // Simulate API call
  // await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock validation
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error("Name, email, and password are required");
  }

  if (!userData.email.includes("@")) {
    throw new Error("Please enter a valid email address");
  }

  if (userData.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  let response;
  try {
    response = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Store auth state in localStorage
  // localStorage.setItem("token", "mock-jwt-token")
  // localStorage.setItem(
  //   "user",
  //   JSON.stringify({
  //     userId: "user-" + Math.floor(Math.random() * 1000),
  //     name: userData.name,
  //     email: userData.email,
  //   }),
  // )

  // Mock successful response
}

export async function registerMentor(userData) {
  // Mock validation
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error("Name, email, and password are required");
  }

  if (!userData.email.includes("@")) {
    throw new Error("Please enter a valid email address");
  }

  if (userData.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  let response;
  try {
    response = await fetch(`${API_URL}/api/v1/mentor/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Mentor registration failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...data.mentor, userType: "mentor" })
    );

    return { user: { ...data.mentor, userType: "mentor" } };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function logoutUser() {
  // Clear auth state from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock successful response
  return {
    message: "Logged out successfully",
  };
}

export async function getCurrentUser() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Check if we have a user in localStorage
  const userJson = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!userJson || !token) {
    return null;
  }

  try {
    // Parse and return the user data
    return JSON.parse(userJson);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}
