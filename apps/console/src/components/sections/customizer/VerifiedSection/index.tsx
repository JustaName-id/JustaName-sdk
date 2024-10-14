import { ReactNode, useContext, useEffect } from 'react';
import { JustWeb3Context } from '@justweb3/widget';
import {
  Credentials,
  DiscordIcon,
  EmailIcon,
  GithubIcon,
  JustVerifiedPlugin,
  TelegramIcon,
  TwitterIcon,
} from '@justverified/plugin';
import { useConsole } from '../../../../providers/ConsoleProvider';
import { Switch } from '../../../ui/switch';
import { SocialCard } from './socialCard';

const socials: { logo: ReactNode; title: string; credential: Credentials }[] = [
  {
    logo: <TwitterIcon width={20} />,
    title: 'Twitter (X)',
    credential: 'twitter',
  },
  {
    logo: <TelegramIcon width={20} />,
    title: 'Telegram',
    credential: 'telegram',
  },
  {
    logo: <GithubIcon width={20} />,
    title: 'Github',
    credential: 'github',
  },
  {
    logo: <DiscordIcon width={20} />,
    title: 'Discord',
    credential: 'discord',
  },
  {
    logo: <EmailIcon width={20} />,
    title: 'Email',
    credential: 'email',
  },
];

export const VerifiedSection = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);
  const { justVerified, setJustVerified } = useConsole();

  useEffect(() => {
    if (justVerified) {
      handleJustWeb3Config({
        ...config,
        plugins: [
          ...(config?.plugins || []).filter(
            (plugin) => plugin.name !== 'justverified'
          ),
          JustVerifiedPlugin(
            justVerified,
            config.dev
              ? 'https://api-staging.justaname.id/verifications/v1'
              : 'https://api.justaname.id/verifications/v1'
          ),
        ],
      });
    } else {
      handleJustWeb3Config({
        ...config,
        plugins: (config?.plugins || []).filter(
          (plugin) => plugin.name !== 'justverified'
        ),
      });
    }
  }, [justVerified]);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-row items-center justify-between w-full py-[5px]">
        <p className="text-base text-black font-bold leading-[125%] my-[5px]">
          JustVerified
        </p>
        <Switch
          checked={
            !!config?.plugins?.find((plugin) => plugin.name === 'justverified')
          }
          onCheckedChange={(checked) => {
            setJustVerified(checked ? [] : undefined);
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-0">
        {socials.map((social) => (
          <SocialCard
            {...social}
            disabled={!justVerified}
            key={social.credential}
            value={social.credential}
            checked={
              !!justVerified?.find((platform) => platform === social.credential)
            }
            onCheck={(platform) => {
              if (justVerified) {
                setJustVerified([...justVerified, platform as Credentials]);
              }
            }}
            onUncheck={(platform) => {
              if (justVerified) {
                setJustVerified(
                  justVerified.filter((verified) => verified !== platform)
                );
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
