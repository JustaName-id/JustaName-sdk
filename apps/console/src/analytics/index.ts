import { EventPayload, EVENTS } from './events';
import posthog from 'posthog-js';

let analyticsInstance: Index | null = null;
const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
export const getAnalyticsClient = () => {
  if (!analyticsInstance) {
    analyticsInstance = new Index();
  }
  return analyticsInstance;
};

class Index {
  constructor() {
    if (typeof window !== 'undefined' && analyticsEnabled) {
      const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
      if (!key) {
        throw new Error('Analytics key is required');
      }
      posthog.init(key, {
        api_host: host,
        // With a reverse proxy api_host, posthog-js can't infer the app URL, so
        // toolbar / session-replay / "view in PostHog" links break without this.
        ui_host: 'https://eu.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: false,
        // Only create person profiles once we identify() a wallet; anonymous
        // demo traffic is still captured but doesn't spawn empty profiles.
        person_profiles: 'identified_only',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
      });
      // Super properties: attached to EVERY event so prod/preview traffic and
      // the source app are always sliceable in PostHog.
      posthog.register({
        app: 'console',
        environment: process.env.NODE_ENV,
      });
    }
  }

  identify(id: string) {
    if (!analyticsEnabled) return;
    // No alias() here: aliasing a distinct_id to itself is a no-op at best and
    // can corrupt identity merges. identify() alone links anon -> wallet.
    posthog.identify(id);
    this.register({ id });
  }

  register(props: Record<string, string>) {
    if (!analyticsEnabled) return;
    posthog.register(props);
  }

  track<T extends keyof typeof EVENTS>(
    event: T,
    props: EventPayload[(typeof EVENTS)[T]]
  ) {
    if (!analyticsEnabled) return;
    posthog.capture(EVENTS[event], props);
  }

  track_unsafe(event: string, props: Record<string, string>) {
    if (!analyticsEnabled) return;
    posthog.capture(event, props);
  }

  people_set(props: Record<string, string | number | boolean | string[]>) {
    if (!analyticsEnabled) return;
    posthog.setPersonProperties(props);
  }
  reset() {
    if (!analyticsEnabled) return;
    posthog.reset();
  }
}

export default Index;
