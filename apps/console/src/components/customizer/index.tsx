import { JustWeb3Context, useDebounce } from '@justweb3/widget';
import { ColorSelector } from './colorSelector';
import { useContext, useEffect, useMemo, useState } from 'react';
import { OptionSelect } from './optionSelect';
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

    const isJustanIdSelected = useMemo(() => {
        return config.ensDomains?.some(domain => domain.ensDomain === 'justan.id');
    }, [config.ensDomains]);

    return (
        <div className="flex flex-col gap-[5px] w-[300px] border-r-[1px] z-[100] pointer-events-auto py-5 px-2.5 max-h-[100vh] overflow-y-auto">
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
                    <input
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className='h-9 py-2.5 flex-grow px-4 border-[1px] w-[150px] border-black rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Logo URL'
                    />
                </div>
            </div>
            <div className='w-full h-[1px] bg-[#CBD5E180]' />
            <div className="flex flex-col gap-2.5">
                <p className="text-base text-black font-bold leading-[125%] my-[5px]">Claim A Subname</p>
                <OptionSelect label='Justan.id' showFree selected={isJustanIdSelected ?? false} onSelect={(selected) => {
                    console.log(selected)
                }} />
            </div>
        </div>
    )
}