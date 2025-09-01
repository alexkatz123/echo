"use client"

import { useMutation } from "convex/react"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { api } from "@workspace/backend/_generated/api"
import type { PublicFile } from "@workspace/backend/private/files"

interface DeleteFileDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    file: PublicFile | null
    onDeleted?: () => void
}

export const DeleteFileDialog = ({
    open,
    onOpenChange,
    file,
    onDeleted
}: DeleteFileDialogProps) => {
    const deleteFile = useMutation(api.private.files.deleteFile);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!file) {
            return
        };

        setIsDeleting(true);
        try {
            await deleteFile({ entryId: file.id });
            onDeleted?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Error deleting file:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete File</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this file? this action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                {file && (
                    <div className="py-4">
                        <div className="rounded-lg border bg-muted/50 p-4">
                            <p className="font-medium">{file.name}</p>
                            <p className="text-muted-foreground text-sm">
                                Type: {file.type.toUpperCase()} | size: {file.size}
                            </p>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting || !file}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
