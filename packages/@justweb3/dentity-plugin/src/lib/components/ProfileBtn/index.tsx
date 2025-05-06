import { A, Badge, Flex, P, RedirectArrowIcon } from '@justweb3/ui';
import { FC } from 'react';
import { DentityIcon } from '../../icons';

interface ProfileBtnProps {
    ens: string;
}

export const ProfileBtn: FC<ProfileBtnProps> = ({
    ens,
}) => {
    const cid = "";

    return (
        <A href={`https://oidc.dentity.com/oidc/ens/${ens}?cid=${cid}`} target="_blank">
            <Badge style={{ padding: '5px', border: '0.5px solid black' }} withCopy={false}>
                <Flex
                    style={{
                        gap: '5px',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <DentityIcon />

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
                            Dentity
                        </P>
                    </Flex>

                    <RedirectArrowIcon width={15} height={15} />
                </Flex>
            </Badge>
        </A>
    )
}