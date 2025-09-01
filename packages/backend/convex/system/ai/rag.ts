import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";
import { components } from "../../_generated/api";

const rag = new RAG(components.rag, {
  textEmbeddingModel: openai.embedding("text-embedding-3-small"),
  embeddingDimension: 1536, // Needs to match your embedding model
});

export default rag;