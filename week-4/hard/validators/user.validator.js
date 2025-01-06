const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(255),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

module.exports = {
  registerSchema,
  loginSchema,
};
