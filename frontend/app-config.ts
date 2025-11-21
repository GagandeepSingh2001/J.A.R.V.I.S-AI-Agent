import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'JarvisAI',
  pageTitle: 'JarvisAI Voice Agent',
  pageDescription: 'A voice agent powered by Google Generative AI',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/arc_reactor.png',
  accent: '#255272',
  logoDark: '/arc_reactor.png',
  accentDark: '#175885',
  startButtonText: 'Talk to J.A.R.V.I.S',

  agentName: undefined,
};
