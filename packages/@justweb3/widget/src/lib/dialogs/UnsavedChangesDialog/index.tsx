import React from 'react';
import { DefaultDialog } from '../DefaultDialog';
import { Button, Flex, P } from '@justweb3/ui';

export interface UnsavedChangesDialogProps {
  onDiscard: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
  onContinue: () => void;
}

export const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({
  onDiscard,
  open,
  onContinue,
}) => {
  return (
    <DefaultDialog
      open={open}
      header={
        <P
          style={{
            fontSize: '20px',
            fontWeight: 900,
            lineHeight: '20px',
            textAlign: 'center',
          }}
        >
          Discard Changes
        </P>
      }
      handleClose={onContinue}
    >
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        gap={'24px'}
      >
        <P
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '16px',
            textAlign: 'center',
          }}
        >
          Are you sure you want to discard changes?
        </P>
      </Flex>
      <Flex direction="row" justify="space-between" align="center" gap={'24px'}>
        <Button
          size={'md'}
          onClick={onDiscard}
          variant="secondary"
          style={{ flexGrow: '0.5' }}
        >
          Discard
        </Button>
        <Button
          size={'md'}
          onClick={onContinue}
          variant="primary"
          style={{ flexGrow: '0.5' }}
        >
          Continue
        </Button>
      </Flex>
    </DefaultDialog>
  );
};
