import { ReactNode, useContext, useEffect } from 'react';
import { JustWeb3Context } from '@justweb3/widget';
import { Credentials, JustVerifiedPlugin } from '@justverified/plugin';
import {
  DiscordIcon,
  EmailIcon,
  GithubIcon,
  TelegramIcon,
  TwitterIcon,
} from '@justweb3/ui';
import { useConsole } from '../../../../../providers/ConsoleProvider';
import { Switch } from '../../../../ui/switch';
import { SocialCard } from './socialCard';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../../ui/accordion';

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

export const JustVerified = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);
  const { justVerified, setJustVerified } = useConsole();

  const handleJustVerifiedConfig = (enabled: boolean) => {
    if (enabled) {
      handleJustWeb3Config({
        ...config,
        plugins: [
          ...(config?.plugins || []).filter(
            (plugin) => plugin.name !== 'JustVerifiedPlugin'
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
          (plugin) => plugin.name !== 'JustVerifiedPlugin'
        ),
      });
    }
  };

  useEffect(() => {
    handleJustVerifiedConfig(true);
  }, [justVerified]);

  return (
    <AccordionItem
      value="justverified"
      style={{
        position: 'relative',
      }}
    >
      <Switch
        checked={
          !!config?.plugins?.find(
            (plugin) => plugin.name === 'JustVerifiedPlugin'
          )
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        onCheckedChange={(checked) => {
          handleJustVerifiedConfig(checked);
        }}
        style={{
          position: 'absolute',
          right: 0,
          top: '24px',
        }}
      />
      <AccordionTrigger>
        <div className="flex flex-row items-center justify-between w-full py-[5px]">
          <p className="text-base text-black font-bold leading-[125%] my-[5px]">
            JustVerified
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col items-center gap-0">
          {socials.map((social) => (
            <SocialCard
              {...social}
              disabled={
                !config?.plugins?.find(
                  (plugin) => plugin.name === 'JustVerifiedPlugin'
                )
              }
              key={social.credential}
              value={social.credential}
              checked={
                !!justVerified?.find(
                  (platform) => platform === social.credential
                )
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
      </AccordionContent>
    </AccordionItem>
  );
};
