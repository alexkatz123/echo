import Vapi from "@vapi-ai/web"
import { useEffect, useState } from "react"

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // only used api here as testing it customers will be providing theirs
        const vapiInstance = new Vapi("9f8adf42-34a0-4199-b79e-ea1aad5fc83d")
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnecting(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR")
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ]);
            }
        });

        return () => {
            vapiInstance?.stop();
        }

    }, [])

    const startCall = () => {
        setIsConnecting(true);

        if (vapi) {
            // only used api here as testing it customers will be providing theirs
            vapi.start("3f0d7c05-60bc-4fb9-898a-6e4531de9caf");
        }
    }

    const endCall = () => {
        if (vapi) {
            vapi.stop();
        }
    }

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }
}