import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import {
  useRecords,
  UseSubnameUpdateFunctionParams,
  useUpdateChanges,
  useUpdateSubname,
} from '@justaname.id/react';
import {
  Badge,
  Button,
  Carousel,
  DialogClose,
  Flex,
  H2,
  JustaNameLogoIcon,
  SPAN,
} from '@justweb3/ui';
import { DefaultDialog } from '../DefaultDialog';
import { Loading } from '../../components/Loading';
import { UpdateRecordItem } from '../../components/UpdateRecordItem';
import usePreviousState from '../../hooks/usePreviousState';

export interface UpdateRecordDialogProps
  extends Omit<UseSubnameUpdateFunctionParams, 'ens'> {
  ens?: string | undefined;
  logo?: string;
  open: boolean;
  handleOpen: (open: boolean) => void;
  disableOverlay?: boolean;
}

export const UpdateRecordDialog: FC<UpdateRecordDialogProps> = ({
  text: initialText,
  addresses: initialAddresses,
  contentHash: initialContentHash,
  open,
  handleOpen,
  disableOverlay,
  logo,
  ens,
}) => {
  const [text, setText] = useState(initialText);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [contentHash, setContentHash] = useState(initialContentHash);
  const { records, isRecordsLoading } = useRecords({
    ens: ens,
  });

  const [isInitialPending, setIsInitialPending] = useState(true);
  const { changes: newChanges, isUpdateChangesPending } = useUpdateChanges({
    ens: ens || '',
    text,
    addresses,
    contentHash: contentHash,
  });

  const previousState = usePreviousState(newChanges, [newChanges]);

  const changes = useMemo(() => {
    if (newChanges) {
      return newChanges;
    }

    return previousState;
  }, [newChanges, previousState]);
  const { updateSubname, isUpdateSubnamePending } = useUpdateSubname();

  useEffect(() => {
    setText(initialText);
    setAddresses(initialAddresses);
    setContentHash(initialContentHash);
  }, [initialText, initialAddresses, initialContentHash]);

  useEffect(() => {
    if (!isUpdateChangesPending) {
      setIsInitialPending(false);
    }

    return () => {
      setIsInitialPending(true);
    };
  }, [isUpdateChangesPending]);

  return (
    <DefaultDialog
      contentStyle={{
        maxWidth: '400px',
        minWidth: '300px',
        width: '100%',
      }}
      header={
        <div
          style={{
            paddingLeft: '24px',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          {logo ? (
            <img
              src={logo}
              alt="logo"
              style={{ height: '62px', width: 'auto' }}
            />
          ) : (
            <JustaNameLogoIcon height={62} />
          )}
        </div>
      }
      open={open}
      onOpenChange={(_open) => handleOpen(_open)}
      disableOverlay={disableOverlay}
    >
      {isRecordsLoading || isInitialPending ? (
        <div style={{ height: '393px', position: 'relative' }}>
          <Loading />
        </div>
      ) : (
        <Flex justify="space-between" direction="column" gap="20px">
          <Badge value={ens}>
            <SPAN
              style={{
                fontSize: '10px',
                lineHeight: '10px',
                fontWeight: 900,
                color: 'var(--justweb3-primary-color)',
              }}
            >
              {ens}
            </SPAN>
          </Badge>

          <Flex justify="space-between" direction="column" gap="10px">
            <H2>Do you want to update the following records?</H2>
          </Flex>

          {changes &&
          ((changes?.changedAddresses &&
            changes?.changedAddresses?.length > 0) ||
            (changes?.changedTexts && changes?.changedTexts?.length > 0) ||
            changes?.changedContentHash) ? (
            <Carousel
              autoPlay={true}
              autoPlaySpeed={2000}
              slides={[
                ...(changes &&
                changes?.changedAddresses &&
                changes?.changedAddresses?.length > 0
                  ? changes.changedAddresses.map((change, index) => (
                      <Fragment key={'address-' + index}>
                        <UpdateRecordItem
                          previousKey={
                            records?.records.coins?.find(
                              (address) => address.id === change.coinType
                            )?.name || ''
                          }
                          newKey={change.coinType.toString()}
                          previousValue={
                            records?.records.coins?.find(
                              (address) => address.id === change.coinType
                            )?.value || ''
                          }
                          newValue={change.address}
                          type={'address'}
                          onDoNotApply={() => {
                            setAddresses((prevState) => {
                              if (!prevState) {
                                return prevState;
                              }

                              if (Array.isArray(prevState)) {
                                return prevState.filter(
                                  (address) =>
                                    address.coinType !==
                                    change.coinType.toString()
                                );
                              } else {
                                return {
                                  ...prevState,
                                  [change.coinType]: undefined,
                                };
                              }
                            });
                          }}
                        />
                      </Fragment>
                    ))
                  : []),
                ...(changes &&
                changes?.changedTexts &&
                changes?.changedTexts?.length > 0
                  ? changes.changedTexts.map((change, index) => (
                      <Fragment key={'text-' + index}>
                        <UpdateRecordItem
                          previousKey={
                            records?.records.texts?.find(
                              (text) => text.key === change.key
                            )?.key || ''
                          }
                          newKey={change.key}
                          previousValue={
                            records?.records.texts?.find(
                              (text) => text.key === change.key
                            )?.value || ''
                          }
                          newValue={change.value}
                          onDoNotApply={() => {
                            setText((prevState) => {
                              if (!prevState) {
                                return prevState;
                              }

                              if (Array.isArray(prevState)) {
                                return prevState.filter(
                                  (text) => text.key !== change.key
                                );
                              } else {
                                return {
                                  ...prevState,
                                  [change.key]: undefined,
                                } as Record<string, string>;
                              }
                            });
                          }}
                          type={'text'}
                        />
                      </Fragment>
                    ))
                  : []),
                ...(changes?.changedContentHash
                  ? [
                      <UpdateRecordItem
                        previousKey={
                          records?.records.contentHash?.protocolType || ''
                        }
                        newKey={
                          changes?.changedContentHash?.split('://')[0] || ''
                        }
                        previousValue={
                          records?.records.contentHash?.decoded || ''
                        }
                        newValue={
                          changes?.changedContentHash?.split('://')[1] || ''
                        }
                        type={'contentHash'}
                        onDoNotApply={() => {
                          setContentHash(undefined);
                        }}
                      />,
                    ]
                  : []),
              ]}
            />
          ) : (
            <H2>No Changes</H2>
          )}
          <Flex justify="space-between" direction="column" gap="10px">
            <Flex justify="space-between" gap="10px" direction="row">
              <DialogClose asChild>
                <Button
                  variant={'secondary'}
                  style={{ width: '100%' }}
                  size={'md'}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                variant={'primary'}
                style={{ width: '100%' }}
                size={'md'}
                onClick={() => {
                  updateSubname({
                    ens: ens || '',
                    text: text,
                    addresses: addresses,
                    contentHash: contentHash,
                  }).finally(() => {
                    handleOpen(false);
                  });
                }}
                loading={isUpdateSubnamePending}
                disabled={
                  !changes ||
                  (changes?.changedAddresses?.length === 0 &&
                    changes?.changedTexts?.length === 0 &&
                    !changes.changedContentHash)
                }
              >
                Update All
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </DefaultDialog>
  );
};
