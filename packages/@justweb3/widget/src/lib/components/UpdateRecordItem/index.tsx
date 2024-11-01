import { FC, useMemo } from 'react';
import { getChainIcon } from '../../icons/chain-icons';
import { getTextRecordIcon } from '../../icons/records-icons';
import { getContentHashIcon } from '../../icons/contentHash-icons';
import {
  Button,
  ClickableItem,
  Divider,
  Flex,
  SPAN,
  TrashIcon,
} from '@justweb3/ui';
import { getCoinTypeDetails, SupportedCoins } from '@justaname.id/sdk';

export interface UpdateRecordItemProps {
  previousValue: string;
  newValue: string;
  previousKey: string;
  newKey: string;
  type: 'text' | 'address' | 'contentHash';
  onDoNotApply?: () => void;
}

export const UpdateRecordItem: FC<UpdateRecordItemProps> = ({
  newKey,
  previousKey,
  previousValue,
  newValue,
  type,
  onDoNotApply,
}) => {
  const action = useMemo<'update' | 'add' | 'remove'>(() => {
    if (!newValue) {
      return 'remove';
    }

    if (!previousValue) {
      return 'add';
    }

    return 'update';
  }, [previousValue, newValue]);

  const newKeySanitized = useMemo(() => {
    if (type === 'address') {
      return getCoinTypeDetails(newKey as SupportedCoins)?.symbol.toUpperCase();
    }

    return newKey;
  }, [newKey, type]);

  const previousKeySanitized = useMemo(() => {
    if (type === 'address') {
      return getCoinTypeDetails(
        previousKey as SupportedCoins
      )?.symbol.toUpperCase();
    }

    return previousKey;
  }, [previousKey, type]);

  const postFix = useMemo(() => {
    if (type === 'address') {
      return ' Address';
    }

    return '';
  }, [type]);

  const newFullKey = useMemo(() => {
    return newKeySanitized + postFix;
  }, [newKeySanitized, postFix]);

  const previousFullKey = useMemo(() => {
    const _previousKeySanitized = previousKeySanitized
      ? previousKeySanitized + postFix
      : 'No Previous Value';
    return _previousKeySanitized;
  }, [previousKeySanitized, postFix]);

  const previousIcon = useMemo(() => {
    if (type === 'address') {
      return getChainIcon(previousKeySanitized);
    }

    if (type === 'text') {
      return getTextRecordIcon(previousKeySanitized);
    }

    if (type === 'contentHash') {
      return getContentHashIcon(previousKeySanitized);
    }

    return undefined;
  }, [previousKeySanitized, type]);

  const newIcon = useMemo(() => {
    if (type === 'address') {
      return getChainIcon(newKeySanitized);
    }

    if (type === 'text') {
      return getTextRecordIcon(newKeySanitized);
    }

    if (type === 'contentHash') {
      return getContentHashIcon(newKeySanitized);
    }

    return undefined;
  }, [newKeySanitized, type]);

  return (
    <Flex justify="space-between" direction="column" gap="10px">
      <Button
        variant={'destructive-outline'}
        rightIcon={<TrashIcon width={10} />}
        size={'sm'}
        style={{
          alignSelf: 'flex-end',
        }}
        onClick={onDoNotApply}
      >
        Do Not Apply
      </Button>
      <ClickableItem
        title={previousFullKey}
        subtitle={previousValue}
        clickable={false}
        style={{
          width: '100%',
        }}
        left={previousIcon}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Divider />
        <SPAN
          style={{
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 900,
            textWrap: 'nowrap',
          }}
        >
          {action === 'update'
            ? 'Field will be Updated To'
            : action === 'add'
            ? 'Field will be Added'
            : 'Field will be Deleted'}
        </SPAN>
        <Divider />
      </div>

      <ClickableItem
        title={newFullKey}
        subtitle={action === 'remove' ? 'Will be Deleted' : newValue}
        clickable={false}
        left={
          <Flex
            justify="center"
            align="center"
            style={{
              width: '24px',
              height: '24px',
              minWidth: '24px',
            }}
          >
            {newIcon}
          </Flex>
        }
        right={action === 'remove' ? <TrashIcon width={24} /> : undefined}
        style={{
          backgroundColor:
            action === 'remove' ? 'rgba(255, 0, 0, 0.10)' : undefined,
          width: '100%',
        }}
      />
    </Flex>
  );
};
