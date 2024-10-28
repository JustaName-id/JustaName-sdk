import { JustaPlugin } from '@justweb3/widget';
import { ArrowIcon, ClickableItem } from '@justweb3/ui';
import { EFPIcon } from '../icons/EFPIcon';
export const EFPPlugin: JustaPlugin = {
  name: 'EFPPlugin',
  components: {
    SignInMenu: (pluginApi) => {
      return (
        <ClickableItem
          title={'E.F.P'}
          left={<EFPIcon width={20} />}
          style={{
            width: '100%',
          }}
          onClick={() => {
            pluginApi.setState('efpOpen', true);
          }}
          right={<ArrowIcon width={20} />}
        />
      );
    },
  },
}
