import { JustSignInProviderConfig, useDebounce } from '@justaname.id/react-signin';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '../ui/input';
import { ClaimSection } from './claimSection';
import { ColorSelector } from './colorSelector';
import { SignSection } from './signSection';
import { VerifiedSection } from './verifiedSection';

interface CustomizerProps {
    config: JustSignInProviderConfig
    onConfigChange: (config: JustSignInProviderConfig) => void
}

export const Customizer = ({ config, onConfigChange }: CustomizerProps) => {
    const [logoUrl, setLogoUrl] = useState(config.logo ?? '');
    const { debouncedValue: logoUrlDebounced } = useDebounce(logoUrl, 1000);

    useEffect(() => {
        onConfigChange({
            ...config,
            logo: logoUrlDebounced
        });
    }, [logoUrlDebounced]);

    const isJustanIdSelected = useMemo(() => {
        return config.ensDomains?.some(domain => domain.ensDomain === 'justan.id');
    }, [config.ensDomains]);

    return (
        <div className="flex flex-col gap-[5px] min-w-[300px] w-[300px] border-r-[1px] z-[100] pointer-events-auto py-5 px-2.5 max-h-[calc(100vh-60px)] overflow-y-auto">
            {/* Colors */}
            <div className="flex flex-col gap-2.5">
                <p className="text-base text-black font-bold leading-[125%] my-[5px]">Customize Interface</p>
                <div className="flex flex-row justify-between gap-2.5 z-[10000]">
                    <ColorSelector colors={['#FFFFFF', '#000000']} title="Background Color" onColorChange={(color: string) => onConfigChange({
                        ...config,
                        color: {
                            ...config.color,
                            background: color
                        }
                    })} />
                    <ColorSelector colors={['#FEA801', '#C90018']} title="Accent Color" onColorChange={(color: string) => onConfigChange({
                        ...config,
                        color: {
                            ...config.color,
                            primary: color
                        }
                    })} />
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