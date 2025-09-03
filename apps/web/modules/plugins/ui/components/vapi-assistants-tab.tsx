"use client";
import {
  BotIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { useVapiAssistants } from "../../hooks/use-vapi-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";

export const VapiAssistantsTab = () => {
  const { data: assistants, isLoading } = useVapiAssistants();

  return (
    <div className="border-t bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4">
              Assistant
            </TableHead>
            <TableHead className="px-6 py-4">
              Model
            </TableHead>
            <TableHead className="px-6 py-4">
              First Message
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell className="px-6 py-8 text-center text-muted-foreground" colSpan={3}>
                    Loading assistants...
                  </TableCell>
                </TableRow>
              )
            }

            if (assistants.length === 0) {
              return (
                <TableRow>
                  <TableCell className="px-6 py-8 text-center text-muted-foreground" colSpan={3}>
                    No assistants configured.
                  </TableCell>
                </TableRow>
              )
            }

            return assistants.map((assistant) => (
              <TableRow className="hover:bg-muted/50" key={assistant.id}>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <BotIcon className="size-4 text-muted-foreground"/>
                    <span>
                      {assistant.name || "Unnamed Assistant"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm">
                      {assistant.model?.model || "Not configured"}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs px-6 py-4">
                  {/* TODO: */}
                  {/* <Tooltip>
                    <TooltipTrigger>
                      <p className="truncate text-muted-foreground text-sm">
                        {assistant.firstMessage || "No greeting configured"}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                        {assistant.firstMessage || "No greeting configured"}
                    </TooltipContent>
                  </Tooltip> */}
                      <p className="truncate text-muted-foreground text-sm">
                        {assistant.firstMessage || "No greeting configured"}
                      </p>
                </TableCell>
              </TableRow>
            ))

          })()}
        </TableBody>
      </Table>
    </div>
  )
}