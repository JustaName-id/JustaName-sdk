import { Flex, LoadingSpinner } from '@justweb3/ui';

export const Loading = () => {
  return (
    <Flex
      style={{
        padding: '40px',
      }}
      direction="column"
      align="center"
      justify="center"
    >
      <LoadingSpinner color={'var(--justweb3-primary-color)'} />
    </Flex>
  );
};
