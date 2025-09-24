// ChatTextField/AttachmentButtons.tsx
import React, { RefObject } from 'react';
import { AddFolderIcon, AddImageIcon, AddVideoIcon, Flex } from '@justweb3/ui';

export interface AttachmentButtonsProps {
  onButtonClick: (contentType: 'image' | 'video' | 'application') => void;
  acceptedTypes: string | string[] | undefined;
  onAttachmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AttachmentButtons: React.FC<
  AttachmentButtonsProps & { inputFileRef: RefObject<HTMLInputElement> }
> = ({ onButtonClick, acceptedTypes, onAttachmentChange, inputFileRef }) => (
  <Flex direction="row" align="center" gap="10px">
    <AddImageIcon
      width="24"
      height="24"
      onClick={() => onButtonClick('image')}
      style={{ cursor: 'pointer' }}
    />
    <AddVideoIcon
      width="24"
      height="24"
      onClick={() => onButtonClick('video')}
      style={{ cursor: 'pointer' }}
    />
    <AddFolderIcon
      width="24"
      height="24"
      onClick={() => onButtonClick('application')}
      style={{ cursor: 'pointer' }}
    />
    <input
      type="file"
      id="file"
      ref={inputFileRef}
      onChange={onAttachmentChange}
      aria-label={'File picker'}
      accept={
        Array.isArray(acceptedTypes) ? acceptedTypes.join(',') : undefined
      }
      hidden
    />
  </Flex>
);
