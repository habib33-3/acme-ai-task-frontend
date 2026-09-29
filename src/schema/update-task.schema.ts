import { Priority } from "@/types";
import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().min(5).max(1000).optional(),
  priority: z.enum(Priority).optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
