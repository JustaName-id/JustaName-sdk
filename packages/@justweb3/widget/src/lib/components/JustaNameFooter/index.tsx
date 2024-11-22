import { A, Flex, JustaNameLogoIcon, SPAN } from '@justweb3/ui';

export const JustaNameFooter = () => {
  return (
    <Flex
      align={'center'}
      justify={'space-between'}
      style={{
        padding: '10px 20px',
        background: 'var(--justweb3-foreground-color-4)',
        borderRadius: ' 0 0 24px 24px',
      }}
    >
      <Flex
        justify={'center'}
        align={'center'}
        style={{
          height: '19px',
        }}
      >
        <SPAN
          style={{
            fontWeight: '700',
            fontSize: '12px',
          }}
        >
          Powered by{' '}
          <A
            style={{
              color: 'var(--justweb3-primary-color)',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer',
            }}
            href="https://justaname.id"
            target="_blank"
            rel="noreferrer"
          >
            justaname.id
          </A>
        </SPAN>
      </Flex>
      <A
        style={{
          color: 'var(--justweb3-primary-color)',
          fontWeight: '700',
          fontSize: '12px',
          cursor: 'pointer',
        }}
        href="https://justaname.id"
        target="_blank"
        rel="noreferrer"
      >
        <JustaNameLogoIcon width={54} height={25} />
      </A>
    </Flex>
  );
};
