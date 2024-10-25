import React, { FC } from 'react';
import { ChainId } from '@justaname.id/sdk';
import { useJustWeb3 } from '../../providers';
import { useEnsAvatar, useRecords } from '@justaname.id/react';
import { Avatar, ClickableItem, Flex, P } from '@justweb3/ui';
import { getTextRecordIcon } from '../../icons/records-icons';
import styled from 'styled-components';

const ExpandableCard = styled.div`
  height: 250px;
  width: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 2px 4px 20px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--justweb3-foreground-color-4);
`;

export interface JustEnsCardProps {
  ens: string;
  chainId?: ChainId;
  expanded?: boolean;
}

export const JustEnsCard: FC<JustEnsCardProps> = ({
  ens,
  chainId = 1,
  expanded = false,
}) => {
  const { openEnsProfile } = useJustWeb3();
  const { records } = useRecords({
    ens,
    chainId,
  });
  const { sanitizeEnsImage } = useEnsAvatar();

  if (expanded) {
    return (
      <ExpandableCard>
        <Flex>
          <img
            src={
              sanitizeEnsImage({
                name: ens,
                chainId,
                image:
                  records?.sanitizedRecords?.header ||
                  records?.sanitizedRecords?.banner,
              }) ||
              'https://justaname-bucket.s3.eu-central-1.amazonaws.com/default-banner.png'
            }
            alt="banner"
            style={{
              objectFit: 'cover',
              height: '100px',
              width: '100%',
            }}
          />
        </Flex>
        <Flex
          style={{
            padding: '0 20px',
            position: 'absolute',
            top: '50px',
          }}
        >
          <Avatar
            src={sanitizeEnsImage({
              name: ens,
              chainId,
              image: records?.sanitizedRecords?.avatar,
            })}
            size={75}
            borderSize={'4px'}
          />
        </Flex>
      </ExpandableCard>
    );
  }

  return (
    <ClickableItem
      title={
        <P
          style={{
            fontWeight: 700,
            color: 'var(--justweb3-primary-color)',
            fontSize: '12px',
          }}
        >
          {ens}
        </P>
      }
      subtitle={
        records &&
        records?.sanitizedRecords &&
        records?.sanitizedRecords?.socials &&
        records?.sanitizedRecords?.socials?.length > 0 ? (
          <Flex gap={'5px'}>
            {records?.sanitizedRecords?.socials?.map((social, index) =>
              React.cloneElement(getTextRecordIcon(social.key), {
                key: ens + index + social.key,
                width: 12,
                height: 12,
              })
            )}
          </Flex>
        ) : null
      }
      style={{
        color: 'var(--justweb3-primary-color)',
      }}
      left={
        <Avatar
          src={sanitizeEnsImage({
            name: ens,
            chainId,
            image: records?.sanitizedRecords?.avatar,
          })}
        />
      }
      onClick={() => {
        openEnsProfile(ens, chainId);
      }}
    />
  );
};
