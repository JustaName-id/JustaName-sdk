export interface AttachmentContent {
  data: Uint8Array;
  mimeType: string;
  filename: string;
  url?: string;
}

export interface ReplyContent {
  content: string | AttachmentContent;
  reference: string;
  contentType: {
    typeId: string;
  };
}

export interface ReactionContent {
  content: string;
  reference: string;
  schema: string;
  action: 'added' | 'removed';
}
