'use client';

import { GithubPlacement } from '@uiw/react-color-github';
import { Popover, PopoverContent, PopoverTrigger } from '@justweb3/ui';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMounted } from '@justaname.id/react';

const Chrome = dynamic(() => import('@uiw/react-color-chrome'), { ssr: false });

interface ColorSelectorProps {
  colors: string[];
  title: string;
  onColorChange: (color: string) => void;
}

export const ColorSelector = ({
  colors,
  title,
  onColorChange,
}: ColorSelectorProps) => {
  const mounted = useMounted();

  const [colorHsva, setColorHsva] = useState({ h: 0, s: 0, v: 0, a: 1 });

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-col py-2.5 px-[5px] gap-2.5 w-full">
      <p className="text-sm text-black font-medium leading-[100%]">{title}</p>
      <div className="flex flex-row gap-[5px]">
        {colors.map((color) => (
          <button
            key={'color-' + color}
            style={{
              background: color,
            }}
            className={`w-[20px] h-[20px] rounded-full border-black border-[1px] bg-[${color}]`}
            onClick={() => onColorChange(color)}
          ></button>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <button
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                background:
                  'linear-gradient(to right, orange, red, blue, purple, green)',
                cursor: 'pointer',
                border: '1px solid black',
              }}
            ></button>
          </PopoverTrigger>
          <PopoverContent
            style={{
              padding: '0',
              width: 'fit-content',
              background: 'transparent',
              border: 'none',
            }}
          >
            <Chrome
              color={colorHsva}
              showAlpha={false}
              style={{ float: 'left' }}
              placement={GithubPlacement.Top}
              onChange={(color) => {
                setColorHsva(color.hsva);
                onColorChange(color.hex);
              }}
            />
          </PopoverContent>
        </Popover>
        {/*<Popover*/}
        {/*  isOpen={isPopoverOpen}*/}
        {/*  positions={['top', 'bottom', 'left', 'right']}*/}
        {/*  onClickOutside={() => setIsPopoverOpen(false)}*/}
        {/*  content={*/}
        {/*    <div*/}
        {/*      style={{*/}
        {/*        position: 'absolute',*/}
        {/*        pointerEvents: 'auto',*/}
        {/*        zIndex: '99999999999999',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Chrome*/}
        {/*        color={colorHsva}*/}
        {/*        className="z-[100000000]"*/}
        {/*        showAlpha={false}*/}
        {/*        style={{ float: 'left' }}*/}
        {/*        placement={GithubPlacement.Top}*/}
        {/*        onChange={(color) => {*/}
        {/*          setColorHsva(color.hsva);*/}
        {/*          onColorChange(color.hex);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  }*/}
        {/*>*/}
        {/*  <button*/}
        {/*    style={{*/}
        {/*      height: '20px',*/}
        {/*      width: '20px',*/}
        {/*      borderRadius: '50%',*/}
        {/*      background:*/}
        {/*        'linear-gradient(to right, orange, red, blue, purple, green)',*/}
        {/*      cursor: 'pointer',*/}
        {/*      border: '1px solid black',*/}
        {/*    }}*/}
        {/*    onClick={() => setIsPopoverOpen(!isPopoverOpen)}*/}
        {/*  ></button>*/}
        {/*</Popover>*/}
      </div>
    </div>
  );
};
