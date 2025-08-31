import { openai } from "@ai-sdk/openai";
import { Agent } from "@convex-dev/agent"
import { components } from "../../../_generated/api"

export const supportAgent = new Agent(components.agent, {
    chat: openai.chat("gpt-4o-mini"),
    instructions: `You are a customer support agent. Use "resolveConversation" tool when user expresses finalization of the conversation. use "escalateConversation" tool when user expresses frustration or requests a human explicitly`,
});