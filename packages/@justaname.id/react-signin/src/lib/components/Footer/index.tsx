import { A, Flex, JustaNameLogoIcon, SPAN } from '@justaname.id/react-ui';

export const Footer = () => {
  return(
    <Flex
      align={'center'}
      justify={'space-between'}
      style={{
        padding: '10px 20px',
        background: 'var(--justaname-foreground-color-4)',
        borderRadius: ' 0 0 16px 16px'
      }}
    >
      <Flex
        justify={'center'}
        align={'center'}
        style={{
          height: '19px'
        }}
      >
        <SPAN
          style={{
            fontWeight: '700',
            fontSize: '12px'
          }}
        >
          Powered by <A
          style={{
            color: 'var(--justaname-primary-color)',
            fontWeight: '700',
            fontSize: '12px'

          }}
          href="https://justaname.id" target="_blank" rel="noreferrer">justaname.id</A>
        </SPAN>

      </Flex>
      <JustaNameLogoIcon />
    </Flex>
  )
}