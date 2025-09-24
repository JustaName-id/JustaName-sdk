export interface Passport {
  passport: {
    activity_score: number;
    calculating_score: boolean;
    created_at: string;
    human_checkmark: boolean;
    identity_score: number;
    last_calculated_at: string;
    main_wallet: string;
    main_wallet_changed_at: string | null;
    merged: boolean;
    nominations_received_count: number;
    passport_id: number;
    passport_profile: {
      bio: string;
      data_sources: {
        bio: string;
        tags: string;
        location: string;
        profile_bio: string;
        display_name: string;
        profile_name: string;
        profile_image_url: string;
        profile_display_name: string;
      };
      display_name: string;
      image_url: string;
      location: string;
      name: string;
      tags: string[];
    };
    passport_socials: {
      disconnected: boolean;
      follower_count: number | null;
      following_count: number | null;
      location: string | null;
      profile_bio: string;
      profile_display_name: string;
      profile_image_url: string | null;
      profile_name: string;
      profile_url: string;
      source: string;
    }[];
    pending_kyc: boolean;
    score: number;
    skills_score: number;
    socials_calculated_at: string;
    user: {
      admin: boolean;
      email: string | null;
      id: string;
      name: string;
      profile_picture_url: string;
    };
    verified: boolean;
    verified_wallets: string[];
  };
}

export type Credentials =
  | 'active_wallet'
  | 'arbitrum_activity'
  | 'base_activity'
  | 'base_buildathon'
  | 'base_builder'
  | 'base_builds'
  | 'base_camp'
  | 'base_learn'
  | 'basename'
  | 'binance_account_bound'
  | 'bnb_activity'
  | 'bonsai'
  | 'bountycaster'
  | 'build'
  | 'celo_builder'
  | 'coinbase_verified_id'
  | 'crypto_nomads'
  | 'cyber_id'
  | 'degen'
  | 'developer_dao'
  | 'ens'
  | 'eth_global'
  | 'farcaster'
  | 'fractal_id'
  | 'galxe'
  | 'gitcoin'
  | 'github'
  | 'github_developer'
  | 'gcr'
  | 'holonym'
  | 'jam_creator_club'
  | 'jump'
  | 'lens'
  | 'linkedin'
  | 'optimism_activity'
  | 'optimism_builder'
  | 'phaver'
  | 'pooly_supporter'
  | 'retro_pgf'
  | 'safe_wallet'
  | 'scroll_activity'
  | 'social_capital_rank'
  | 'taikai'
  | 'take_off'
  | 'talent_passport'
  | 'the_arena'
  | 'twitter'
  | 'worldcoin'
  | 'yellow_collective'
  | 'zksync_builder';

export interface PassportCredential {
  passport_credentials: {
    calculating_score: boolean;
    category: 'Activity' | 'Skills' | 'Identity';
    earned_at: string | null;
    id: string;
    last_calculated_at: string | null;
    max_score: number;
    name: string;
    onchain_at: string | null;
    score: number;
    type: Credentials;
    value: string | null;
  }[];
}
