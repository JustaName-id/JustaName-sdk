import { Flex, LoadingSpinner } from '@justaname.id/react-ui';

export const Loading = () => {
  return (<Flex style={{
    padding:"40px",
  }}
        direction="column"
        align="center" justify="center"
  >

    <LoadingSpinner color={"var(--justaname-primary-color)"} />
  </Flex>)
}