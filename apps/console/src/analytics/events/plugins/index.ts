import { EFP_DISABLED, EfpDisabledPayload } from './efp-disabled';
import { EFP_ENABLED, EfpEnabledPayload } from './efp-enabled';
import {
  JUST_VERIFIED_DISABLED,
  JustVerifiedDisabledPayload,
} from './just-verified-disabled';
import {
  JUST_VERIFIED_ENABLED,
  JustVerifiedEnabledPayload,
} from './just-verified-enabled';
import {
  JUST_VERIFIED_EVENTS,
  JustVerifiedEventsPayload,
} from './justVerified';
import { POAP_DISABLED, PoapDisabledPayload } from './poap-disabled';
import { POAP_ENABLED, PoapEnabledPayload } from './poap-enabled';
import {
  TALENT_PROTOCOL_DISABLED,
  TalentProtocolDisabledPayload,
} from './talent-protocol-disabled';
import {
  TALENT_PROTOCOL_ENABLED,
  TalentProtocolEnabledPayload,
} from './talent-protocol-enabled';
import { XMTP_DISABLED, XmtpDisabledPayload } from './xmtp-disabled';
import { XMTP_ENABLED, XmtpEnabledPayload } from './xmtp-enabled';

export const PLUGINS_EVENTS = {
  JUST_VERIFIED_DISABLED,
  JUST_VERIFIED_ENABLED,
  EFP_DISABLED,
  EFP_ENABLED,
  POAP_DISABLED,
  POAP_ENABLED,
  TALENT_PROTOCOL_DISABLED,
  TALENT_PROTOCOL_ENABLED,
  XMTP_DISABLED,
  XMTP_ENABLED,
  ...JUST_VERIFIED_EVENTS,
} as const;

export interface PluginsEventPayload extends JustVerifiedEventsPayload {
  [JUST_VERIFIED_DISABLED]: JustVerifiedDisabledPayload;
  [JUST_VERIFIED_ENABLED]: JustVerifiedEnabledPayload;
  [EFP_DISABLED]: EfpDisabledPayload;
  [EFP_ENABLED]: EfpEnabledPayload;
  [POAP_DISABLED]: PoapDisabledPayload;
  [POAP_ENABLED]: PoapEnabledPayload;
  [TALENT_PROTOCOL_DISABLED]: TalentProtocolDisabledPayload;
  [TALENT_PROTOCOL_ENABLED]: TalentProtocolEnabledPayload;
  [XMTP_DISABLED]: XmtpDisabledPayload;
  [XMTP_ENABLED]: XmtpEnabledPayload;
}
