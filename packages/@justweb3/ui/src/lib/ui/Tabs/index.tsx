import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import styles from './Tabs.module.css';

interface AnimatedTabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  defaultValue: string;
  // tabValues: string[];
  children: React.ReactNode;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  defaultValue,
  // tabValues,
  children,
  ...props
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={handleValueChange}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  );
};

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`${styles.tabsList} ${styles.underlinedTabs} ${className || ''}`}
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
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={`${styles.tabsContent} ${className || ''}`}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { AnimatedTabs as Tabs, TabsList, TabsTrigger, TabsContent };
