import z from "zod";

export const widgetSettingsSchema = z.object({
  greetMessage: z.string().min(1, "Greeting message is required"),
  defaultSuggestions: z.object({
    suggestion1: z.string().max(100).optional(),
    suggestion2: z.string().max(100).optional(),
    suggestion3: z.string().max(100).optional(),
  }),
  vapiSettings: z.object({
    assistantId: z.string().max(100).optional(),
    phoneNumber: z.string().max(15).optional(),
  }),
});