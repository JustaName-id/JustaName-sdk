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
        <Flex direction='column' gap='4px' style={{
            width: '220px',
            paddingTop: '4px',
            border: '1px solid var(--justweb3-foreground-color-2)',
            borderRadius: '10px',
            // TODO: fix with vars
            background: 'white'
        }} >
            <Input
                style={{
                    height: '40px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    border: '1px solid var(--justweb3-foreground-color-2)'
                }}
                placeholder={`Search Emoji`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                overflowY: 'scroll',

            }}>
                {filteredEmojis.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => onEmojiClickHandler(emoji)}
                        style={{
                            padding: '2px',
                            fontSize: '20px',
                            borderRadius: '10px',
                            border: 'none',
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
