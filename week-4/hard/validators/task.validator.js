const { z } = require("zod");

const createTaskSchema = z.object({
  name: z
    .string()
    .min(1, "Task name is required")
    .max(255, "Task name cannot exceed 255 characters"),
  description: z
    .string()
    .min(1, "Task description is required")
    .max(500, "Task description cannot exceed 500 characters"),
  type: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
});

const updateTaskSchema = createTaskSchema.partial();

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
