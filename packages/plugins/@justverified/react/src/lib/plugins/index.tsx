import { JustaPlugin } from '@justaname.id/react-signin';
import { ClickableItem, VerificationsIcon } from '@justaname.id/react-ui';
import { JustVerifiedProvider } from '../providers';
import { Credentials } from '../types';
import { verifyRecords } from '../hooks/useVerifyRecords';
import { ChainId } from '@justaname.id/sdk';

export const JustVerifiedPlugin = (credentials: Credentials[], verificationBackendUrl= "https://api.justaname.id/verifications/v1", mApp = "justverified.eth" ): JustaPlugin => (
  {
    name: 'justverified',
    mApps: [mApp],
    components: {
      Providers: (pluginApi, children) => {
        const chainId = pluginApi.chainId
        if((chainId !==1 && chainId !== 11155111) || !chainId){
          return children
        }
        const open = pluginApi.getState<boolean>('verificationOpen') || false
        return (
          <JustVerifiedProvider
            openVerificationDialog={open}
            handleOpenVerificationDialog={(open) => {
              pluginApi.setState('verificationOpen', open)
            }}
            credentials={credentials}
            verificationBackendUrl={verificationBackendUrl}
            mApp={mApp}
            chainId={pluginApi.chainId as ChainId}
          >
            {children}
          </JustVerifiedProvider>
        )
      },
      SignInMenu: (pluginApi) => {
        return (
          <ClickableItem name={'Verifications'}
                         left={<VerificationsIcon width={20} />}
                         onClick={() => {
            pluginApi.setState('verificationOpen', true)
          }} />
        )
      }
    },
    hooks:{
      onWalletDisconnected: (pluginApi) => {
        pluginApi.setState('verificationOpen', false)
      },
      onEnsSignIn:async (pluginApi, ens, chainId, records, enabledMApps, canEnableMApps) => {
        if(chainId !== 1 && chainId!==11155111){
          return
        }

        const verifiableRecords = await verifyRecords(
          ens,
          credentials,
          chainId,
          false,
          mApp,
          verificationBackendUrl
        )

        if(Object.values(verifiableRecords).every((value) => value)){
          return
        }

        pluginApi.setState('verificationOpen', true)

        setTimeout(() => {
          if (canEnableMApps && !enabledMApps.includes('justverified.eth') && !Object.values(verifiableRecords).some((value) => value)) {
            pluginApi.handleOpenAuthorizeMAppDialog(mApp, true)
          }
        }, 1000)
      },
      onEnsSignOut: (pluginApi, ens) => {
        pluginApi.setState('verificationOpen', false)
      },
      onMAppAdd: (pluginApi, ens, mApp) => {
        pluginApi.setState('verificationOpen', true)
      }
    }
  }
)