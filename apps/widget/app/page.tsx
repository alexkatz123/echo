"use client"

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { startCall, endCall, isSpeaking, isConnecting, isConnected, transcript } = useVapi();

  return (

    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button onClick={() => startCall()}>
        Start Call
      </Button>
      <Button onClick={() => endCall()} variant="destructive">
        End Call
      </Button>
      <p>isConnected: {`${isConnected}`}</p>
      <p>isConnecting: {`${isConnecting}`}</p>
      <p>isSpeaking: {`${isSpeaking}`}</p>
      <pre>{JSON.stringify(transcript, null, 2)}</pre>
    </div>
  )
}
