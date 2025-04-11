"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import clsx from "clsx"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"
import { CommandList } from "../Command"
import { Button } from "../Button"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "../Command"
import styles from "./ComboBox.module.css"

interface ComboboxDataItem {
    label: string;
    value: string | number;
}

export interface ComboBoxProps {
    data: ComboboxDataItem[];
    value: string | number | undefined;
    onChange: (value: string | number) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    showSearch?: boolean;
    notFoundMessage?: string;
    buttonClassName?: string;
    popoverContentClassName?: string;
    commandItemClassName?: string;
}

export function ComboBox({
    data,
    value,
    onChange,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    showSearch = true,
    notFoundMessage = "Nothing found.",
    buttonClassName,
    popoverContentClassName,
    commandItemClassName
}: ComboBoxProps) {
    const [open, setOpen] = React.useState(false)

    const selectedLabel = React.useMemo(() => {
        return data.find((item) => item.value === value)?.label;
    }, [data, value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    role="combobox"
                    aria-expanded={open}
                    className={clsx(styles.triggerButton, buttonClassName)}
                >
                    {value ? selectedLabel : placeholder}
                    <ChevronsUpDown className={styles.chevronsIcon} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={clsx(styles.popoverContent, popoverContentClassName)}>
                <Command>
                    {showSearch && (
                        <CommandInput placeholder={searchPlaceholder} />
                    )}
                    <CommandList>
                        <CommandEmpty>{notFoundMessage}</CommandEmpty>
                        <CommandGroup>
                            {data.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value.toString()}
                                    className={commandItemClassName}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={clsx(
                                            styles.checkIcon,
                                            value === item.value ? styles.checkIconVisible : styles.checkIconHidden
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
