# Allowed ENS Names

The JustWeb3 Widget allows you to control which ENS names or subnames users can use to sign in. You can either allow **all ENS names**, **restrict sign-ins to subnames derived from specific ENS domains**, or **restrict sign-ins to specific ENS domains and their subnames**.

## Default Settings: Allow All ENS Names

By default, the JustWeb3 Widget is configured to allow users to sign in with any ENS name. This setting is controlled by the `"allowedEns": "all"` configuration.

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000
  },
  allowedEns: "all", // Allows all ENS names for sign-in (default setting)
  ensDomains: [
    {
      ensDomain: "your ens domain",
      apiKey: "YOUR_API_KEY",
      chainId: 1
    }
  ],
  ...
};
```

In this configuration, users can sign in using any ENS name they own, regardless of the ens domain set.

## Restrict Sign-In to Subnames from the set ENS Domain

If you want to restrict sign-ins to subnames that are derived from a specific ENS domain, you can set `"allowedEns": "claimable"`. This will allow only subnames from the set `ensDomain` in your configuration.

For example, if you want to restrict sign-ins to subnames under the `justaname.eth` domain, you can configure it like this:

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000
  },
  allowedEns: "claimable", // Allows only subnames derived from the specified ENS domain
  ensDomains: [
    {
      ensDomain: "justaname.eth",
      apiKey: "YOUR_API_KEY",
      chainId: 1
    }
  ],
  ...
};
```

With this setting, only users who own subnames under the `justaname.eth` domain will be able to sign in.

## Restrict Sign-In to Specific ENS Domains and Their Subnames

A third option is to restrict sign-ins to specific ENS domains and their subnames. You can do this by specifying an array of ENS domains under the `"allowedEns"` configuration. This option allows users to sign in if they hold an ENS name or subname under one of the specified domains.

For example, if you want to allow sign-ins from `hello.eth`, `test.eth`, and their subnames, you would configure it like this:

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  allowedEns: ["hello.eth", "test.eth"], // Restrict to specific ENS domains and their subnames
  ensDomains: [
    {
      ensDomain: "justaname.eth",
      apiKey: "YOUR_API_KEY",
      chainId: 1
    }
  ],
  ...
};

```

In this configuration, users can sign in if they hold an ENS name or subname under `hello.eth`, `test.eth`, or the set ensDomain `justaname.eth`



