import { ConvexError, v } from "convex/values";
import { internalQuery } from "../_generated/server";

export const getOne = internalQuery({
    args: {
        contactSessionId: v.id("contactSessions"),
    },
    handler: async (ctx, args) => {
        return ctx.db.get(args.contactSessionId);
    }
})