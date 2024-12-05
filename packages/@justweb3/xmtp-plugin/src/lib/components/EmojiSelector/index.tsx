import { Flex, Input } from '@justweb3/ui';
import React, { useMemo } from 'react';
import { EmojiObject, emojis } from '../../utils/emojis';
import { useDebounced } from '../../hooks';


interface EmojiSelectorProps {
    onEmojiSelect: (emoji: string) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
    onEmojiSelect,
}) => {
    const [searchValue, setSearchValue] = React.useState("");

    const {
        value: debouncedSearch,
    } = useDebounced<string>(searchValue, 50);

    const onEmojiClickHandler = (emoji: EmojiObject) => {
        onEmojiSelect(emoji.name);

    }

    const filteredEmojis = useMemo(() => {
        if (debouncedSearch.length === 0) return emojis;
        const filteredEmojis = emojis.filter(emoji =>
            emoji.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        return filteredEmojis;
    }, [debouncedSearch]);


    return (
        <Flex direction='column' gap='10px' style={{
            width: '340px',
            padding: '5px',
            border: '2px solid rgba(var(--justweb3-foreground-color-2), 0.9)',
            borderRadius: '5px',
            background: 'var(--justweb3-foreground-color-4)'
        }} >
            <Input
                style={{
                    height: '20px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    border: '2px solid var(--justweb3-foreground-color-4)'
                }}
                placeholder={`Search Emoji`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className='justweb3scrollbar' style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
                gap: '10px',
                overflowY: 'scroll',
                maxHeight: '200px'

            }}>
                {filteredEmojis.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => onEmojiClickHandler(emoji)}
                        style={{
                            aspectRatio: '1',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {emoji.emoji}
                    </button>
                ))}
            </div>
        </Flex>

    );
};

export default EmojiSelector;
