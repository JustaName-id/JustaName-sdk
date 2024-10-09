import { getExtraChains } from './extraChains';
import * as fs from 'fs';

export const removeExtraChains = () => {
  const extraChains = getExtraChains();
  console.log('Removing extra chains:', JSON.stringify(extraChains, null, 2));

  // I want to remove the extra chains from the icons/chains folder src/lib/icons/svgs/chains/

  for (const chain of extraChains) {
    fs.unlinkSync(`src/lib/icons/svgs/chains/${chain}.svg`);
  }
}

removeExtraChains();