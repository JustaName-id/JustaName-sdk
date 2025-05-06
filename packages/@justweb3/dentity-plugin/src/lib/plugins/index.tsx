import { JustaPlugin } from '@justweb3/widget';
import { DentitySection } from '../components/DentitySection';

export const DentityPlugin: JustaPlugin = {
  name: 'DentityPlugin',
  components: {

    ProfileSection: (pluginApi, ens, address) => {
      return (
        <DentitySection ens={ens} />
      );
    },
  },
};
