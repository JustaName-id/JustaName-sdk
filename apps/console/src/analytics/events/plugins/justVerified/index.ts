import { DISCORD_DISABLED, DiscordDisabledPayload } from './discord-disabled';
import { DISCORD_ENABLED, DiscordEnabledPayload } from './discord-enabled';
import { EMAIL_DISABLED, EmailDisabledPayload } from './email-disabled';
import { EMAIL_ENABLED, EmailEnabledPayload } from './email-enabled';
import { GITHUB_DISABLED, GithubDisabledPayload } from './github-disabled';
import { GITHUB_ENABLED, GithubEnabledPayload } from './github-enabled';
import {
  TELEGRAM_DISABLED,
  TelegramDisabledPayload,
} from './telegram-disabled';
import { TELEGRAM_ENABLED, TelegramEnabledPayload } from './telegram-enabled';
import { TWITTER_DISABLED, TwitterDisabledPayload } from './twitter-disabled';
import { TWITTER_ENABLED, TwitterEnabledPayload } from './twitter-enabled';

export const JUST_VERIFIED_EVENTS = {
  DISCORD_DISABLED,
  DISCORD_ENABLED,
  EMAIL_DISABLED,
  EMAIL_ENABLED,
  GITHUB_DISABLED,
  GITHUB_ENABLED,
  TELEGRAM_DISABLED,
  TELEGRAM_ENABLED,
  TWITTER_DISABLED,
  TWITTER_ENABLED,
} as const;

export interface JustVerifiedEventsPayload {
  [DISCORD_DISABLED]: DiscordDisabledPayload;
  [DISCORD_ENABLED]: DiscordEnabledPayload;
  [EMAIL_DISABLED]: EmailDisabledPayload;
  [EMAIL_ENABLED]: EmailEnabledPayload;
  [GITHUB_DISABLED]: GithubDisabledPayload;
  [GITHUB_ENABLED]: GithubEnabledPayload;
  [TELEGRAM_DISABLED]: TelegramDisabledPayload;
  [TELEGRAM_ENABLED]: TelegramEnabledPayload;
  [TWITTER_DISABLED]: TwitterDisabledPayload;
  [TWITTER_ENABLED]: TwitterEnabledPayload;
}
