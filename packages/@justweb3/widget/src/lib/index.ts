import { LoadingDialog} from './dialogs/LoadingDialog';
import { DefaultDialog } from './dialogs/DefaultDialog';
import { JustaNameFooter } from './components/JustaNameFooter';

import { JustWeb3Button } from './components/JustWeb3Button'
export * from './plugins';
export * from './providers';
export * from './hooks'
export { JustaNameFooter,
  JustWeb3Button,
  DefaultDialog as JustaNameDialog, LoadingDialog as JustaNameLoadingDialog };