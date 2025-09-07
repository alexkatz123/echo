"use client";

import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IntegrationId, INTEGRATIONS } from "../../constants";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copying, setCopying] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");
  
  const { organization } = useOrganization();

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization ID not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    setSelectedSnippet(snippet);
    setDialogOpen(true);
  }

  const handleCopy = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(organization?.id || "");
      setTimeout(() => {
        setCopying(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      setCopying(false);
    }
  };

  return (
    <>
    <IntegrationsDialog open={dialogOpen} onOpenChange={setDialogOpen} snippet={selectedSnippet} />
    <div className="flex min-h-screen flex-col bg-muted p-8">
      <div className="mx-auto w-full max-w-screen-md">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl">Setup & Integrations</h1>
          <p className="text-muted-foreground">
            Choose the integration that's right for you.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            <Label className="w-34" htmlFor="organization-id">
              Organization ID
            </Label>
            <Input
              disabled
              id="organization-id"
              readOnly
              value={organization?.id || ""}
              className="flex-1 bg-background font-mono text-sm"
            />
            <Button className="gap-2" onClick={handleCopy} size="sm">
              {copying ? (
                <CopyCheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
              {copying ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <Separator className="my-8" />
        <div className="space-y-6">
          <div className="space-y-1">
            <Label className="text-lg">Integrations</Label>
            <p className="text-muted-foreground text-sm">
              Add the following code snippet to your website to enable Echo
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {INTEGRATIONS.map((integration) => (
              <button
                key={integration.id}
                className="flex items-center gap-4 rounded-lg border bg-background p-4 hover:bg-accent"
                onClick={() => handleIntegrationClick(integration.id)}
                type="button"
              >
                <Image
                  src={integration.icon}
                  alt={integration.name}
                  height={32}
                  width={32}
                />
                <p>{integration.name}</p>
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
    </>
  );
};


export const IntegrationsDialog = (
  {
    open, 
    onOpenChange,
    snippet,
  }: {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    snippet: string;
  }
) => {


  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(snippet);
      setTimeout(() => {
        setCopying(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      setCopying(false);
    }
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow these steps to add the chatbox to your website
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the following code
            </div>
            <div className="group relative">
              <pre className="max-h-[300px] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-md bg-foreground p-2 font-mono text-secondary text-sm">
                {snippet}
              </pre>
              <Button
                className="absolute right-6 top-4 size-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleCopy}
                size="icon"
                variant="secondary"
              >
                {copying ? (
                  <CopyCheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code to your website
            </div>
            <p className="text-sm text-muted-foreground">
              Paste the chatbox code into your page. you can add it in the HTML head section.
            </p>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  )
}