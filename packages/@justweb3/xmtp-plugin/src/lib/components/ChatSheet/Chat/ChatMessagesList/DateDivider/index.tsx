import { Flex, P } from '@justweb3/ui';

interface DateDividerProps {
  date: string;
}

export const DateDivider: React.FC<DateDividerProps> = ({ date }) => (
  <Flex
    direction="row"
    align="center"
    gap="20px"
    style={{ marginBottom: '8px' }}
  >
    <div
      style={{
        width: '100%',
        height: 1,
        backgroundColor: 'var(--justweb3-foreground-color-2)',
        opacity: 0.35,
      }}
    />
    <P
      style={{
        textAlign: 'center',
        padding: '5px 0px',
        fontSize: '9px',
        fontWeight: 900,
        opacity: 0.35,
        minWidth: 'fit-content',
      }}
    >
      {date}
    </P>
    <div
      style={{
        width: '100%',
        height: 1,
        backgroundColor: 'var(--justweb3-foreground-color-2)',
        opacity: 0.35,
      }}
    />
  </Flex>
);
