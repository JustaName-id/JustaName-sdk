import type { Attachment } from "@xmtp/content-type-remote-attachment";
import type { ChangeEvent } from "react";
import { useCallback } from "react";

interface useAttachmentChangeProps {
    setAttachment: (attachment: Attachment | undefined) => void;
    setAttachmentPreview: (url: string | undefined) => void;
    // setIsDragActive: (status: boolean) => void;
    onError?: (error: string) => void;
}

export const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const useAttachmentChange = ({
    setAttachment,
    setAttachmentPreview,
    // setIsDragActive,
    onError,
}: useAttachmentChangeProps) => {
    const onAttachmentChange = useCallback(
        (e: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const target = (e as ChangeEvent<HTMLInputElement>)?.target.files
                ? (e as ChangeEvent<HTMLInputElement>)?.target
                // TODO: if drag feature is needed, uncomment this line
                // : (e as React.DragEvent<HTMLDivElement>)?.dataTransfer.files
                // ? (e as React.DragEvent<HTMLDivElement>).dataTransfer
                : undefined;

            if (target?.files?.length && setAttachment) {
                const file = target.files[0];

                if (file.size > MAX_FILE_SIZE) {
                    onError && onError("File too large!");
                    // setIsDragActive(false);
                } else {
                    const fileReader = new FileReader();
                    fileReader.addEventListener("load", () => {
                        const data = fileReader.result;

                        if (!(data instanceof ArrayBuffer)) {
                            return;
                        }

                        const attachment: Attachment = {
                            filename: file.name,
                            mimeType: file.type,
                            data: new Uint8Array(data),
                        };

                        setAttachmentPreview(
                            URL.createObjectURL(
                                new Blob([Buffer.from(data)], {
                                    type: attachment.mimeType,
                                }),
                            ),
                        );

                        setAttachment(attachment);
                    });

                    fileReader.readAsArrayBuffer(file);
                    (e as ChangeEvent<HTMLInputElement>).target.value = "";
                }
            } else {
                setAttachment(undefined);
                setAttachmentPreview(undefined);
            }
            // setIsDragActive(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setAttachment, setAttachmentPreview, onError],
    );
    return {
        onAttachmentChange,
    };
};
