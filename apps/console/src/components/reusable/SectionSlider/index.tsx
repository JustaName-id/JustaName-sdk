import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../ui/drawer";

interface SectionSliderProps {
    side: 'left' | 'right';
    children: React.ReactNode;
    title: string;
    trigger: React.ReactNode;
}

export const SectionSlider = ({ side, children, title, trigger }: SectionSliderProps) => {
    return (

        <Drawer direction={side} >
            <DrawerTrigger className={`absolute z-[120] top-16 ${side === 'left' ? 'left-[-33px]' : 'right-[-42px]'}`}>
                {trigger}
            </DrawerTrigger>
            <DrawerContent disableOverlay>
                <DrawerHeader className="flex flex-row gap-[5px] items-center">
                    <DrawerClose>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <mask id="mask0_4168_2122" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                <rect width="20" height="20" transform="matrix(-1 0 0 1 20 0)" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_4168_2122)">
                                <path d="M13.3125 18.3333L14.7917 16.8542L7.93752 10L14.7917 3.14584L13.3125 1.66667L4.97919 10L13.3125 18.3333Z" fill="#3280F4" />
                            </g>
                        </svg>
                    </DrawerClose>
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    );
};
