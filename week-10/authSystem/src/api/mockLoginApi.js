const mockAPI = {
  login: async (credentials) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      return {
        success: true,
        user: {
          username: credentials.username,
          role: "admin",
        },
      };
    }
    throw new Error("Invalid credentials");
  },
};

export default mockAPI;
