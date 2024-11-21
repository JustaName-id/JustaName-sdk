'use client';
import { JustaNameLogoIcon } from '@justweb3/ui';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { getAnalyticsClient } from '../../analytics';

export const Navbar = () => {
  return (
    <div className="w-screen flex z-[100] pointer-events-auto flex-row items-center justify-between h-[60px] p-2.5 border-b-[1px]">
      {/*<Image src="/static/logo.svg" alt="JustName" width={80} height={35} />*/}
      <JustaNameLogoIcon width={80} height={35} />
      <Link
        href={'https://docs.justaname.id'}
        passHref
        target="_blank"
        onClick={() => getAnalyticsClient().track('DOCS_LINK_CLICKED', {})}
      >
        <Button variant="secondary">Documentation</Button>
      </Link>
    </div>
  );
};
