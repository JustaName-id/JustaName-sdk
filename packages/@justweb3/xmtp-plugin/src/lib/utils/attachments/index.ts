export const typeLookup: Record<string, AttachmentType> = {
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  webp: 'image',
  quicktime: 'video',
  mov: 'video',
  mp4: 'video',
  pdf: 'application',
  doc: 'application',
};

export type AttachmentType = 'image' | 'video' | 'application' | undefined;
