import {
  AvatarIcon,
  BannerIcon,
  DiscordIcon,
  EditIcon,
  EmailIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LocationIcon,
  NicknameIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WebsiteIcon,
  XIcon
} from '@justweb3/ui';

export const getTextRecordIcon = (key: string) => {
  switch (key) {
    case 'avatar':
      return <AvatarIcon width={24} height={24} />;
    case 'header':
      return <BannerIcon width={24} height={24} />;
    case 'display':
      return <NicknameIcon width={24} height={24} />;
    case 'description':
      return <EditIcon width={24} height={24} />;
    case 'url':
      return <WebsiteIcon width={24} height={24} />;
    case 'location':
      return <LocationIcon width={24} height={24} />;
    case 'com.twitter':
      return <TwitterIcon width={24} height={24} />;
    case 'com.discord':
      return <DiscordIcon width={24} height={24} />;
    case 'com.facebook':
      return <FacebookIcon width={24} height={24} />;
    case 'com.instagram':
      return <InstagramIcon width={24} height={24} />;
    case 'com.reddit':
      return <RedditIcon width={24} height={24} />;
    case 'com.x':
      return <XIcon width={24} height={24} />;
    case 'com.github':
      return <GithubIcon width={24} height={24} />;
    case 'email':
      return <EmailIcon width={24} height={24} />;
    case 'org.telegram':
      return <TelegramIcon width={24} height={24} />;
    default:
      return (
        <div
          style={{
            backgroundColor: 'white',
            borderColor: 'black',
            display: 'flex',
            height: '24px',
            width: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid',
          }}
        >
          ?
        </div>
      );
  }
};
