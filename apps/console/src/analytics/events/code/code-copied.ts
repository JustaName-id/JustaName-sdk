export const CODE_COPIED = 'CODE_COPIED';

export type CodeSnippet = 'integration' | 'dependencies';

export interface CodeCopiedPayload {
  /** Where in the UI the copy happened (e.g. 'code_section'). */
  location: string;
  /** Which snippet was copied: the integration code or the install command. */
  snippet: CodeSnippet;
}
