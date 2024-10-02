// import { useMutation } from '@tanstack/react-query';
// import {
//   Credentials, DiscordEthereumEip712Signature,
//   GithubEthereumEip712Signature,
//   JustVerifiedResponse, TelegramEthereumEip712Signature,
//   TwitterEthereumEip712Signature
// } from '../../types';
// import { useMApps, useSignInWithJustaName } from '@justaname.id/react-signin';
//
//
// export interface SocialVerificationParams {
//   credential: Omit<Credentials, 'email'>;
// }
//
// export interface UseSocialVerificationResult {
//
// }
//
// export interface UseSocialVerificationParams {
//   verificationBackendUrl?: string;
//   onWindowClose?: () => void;
//   mApp?: string;
// }
//
// export const useSocialVerification = ({
//   mApp="justverified",
//   verificationBackendUrl="https://api.justaname.id/verification/v1",
//   onWindowClose = () => {}
//                                       }: UseSocialVerificationParams): UseSocialVerificationResult => {
//   const { mAppsAlreadyEnabled} = useMApps()
//
//   const mutate = useMutation({
//     mutationFn: async (_params: SocialVerificationParams) => {
//              const eventSource = new EventSource(
//           verificationBackendUrl + '/credentials/socials/'+ _params.credential,
//           { withCredentials: true }
//         );
//
//         eventSource.onmessage = (event) => {
//           try {
//             const data = JSON.parse(event.data);
//             if (data.redirectUrl) {
//               const newWindow = window.open(data.redirectUrl, '_blank');
//
//               const intervalId = setInterval(() => {
//                 if (newWindow?.closed) {
//                   clearInterval(intervalId);
//                   if (onWindowClose) {
//                     onWindowClose();
//                   }
//                 }
//               }, 500);
//             } else if (data.result) {
//               const result = data.result as JustVerifiedResponse;
//               const credentialKey = result.dataKey;
//               const credentialValue = result.verifiableCredential
//               const socialKey = credentialKey.split('_'+mApp)[0];
//               let socialValue = ''
//               switch(_params.credential) {
//                 case 'twitter': {
//                   const twitterCredential = data.result as JustVerifiedResponse<TwitterEthereumEip712Signature>;
//                   socialValue = twitterCredential.verifiableCredential.credentialSubject.username
//                   break;
//                 }
//                 case 'github': {
//                   const githubCredential = data.result as JustVerifiedResponse<GithubEthereumEip712Signature>;
//                   socialValue = githubCredential.verifiableCredential.credentialSubject.username
//                   break;
//                 }
//                 case 'telegram': {
//                   const telegramCredential = data.result as JustVerifiedResponse<TelegramEthereumEip712Signature>;
//                   socialValue = telegramCredential.verifiableCredential.credentialSubject.username
//                   break;
//                 }
//                 case 'discord': {
//                   const discordCredential = data.result as JustVerifiedResponse<DiscordEthereumEip712Signature>;
//                   socialValue = discordCredential.verifiableCredential.credentialSubject.username
//                   break;
//                 }
//                 default: {
//                   socialValue = '';
//                 }
//               }
//
//               if(mAppsAlreadyEnabled?.includes(mApp)){
//                 updateRecords({
//                   text: [
//                     {
//                       key: socialKey,
//                       value: socialValue
//                     }
//                   ]
//                 }).then(() => {
//                   refetchRecords()
//                   refetchVerifyRecords()
//                 })
//               }
//               else {
//                 updateRecords({
//                   text: [
//                     {
//                       key: socialKey,
//                       value: socialValue
//                     },
//                     {
//                       key: credentialKey,
//                       value: JSON.stringify(credentialValue)
//                     }
//                   ]
//                 }).then(() => {
//                   refetchRecords()
//                   refetchVerifyRecords()
//                 })
//               }
//
//
//               setSelectedCredential(undefined);
//               eventSource.close();
//             } else if (data.error) {
//               setSelectedCredential(undefined);
//               eventSource.close();
//             }
//           } catch (error) {
//             setSelectedCredential(undefined);
//           }
//         };
//
//         eventSource.onerror = (error) => {
//           setSelectedCredential(undefined);
//           refetchRecords();
//           refetchVerifyRecords();
//           eventSource.close();
//         };
//       };
//     }
//   })
//
// }