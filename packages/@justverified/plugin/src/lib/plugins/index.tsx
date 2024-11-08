import { JustaPlugin } from '@justweb3/widget';
import { ArrowIcon, ClickableItem, VerificationsIcon } from '@justweb3/ui';
import { JustVerifiedProvider } from '../providers';
import { Credentials } from '../types';
import { verifyRecords } from '../hooks/useVerifyRecords';
import { VerificationSection } from '../components/VerificationSection';
import { ChainId } from '@justaname.id/sdk';

export const JustVerifiedPlugin = (
  credentials: Credentials[],
  verificationBackendUrl = 'https://api.justaname.id/verifications/v1',
  mApp = 'justverified.eth'
): JustaPlugin => ({
  name: 'JustVerifiedPlugin',
  // mApps: [mApp],
  components: {
    Provider: (pluginApi, children) => {
      const chainId = pluginApi.chainId;
      if ((chainId !== 1 && chainId !== 11155111) || !chainId) {
        return children;
      }
      const open = pluginApi.getState<boolean>('verificationOpen') || false;
      return (
        <JustVerifiedProvider
          openVerificationDialog={open}
          handleOpenVerificationDialog={(open) => {
            pluginApi.setState('verificationOpen', open);
          }}
          credentials={credentials}
          verificationBackendUrl={verificationBackendUrl}
          mApp={mApp}
          chainId={pluginApi.chainId as ChainId}
        >
          {children}
        </JustVerifiedProvider>
      );
    },
    SignInMenu: (pluginApi) => {
      return (
        <ClickableItem
          title={'Verifications'}
          left={<VerificationsIcon width={20} />}
          style={{
            width: '100%',
          }}
          onClick={() => {
            pluginApi.setState('verificationOpen', true);
          }}
          right={<ArrowIcon width={20} />}
        />
      );
    },
    ProfileSection: (pluginApi, ens, chainId) => {
      return (
        <VerificationSection
          ens={ens}
          credentials={['twitter', 'email', 'telegram', 'discord', 'github']}
          chainId={chainId}
          mApp={mApp}
          verificationBackendUrl={verificationBackendUrl}
        />
      );
    },
  },
  hooks: {
    onWalletDisconnected: (pluginApi) => {
      pluginApi.setState('verificationOpen', false);
    },
    onEnsSignIn: async (pluginApi, ens, chainId) => {
      if (chainId !== 1 && chainId !== 11155111) {
        return;
      }

      const verifiableRecords = await verifyRecords(
        ens,
        credentials,
        chainId,
        false,
        mApp,
        verificationBackendUrl
      );

      console.log('verifiableRecords', verifiableRecords);
      if (Object.values(verifiableRecords).every((value) => value)) {
        console.log('all verified');
        return;
      }

      console.log('not all verified');
      pluginApi.setState('verificationOpen', true);

      // setTimeout(() => {
      //   if (
      //     canEnableMApps &&
      //     !enabledMApps.includes('justverified.eth') &&
      //     !Object.values(verifiableRecords).some((value) => value)
      //   ) {
      //     pluginApi.handleOpenAuthorizeMAppDialog(mApp, true);
      //   }
      // }, 1000);
    },
    onEnsSignOut: (pluginApi, ens) => {
      pluginApi.setState('verificationOpen', false);
    },
    onMAppAdd: (pluginApi, ens, mApp) => {
      pluginApi.setState('verificationOpen', true);
    },
  },
});
