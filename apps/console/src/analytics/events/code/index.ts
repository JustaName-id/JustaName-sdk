import { CODE_COPIED, CodeCopiedPayload } from './code-copied';

export const CODE_EVENTS = {
  CODE_COPIED,
} as const;

export interface CodeEventPayload {
  [CODE_COPIED]: CodeCopiedPayload;
}
