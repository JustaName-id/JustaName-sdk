import { CredentialTemplate } from '@dentity/ens-client';

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
