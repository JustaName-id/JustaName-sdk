// Tabs.tsx

import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import styles from './Tabs.module.css';

interface AnimatedTabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  defaultValue: string;
  tabValues: string[];
  children: React.ReactNode;
}

type Direction = 'left' | 'right';

const TabsAnimationContext = React.createContext<Direction>('right');

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ defaultValue, tabValues, children, ...props }) => {
  const [value, setValue] = React.useState(defaultValue);
  const [prevValue, setPrevValue] = React.useState(defaultValue);
  const [direction, setDirection] = React.useState<Direction>('right');

  const handleValueChange = (newValue: string) => {
    const prevIndex = tabValues.indexOf(prevValue);
    const currIndex = tabValues.indexOf(newValue);
    setDirection(currIndex > prevIndex ? 'right' : 'left');
    setPrevValue(value);
    setValue(newValue);
  };

  return (
    <TabsAnimationContext.Provider value={direction}>
      <TabsPrimitive.Root
        value={value}
        onValueChange={handleValueChange}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsAnimationContext.Provider>
  );
};

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`${styles.tabsList} ${className || ''}`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`${styles.tabsTrigger} ${className || ''}`}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const direction = React.useContext(TabsAnimationContext);
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={`${styles.tabsContent} ${
        direction === 'left' ? styles.slideInLeft : styles.slideInRight
      } ${className || ''}`}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { AnimatedTabs as Tabs, TabsList, TabsTrigger, TabsContent };
