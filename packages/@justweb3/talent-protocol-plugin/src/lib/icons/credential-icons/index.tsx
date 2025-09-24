import { Credentials } from '../../types';
import {
  ArbitrumIcon,
  BaseBuildathonIcon,
  BaseBuildsRoundsIcon,
  BaseCamp001Icon,
  BaseDeveloperIcon,
  BaseLearnIcon,
  BasenameIcon,
  BaseUserIcon,
  BinanceIcon,
  BonsaiIcon,
  BountycasterIcon,
  BuilderScoreIcon,
  CeloDeveloperIcon,
  CoinbaseVerifiedIdIcon,
  CryptoNomadsClubIcon,
  CyberIdIcon,
  DegenIcon,
  DeveloperDaoIcon,
  EnsIcon,
  EthereumUserIcon,
  EthGlobalIcon,
  FarcasterIcon,
  FractalIdIcon,
  GalxePassportIcon,
  GcrMemberIcon,
  GitcoinPassportIcon,
  GitHubIcon,
  HolonymIcon,
  JamCreatorClubIcon,
  JumpIcon,
  LensIcon,
  LinkedInIcon,
  OptimismDeveloperIcon,
  OptimismUserIcon,
  PhaverIcon,
  PoolySupporterIcon,
  RetroPgfIcon,
  SafeWalletIcon,
  ScrollUserIcon,
  SocialCapitalRankIcon,
  TaikaiIcon,
  TakeOffIcon,
  TalentPassportIcon,
  TheArenaIcon,
  TwitterIcon,
  WorldIdIcon,
  YellowCollectiveIcon,
  ZkSyncIcon,
} from '../components';

export const getCredentialIcon = (credentialType: Credentials) => {
  switch (credentialType) {
    case 'active_wallet':
      return <EthereumUserIcon width={60} height={60} />;

    case 'arbitrum_activity':
      return <ArbitrumIcon width={60} height={60} />;

    case 'base_activity':
      return <BaseUserIcon width={60} height={60} />;

    case 'base_buildathon':
      return <BaseBuildathonIcon width={60} height={60} />;

    case 'base_builder':
      return <BaseDeveloperIcon width={60} height={60} />;

    case 'base_builds':
      return <BaseBuildsRoundsIcon width={60} height={60} />;

    case 'base_camp':
      return <BaseCamp001Icon width={60} height={60} />;

    case 'base_learn':
      return <BaseLearnIcon width={60} height={60} />;

    case 'basename':
      return <BasenameIcon width={60} height={60} />;

    case 'binance_account_bound':
      return <BinanceIcon width={60} height={60} />;

    case 'bnb_activity':
      return <BinanceIcon width={60} height={60} />;

    case 'bonsai':
      return <BonsaiIcon width={60} height={60} />;

    case 'bountycaster':
      return <BountycasterIcon width={60} height={60} />;

    case 'build':
      return <BuilderScoreIcon width={60} height={60} />;

    case 'celo_builder':
      return <CeloDeveloperIcon width={60} height={60} />;

    case 'coinbase_verified_id':
      return <CoinbaseVerifiedIdIcon width={60} height={60} />;

    case 'crypto_nomads':
      return <CryptoNomadsClubIcon width={60} height={60} />;

    case 'cyber_id':
      return <CyberIdIcon width={60} height={60} />;

    case 'degen':
      return <DegenIcon width={60} height={60} />;

    case 'developer_dao':
      return <DeveloperDaoIcon width={60} height={60} />;

    case 'ens':
      return <EnsIcon width={60} height={60} />;

    case 'eth_global':
      return <EthGlobalIcon width={60} height={60} />;

    case 'farcaster':
      return <FarcasterIcon width={60} height={60} />;

    case 'fractal_id':
      return <FractalIdIcon width={60} height={60} />;

    case 'galxe':
      return <GalxePassportIcon width={60} height={60} />;

    case 'gitcoin':
      return <GitcoinPassportIcon width={60} height={60} />;

    case 'github':
      return <GitHubIcon width={60} height={60} />;

    case 'github_developer':
      return <GitHubIcon width={60} height={60} />;

    case 'gcr':
      return <GcrMemberIcon width={60} height={60} />;

    case 'holonym':
      return <HolonymIcon width={60} height={60} />;

    case 'jam_creator_club':
      return <JamCreatorClubIcon width={60} height={60} />;

    case 'jump':
      return <JumpIcon width={60} height={60} />;

    case 'lens':
      return <LensIcon width={60} height={60} />;

    case 'linkedin':
      return <LinkedInIcon width={60} height={60} />;

    case 'optimism_activity':
      return <OptimismUserIcon width={60} height={60} />;

    case 'optimism_builder':
      return <OptimismDeveloperIcon width={60} height={60} />;

    case 'phaver':
      return <PhaverIcon width={60} height={60} />;

    case 'pooly_supporter':
      return <PoolySupporterIcon width={60} height={60} />;

    case 'retro_pgf':
      return <RetroPgfIcon width={60} height={60} />;

    case 'safe_wallet':
      return <SafeWalletIcon width={60} height={60} />;

    case 'scroll_activity':
      return <ScrollUserIcon width={60} height={60} />;

    case 'social_capital_rank':
      return <SocialCapitalRankIcon width={60} height={60} />;

    case 'taikai':
      return <TaikaiIcon width={60} height={60} />;

    case 'take_off':
      return <TakeOffIcon width={60} height={60} />;

    case 'talent_passport':
      return <TalentPassportIcon width={60} height={60} />;

    case 'the_arena':
      return <TheArenaIcon width={60} height={60} />;

    case 'twitter':
      return <TwitterIcon width={60} height={60} />;

    case 'worldcoin':
      return <WorldIdIcon width={60} height={60} />;

    case 'yellow_collective':
      return <YellowCollectiveIcon width={60} height={60} />;

    case 'zksync_builder':
      return <ZkSyncIcon width={60} height={60} />;

    default:
      return null;
  }
};
