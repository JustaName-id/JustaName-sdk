import {
  CredentialTemplate,
  VerifiableCredentialPresentation,
} from '@dentity/ens-client';
import { Records } from '@justaname.id/react';

export const getCredentialKeyValue = (
  credential: CredentialTemplate | undefined,
  credentialSubject: Record<string, any>
) => {
  if (!credential) return { textRecord: '', value: '' };
  switch (credential) {
    case CredentialTemplate.X:
      return { textRecord: 'com.x', value: credentialSubject.username };
    case CredentialTemplate.Telegram:
      return { textRecord: 'org.telegram', value: credentialSubject.name };
    case CredentialTemplate.Discord:
      return { textRecord: 'com.discord', value: credentialSubject.name };
    case CredentialTemplate.Email:
      return { textRecord: 'email', value: credentialSubject.verifiedEmail };
    case CredentialTemplate.ENS:
      return { textRecord: '', value: 'ENS verified' };
    case CredentialTemplate.Personhood:
      return { textRecord: 'avatar', value: 'Personhood verified' };
    default:
      return { textRecord: '', value: '' };
  }
};

export const compareVerificationWithRecord = (
  verification: {
    textRecord: string;
    value: any;
  },
  records?: Records
) => {
  if (!records) return true;
  switch (verification.textRecord) {
    case 'com.x': {
      const xSocial = records.sanitizedRecords.socials.find(
        (social) => social.name === 'X' || social.name === 'Twitter'
      );
      if (!xSocial) return true;
      return verification.value.toLowerCase() === xSocial.value.toLowerCase();
    }
    case 'org.telegram': {
      const telegramSocial = records.sanitizedRecords.socials.find(
        (social) => social.name === 'Telegram'
      );
      if (!telegramSocial) return true;
      return (
        verification.value.toLowerCase() === telegramSocial.value.toLowerCase()
      );
    }
    case 'com.discord': {
      const discordSocial = records.sanitizedRecords.socials.find(
        (social) => social.name === 'Discord'
      );
      if (!discordSocial) return true;
      return (
        verification.value.toLowerCase() === discordSocial.value.toLowerCase()
      );
    }
    case 'email': {
      const email = records.sanitizedRecords.email;
      if (!email) return true;
      return verification.value.toLowerCase() === email.toLowerCase();
    }
    default:
      return true;
  }
};

export const isVerificationDisplayable = (
  verification: VerifiableCredentialPresentation,
  records: Records | undefined
): boolean => {
  const credentialTemplateType = Object.values(CredentialTemplate).find(
    (template) => verification.type.includes(template)
  );

  if (!credentialTemplateType) {
    return false;
  }

  const credentialKeyValue = getCredentialKeyValue(
    credentialTemplateType,
    verification.credentialSubject
  );

  if (credentialKeyValue.textRecord.length === 0) {
    return false;
  }

  const isCredentialAsRecord = compareVerificationWithRecord(
    credentialKeyValue,
    records
  );

  if (!isCredentialAsRecord) {
    return false;
  }

  return true;
};
