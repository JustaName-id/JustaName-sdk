import { DISCORD_ENABLED, DiscordEnabledPayload } from './discord-enabled';
import { EMAIL_ENABLED, EmailEnabledPayload } from './email-enabled';
import { GITHUB_ENABLED, GithubEnabledPayload } from './github-enabled';
import { TELEGRAM_ENABLED, TelegramEnabledPayload } from './telegram-enabled';
import { TWITTER_ENABLED, TwitterEnabledPayload } from './twitter-enabled';

export const JUST_VERIFIED_EVENTS = {
  DISCORD_ENABLED,
  EMAIL_ENABLED,
  GITHUB_ENABLED,
  TELEGRAM_ENABLED,
  TWITTER_ENABLED,
} as const;

export interface JustVerifiedEventsPayload {
  [DISCORD_ENABLED]: DiscordEnabledPayload;
  [EMAIL_ENABLED]: EmailEnabledPayload;
  [GITHUB_ENABLED]: GithubEnabledPayload;
  [TELEGRAM_ENABLED]: TelegramEnabledPayload;
  [TWITTER_ENABLED]: TwitterEnabledPayload;
}
