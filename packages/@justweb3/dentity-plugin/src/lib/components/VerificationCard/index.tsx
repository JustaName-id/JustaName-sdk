import { CredentialTemplate } from '@dentity/ens-client';
import { Badge, Flex, P } from '@justweb3/ui';
import { getTextRecordIcon } from '@justweb3/widget';
import React, { FC, useMemo } from 'react';
import { getCredentialKeyValue } from '../../utils';
import { VerifiableCredentialPresentation } from '@dentity/ens-client';
import { VerifiedIcon } from '../../icons';

interface VerificationCardProps {
  verification: VerifiableCredentialPresentation;
}

export const VerificationCard: FC<VerificationCardProps> = ({
  verification,
}) => {

  const credentialTemplateType = useMemo(() => {
    return Object.values(CredentialTemplate).find(template => verification.type.includes(template));
  }, [verification.type]);

  const credentialKeyValue = getCredentialKeyValue(credentialTemplateType, verification.credentialSubject);

  if (!credentialTemplateType || credentialKeyValue.textRecord.length == 0) return null;
  return (
    <div>
      <Badge style={{ padding: '5px' }} withCopy={false}>
        <Flex
          style={{
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          {
            React.cloneElement(getTextRecordIcon(credentialKeyValue.textRecord) as React.ReactElement, {
              style: {
                width: '15px',
                height: '15px',
                minWidth: '15px',
                minHeight: '15px',
                textAlign: 'center'
              }
            })

          }

          <Flex
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              alignItems: 'flex-start'
            }}
          >
            <P
              style={{
                fontSize: '10px',
                fontWeight: '800',
                maxWidth: '100%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                lineHeight: '120%',
                margin: '0',
                fontFamily: 'var(--justweb3-font-family)'
              }}
            >
              {credentialKeyValue.value}
            </P>
          </Flex>

          <VerifiedIcon />
        </Flex>
      </Badge>
    </div>
  )
}