import { FC, useContext, useEffect, useState } from 'react';
import {
  JustaNameDialog,
  JustWeb3Context,
  useJustWeb3,
} from '@justweb3/widget';
import {
  Badge,
  Button,
  Flex,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  JustaNameLogoIcon,
  P,
  SPAN,
} from '@justweb3/ui';
import { useEnsAuth } from '@justaname.id/react';
import {
  useClearOtp,
  useGenerateOtp,
  useResendOtp,
  useVerifyOtp,
} from '../../hooks';

export interface EmailDialogProps {
  refetchVerifyRecords: () => void;
  refetchRecords: () => void;
  mAppsAlreadyEnabled: string[] | undefined;
  mApp: string;
  open: boolean;
  email: string | undefined;
  handleOpenDialog: (open: boolean) => void;
  verificationBackendUrl: string;
}

export const EmailDialog: FC<EmailDialogProps> = ({
  refetchRecords,
  mApp,
  mAppsAlreadyEnabled,
  refetchVerifyRecords,
  open,
  email,
  handleOpenDialog,
  verificationBackendUrl,
}) => {
  const {
    config: { logo, disableOverlay },
  } = useContext(JustWeb3Context);
  const [otp, setOtp] = useState('');
  const { connectedEns: connectedToVerification } = useEnsAuth({
    backendUrl: verificationBackendUrl,
    currentEnsRoute: '/auth/current',
  });
  const { updateRecords } = useJustWeb3();

  const { state, isGenerateOtpPending, clearState, refetchGenerateOtp } =
    useGenerateOtp({
      email,
      verificationBackendUrl,
    });

  const {
    resendOtp,
    isResendOtpPending,
    timeLeft,
    resetTimeLeft,
    startCountdown,
  } = useResendOtp({
    verificationBackendUrl,
  });

  const { clearOtp } = useClearOtp({
    verificationBackendUrl,
  });

  const { verifyOtp, isVerifyOtpPending } = useVerifyOtp({
    verificationBackendUrl,
  });

  useEffect(() => {
    if (open && email) {
      refetchGenerateOtp();
      startCountdown();
    }
  }, [open, email]);

  const handleInternalOpenDialog = (open: boolean) => {
    if (!open) {
      setOtp('');
      clearOtp({
        state: state || '',
      }).then(() => {
        clearState();
        resetTimeLeft();
      });
    }
    handleOpenDialog(open);
  };

  const formatTimeLeft = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  if (!email) {
    return null;
  }

  return (
    <JustaNameDialog
      open={open}
      disableOverlay={disableOverlay}
      handleClose={() => handleInternalOpenDialog(false)}
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
    >
      <Flex direction={'column'}>
        <Flex
          style={{
            borderRadius: '16px',
            background: 'var(--justweb3-background-color)',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '500px',
          }}
        >
          <Flex justify="space-between" direction="row" gap="10px">
            <Badge>
              <SPAN
                style={{
                  fontSize: '10px',
                  lineHeight: '10px',
                  fontWeight: 900,
                }}
              >
                {connectedToVerification?.ens}
              </SPAN>
            </Badge>
          </Flex>

          <Flex justify="space-between" direction="column" gap="10px">
            <P>An OTP code email has been sent to</P>

            <P
              style={{
                color: 'var(--justweb3-primary-color)',
              }}
            >
              {email}
            </P>
          </Flex>

          <Flex>
            <InputOTP
              maxLength={8}
              value={otp}
              onChange={(e) => setOtp(e)}
              disabled={isVerifyOtpPending || isGenerateOtpPending}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
          </Flex>

          <Flex
            style={{
              gap: '10px',
            }}
          >
            <Button
              variant={'secondary'}
              style={{
                width: '100%',
                whiteSpace: 'nowrap',
              }}
              size={'lg'}
              onClick={() => {
                if (!state) {
                  return;
                }

                resendOtp({
                  state,
                }).then(() => {
                  startCountdown();
                });
              }}
              disabled={timeLeft > 0 || !state}
              loading={isResendOtpPending}
            >
              {timeLeft > 0
                ? `Resend OTP in ${formatTimeLeft(timeLeft)}`
                : 'Resend OTP'}
            </Button>

            <Button
              variant="primary"
              style={{
                width: '100%',
              }}
              size={'lg'}
              onClick={() => {
                if (!state) {
                  return;
                }

                verifyOtp({
                  state,
                  otp,
                }).then((res) => {
                  const key = 'email';
                  const vc = res.verifiableCredential;
                  const value = vc.credentialSubject.email;
                  if (mAppsAlreadyEnabled?.includes(mApp)) {
                    updateRecords({
                      text: [
                        {
                          key: key,
                          value: value,
                        },
                      ],
                    }).then(() => {
                      refetchRecords();
                      refetchVerifyRecords();
                    });
                  } else {
                    updateRecords({
                      text: [
                        {
                          key: key,
                          value: value,
                        },
                        {
                          key: res.dataKey,
                          value: JSON.stringify(vc),
                        },
                      ],
                    }).then(() => {
                      refetchRecords();
                      refetchVerifyRecords();
                    });
                  }
                  handleInternalOpenDialog(false);
                });
              }}
              loading={isVerifyOtpPending}
              disabled={otp.length !== 8 || !state}
            >
              Verify
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </JustaNameDialog>
  );
};
