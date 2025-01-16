import { ChainId } from '@justaname.id/sdk';
import { useVerifyRecords } from '../../hooks/useVerifyRecords';
import React, { FC } from 'react';
import { CredentialMetadataKeyStandard, Credentials } from '../../types';
import { Badge, Flex, P } from '@justweb3/ui';
import { getTextRecordIcon } from '@justweb3/widget';

interface VerificationCardProps {
  ens: string;
  credential: Credentials;
  credentials: Credentials[];
  chainId: ChainId;
  mApp: string;
  verificationBackendUrl: string;
}

export const VerificationCard: FC<VerificationCardProps> = ({
  ens,
  credential,
  credentials,
  chainId,
  mApp,
  verificationBackendUrl,
}) => {

  const { verifiedRecords, isVerifiedRecordsLoading } =
    useVerifyRecords({
      credentials,
      ens,
      verificationBackendUrl,
      mApp,
      chainId,
    });

  if(isVerifiedRecordsLoading) {
    return <Badge style={{padding: '5px'}} withCopy={false}>
      <Flex
        style={{
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        {
          React.cloneElement(getTextRecordIcon(CredentialMetadataKeyStandard[credential]) as React.ReactElement, {
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
          loading...
        </P>
        </Flex>
      </Flex>

    </Badge>
  }

  if(!verifiedRecords) {
    return null;
  }

  if(!verifiedRecords[credential]) {
    return null;
  }

  return (
    <div>
      <Badge style={{padding: '5px'}} withCopy={false}>
        <Flex
          style={{
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          {
            React.cloneElement(getTextRecordIcon(CredentialMetadataKeyStandard[credential]) as React.ReactElement, {
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
              {verifiedRecords[credential]?.credentialSubject.username || verifiedRecords[credential]?.credentialSubject.email || (verifiedRecords[credential]?.credentialSubject.openPassportProof && "Valid Passport")}
            </P>
          </Flex>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="15px"
            height="15px"
            viewBox="0 0 20 20"
          >
            <mask
              id="verifications_svg__a"
              width={20}
              height={20}
              x={0}
              y={0}
              maskUnits="userSpaceOnUse"
              style={{
                maskType: 'alpha',
              }}
            >
              <path fill="#D9D9D9" d="M0 0h20v20H0z" />
            </mask>
            <g mask="url(#verifications_svg__a)">
              <path
                fill="#00c311"
                d="m7.167 18.75-1.584-2.667-3-.666.292-3.084L.833 10l2.042-2.333-.292-3.084 3-.666L7.167 1.25 10 2.458l2.833-1.208 1.584 2.667 3 .666-.292 3.084L19.167 10l-2.042 2.333.292 3.084-3 .666-1.584 2.667L10 17.542zm1.958-5.792 4.708-4.708-1.166-1.208-3.542 3.541-1.792-1.75L6.167 10z"
              />
            </g>
          </svg>
        </Flex>
      </Badge>
    </div>
  )
}