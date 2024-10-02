import { LoadingDialog} from './dialogs/LoadingDialog'
import { DefaultDialog } from './dialogs/DefaultDialog'
import { JustaNameFooter } from './components/JustaNameFooter'
import { JustSignInButton } from './components/JustSignInButton'
export * from './plugins'
export * from './providers'
export * from './hooks'
export {
  JustaNameFooter,
  JustSignInButton,
  DefaultDialog as JustaNameDialog,
  LoadingDialog as JustaNameLoadingDialog,
}