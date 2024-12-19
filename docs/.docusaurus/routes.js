import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '417'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '297'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '337'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'cbc'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'c89'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'd9c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '03f'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '870'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '200'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', 'e18'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9e8'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '24e'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '88e'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', 'd0a'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '4a4'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', 'e9e'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '576'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '7fe'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '69f'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '9d7'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/admin-dashboard',
        component: ComponentCreator('/admin-dashboard', '4df'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/api-reference',
        component: ComponentCreator('/api-reference', '6df'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/primary-name-read-controller-get-primary-name-by-address',
        component: ComponentCreator('/api-reference/primary-name-read-controller-get-primary-name-by-address', '879'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/primary-name-write-controller-set-primary-name',
        component: ComponentCreator('/api-reference/primary-name-write-controller-set-primary-name', 'a00'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/siwe',
        component: ComponentCreator('/api-reference/siwe', 'dd6'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/siwe-challenge-controller-request-challenge',
        component: ComponentCreator('/api-reference/siwe-challenge-controller-request-challenge', '888'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/siwe-sign-message',
        component: ComponentCreator('/api-reference/siwe-sign-message', '9a6'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/siwe-verify-controller-verify',
        component: ComponentCreator('/api-reference/siwe-verify-controller-verify', '375'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-read-controller-find-all-by-address',
        component: ComponentCreator('/api-reference/subdomain-read-controller-find-all-by-address', '43a'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-read-controller-find-all-by-domain-name-and-chain-id',
        component: ComponentCreator('/api-reference/subdomain-read-controller-find-all-by-domain-name-and-chain-id', 'f45'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-read-controller-find-by-domain-name-and-name-and-chain-id',
        component: ComponentCreator('/api-reference/subdomain-read-controller-find-by-domain-name-and-name-and-chain-id', '36f'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-read-controller-find-by-full-domain-and-chain-id',
        component: ComponentCreator('/api-reference/subdomain-read-controller-find-by-full-domain-and-chain-id', 'af5'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-read-controller-get-invitations',
        component: ComponentCreator('/api-reference/subdomain-read-controller-get-invitations', '0bd'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-read-controller-is-username-available',
        component: ComponentCreator('/api-reference/subdomain-read-controller-is-username-available', '8a1'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-write-controller-accept',
        component: ComponentCreator('/api-reference/subdomain-write-controller-accept', '1da'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-write-controller-add',
        component: ComponentCreator('/api-reference/subdomain-write-controller-add', 'e4e'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-write-controller-api-reserve',
        component: ComponentCreator('/api-reference/subdomain-write-controller-api-reserve', '3af'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-write-controller-revoke',
        component: ComponentCreator('/api-reference/subdomain-write-controller-revoke', '663'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/subdomain-write-controller-update',
        component: ComponentCreator('/api-reference/subdomain-write-controller-update', 'efd'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/api-reference/title',
        component: ComponentCreator('/api-reference/title', '6aa'),
        exact: true,
        sidebar: "openApiSidebar"
      },
      {
        path: '/core-concepts',
        component: ComponentCreator('/core-concepts', 'b42'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/core-concepts/ccip-read',
        component: ComponentCreator('/core-concepts/ccip-read', '75a'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/core-concepts/ens',
        component: ComponentCreator('/core-concepts/ens', 'a5e'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/core-concepts/ens-architecture',
        component: ComponentCreator('/core-concepts/ens-architecture', '495'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/core-concepts/justaname',
        component: ComponentCreator('/core-concepts/justaname', 'a94'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/getting-started',
        component: ComponentCreator('/getting-started', '00e'),
        exact: true,
        sidebar: "gettingStartedSidebar"
      },
      {
        path: '/sdk',
        component: ComponentCreator('/sdk', '0fc'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core',
        component: ComponentCreator('/sdk/core', 'c0f'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/',
        component: ComponentCreator('/sdk/core/sdk-api/', '96e'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/classes/JustaName',
        component: ComponentCreator('/sdk/core/sdk-api/classes/JustaName', '7b3'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/classes/Siwe',
        component: ComponentCreator('/sdk/core/sdk-api/classes/Siwe', '9ec'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/classes/Subnames',
        component: ComponentCreator('/sdk/core/sdk-api/classes/Subnames', 'ab9'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/Address',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/Address', '06f'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/AddressResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/AddressResponse', 'f06'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/ApiKeyHeaders',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/ApiKeyHeaders', '21e'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/ApiKeyResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/ApiKeyResponse', '108'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/ApiKeyRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/ApiKeyRoute', '521'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/BaseResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/BaseResponse', '7ff'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/Configuration',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/Configuration', 'a1c'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/IHeaders',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/IHeaders', 'd00'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/IRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/IRequest', 'c33'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/IResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/IResponse', '9d7'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/IRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/IRoute', '6ed'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/IsSubnameAvailableRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/IsSubnameAvailableRequest', '716'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/IsSubnameAvailableResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/IsSubnameAvailableResponse', '072'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/IsSubnameAvailableRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/IsSubnameAvailableRoute', '27d'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/Metadata',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/Metadata', '8ef'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/MetadataResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/MetadataResponse', '7e8'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/RequestChallengeRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/RequestChallengeRequest', 'f78'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/RequestChallengeResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/RequestChallengeResponse', 'bd4'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/ROUTES',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/ROUTES', '843'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SIWEHeaders',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SIWEHeaders', '661'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SIWERequestChallengeRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SIWERequestChallengeRoute', '811'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SIWEVerifyMessageRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SIWEVerifyMessageRoute', '6fc'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameAddRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameAddRequest', '48a'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameAddResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameAddResponse', 'e5d'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameAddRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameAddRoute', '72a'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameClaimRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameClaimRequest', '9ba'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameClaimResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameClaimResponse', '0a3'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameClaimRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameClaimRoute', '9c3'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetAllByAddressRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetAllByAddressRequest', '2e0'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetAllByAddressResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetAllByAddressResponse', '13d'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetAllByAddressRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetAllByAddressRoute', '7de'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetAllByDomainChainIdRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetAllByDomainChainIdRequest', '83c'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetAllByDomainChainIdResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetAllByDomainChainIdResponse', 'a84'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetAllByDomainChainIdRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetAllByDomainChainIdRoute', 'eca'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetByDomainNameChainIdRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetByDomainNameChainIdRequest', 'ac7'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetByDomainNameChainIdResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetByDomainNameChainIdResponse', '5b8'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetByDomainNameChainIdRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetByDomainNameChainIdRoute', '494'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetBySubnameRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetBySubnameRequest', 'cff'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetBySubnameResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetBySubnameResponse', '074'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameGetBySubnameRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameGetBySubnameRoute', '01d'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameReserveRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameReserveRequest', 'e3d'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameReserveResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameReserveResponse', '502'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameReserveRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameReserveRoute', 'd66'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameRevokeRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameRevokeRequest', '9ee'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameRevokeResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameRevokeResponse', 'edd'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameRevokeRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameRevokeRoute', 'e77'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameUpdateRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameUpdateRequest', '208'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameUpdateResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameUpdateResponse', 'd7d'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/SubnameUpdateRoute',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/SubnameUpdateRoute', '11c'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/TextRecord',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/TextRecord', '940'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/TextRecordResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/TextRecordResponse', '8fe'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/VerifyChallengeRequest',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/VerifyChallengeRequest', 'f23'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/interfaces/VerifyChallengeResponse',
        component: ComponentCreator('/sdk/core/sdk-api/interfaces/VerifyChallengeResponse', 'aa4'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/core/sdk-api/modules',
        component: ComponentCreator('/sdk/core/sdk-api/modules', 'e8f'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react',
        component: ComponentCreator('/sdk/react', 'e3f'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/',
        component: ComponentCreator('/sdk/react/sdk-api/', 'b9b'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/interfaces/BaseClaimSubnameRequest',
        component: ComponentCreator('/sdk/react/sdk-api/interfaces/BaseClaimSubnameRequest', '874'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/interfaces/JustaNameContextProps',
        component: ComponentCreator('/sdk/react/sdk-api/interfaces/JustaNameContextProps', '5ec'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/interfaces/JustaNameProvider',
        component: ComponentCreator('/sdk/react/sdk-api/interfaces/JustaNameProvider', '34a'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/interfaces/UseConnectedWalletSubnamesOptions',
        component: ComponentCreator('/sdk/react/sdk-api/interfaces/UseConnectedWalletSubnamesOptions', 'a01'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/interfaces/UseIsSubnameAvailableOptions',
        component: ComponentCreator('/sdk/react/sdk-api/interfaces/UseIsSubnameAvailableOptions', 'c4c'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/interfaces/UseSubnameOptions',
        component: ComponentCreator('/sdk/react/sdk-api/interfaces/UseSubnameOptions', 'da7'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/sdk/react/sdk-api/modules',
        component: ComponentCreator('/sdk/react/sdk-api/modules', 'fed'),
        exact: true,
        sidebar: "sdkSidebar"
      },
      {
        path: '/the-app',
        component: ComponentCreator('/the-app', '1c9'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/use-cases',
        component: ComponentCreator('/use-cases', 'fdc'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/use-cases/embedded-wallets',
        component: ComponentCreator('/use-cases/embedded-wallets', '48a'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/use-cases/exchanges',
        component: ComponentCreator('/use-cases/exchanges', 'a9a'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/use-cases/gaming-metaverses',
        component: ComponentCreator('/use-cases/gaming-metaverses', '33f'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/use-cases/secure-messaging',
        component: ComponentCreator('/use-cases/secure-messaging', 'cb6'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/use-cases/social-hub',
        component: ComponentCreator('/use-cases/social-hub', '133'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/use-cases/wallets',
        component: ComponentCreator('/use-cases/wallets', '77d'),
        exact: true,
        sidebar: "homeSidebar"
      },
      {
        path: '/why-we-exist',
        component: ComponentCreator('/why-we-exist', '7c1'),
        exact: true,
        sidebar: "homeSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
