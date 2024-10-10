import { Input } from '../ui/input';
import { ClaimSection } from './claimSection';
import { SignSection } from './signSection';
import { VerifiedSection } from './verifiedSection';
import { JustWeb3Context, useDebounce } from '@justweb3/widget';
import { ColorSelector } from './colorSelector';
import { useContext, useEffect, useState } from 'react';
import { useJustWeb3Theme } from '@justweb3/ui';

export const Customizer = () => {
    const { handleJustWeb3Config, config } = useContext(JustWeb3Context)
    const { changeTheme } = useJustWeb3Theme();
    const [logoUrl, setLogoUrl] = useState(config.logo ?? '');
    const { debouncedValue: logoUrlDebounced } = useDebounce(logoUrl, 1000);

    useEffect(() => {
        handleJustWeb3Config({
            ...config,
            logo: logoUrlDebounced
        });
    }, [logoUrlDebounced]);

    return (
        <div className="flex flex-col gap-[5px] min-w-[300px] w-[300px] border-r-[1px] z-[100] pointer-events-auto py-5 px-2.5 max-h-[calc(100vh-60px)] overflow-y-auto">
            {/* Colors */}
            <div className="flex flex-col gap-2.5">
                <p className="text-base text-black font-bold leading-[125%] my-[5px]">Customize Interface</p>
                <div className="flex flex-row justify-between gap-2.5 z-[10000]">
                    <ColorSelector colors={['#FFFFFF', '#000000']} title="Background Color" onColorChange={(color: string) =>
                      changeTheme('background', color)
                    }/>
                    <ColorSelector colors={['#FEA801', '#C90018']} title="Accent Color" onColorChange={(color: string) =>
                      changeTheme('primary', color)
                    } />
                </div>
                <div className="flex flex-row justify-between items-center max-w-full py-2.5 px-[5px] gap-2">
                    <p className="text-sm text-black font-medium leading-[100%] whitespace-nowrap">Add Logo</p>
                    <Input value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder='Logo URL'
                        className='pointer-events-auto'
                    />
                </div>
            </div>
            <div className='w-full h-[1px] bg-[#CBD5E180]' />
            <ClaimSection />
            <div className='w-full h-[1px] bg-[#CBD5E180]' />
            <SignSection />
            <div className='w-full h-[1px] bg-[#CBD5E180]' />
            <VerifiedSection />
        </div>
    )
}