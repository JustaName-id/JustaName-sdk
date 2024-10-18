# Overview

The JustWeb3 Widget offers a flexible plugin system that allows developers to extend the widget’s functionality with custom features. Plugins can handle a variety of tasks such as enhancing user authentication, integrating social verification (e.g., JustVerified), or interacting with decentralized applications (dApps). This section introduces the plugin system and how developers can create their own plugins by implementing the provided [interfaces](https://github.com/JustaName-id/JustaName-sdk/blob/main/packages/%40justweb3/widget/src/lib/plugins/index.ts).

## Overview of the Plugin System

A **plugin** in the JustWeb3 Widget is a modular component that interacts with the main application, extending its behavior. Plugins are designed to handle various events such as wallet connections, ENS sign-ins, and interactions with multiple applications.

Plugins interact with the widget through a set of **hooks**, **components**, and a **Plugin API**. Developers can leverage these features to create new functionalities, making the widget highly customizable.

## Plugin API

The **Plugin API** provides access to various data and methods that plugins can use. Below are the core elements of the Plugin API:

* **connectedEns**: Provides the currently connected ENS name.
* **isEnsAuthPending**: Indicates whether the ENS authentication is pending.
* **isLoggedIn**: Checks if the user is logged in.
* **chainId**: The current chain ID of the blockchain.
* **records**: ENS records associated with the user's name.
* **setState** and **getState**: Functions to manage plugin-specific state.
* **eventEmitter**: Allows the plugin to emit and listen to events.
* **handleOpenSignInDialog**: Controls the sign-in dialog.

## Components in Plugins

A plugin can define custom UI components that integrate into the JustWeb3 Widget. There are three types of components:

* **Providers**: React components that wrap the entire widget and provide additional context or state.
* **Global**: A component that runs globally across the widget, often used to display general information or handle background tasks.
* **SignInMenu**: A component that customizes the sign-in menu to introduce new options or features.

Example of defining components in a plugin:

```tsx
const MyPluginComponents: PluginComponents = {
  Providers: (pluginApi, children) => {
    return (
      <MyCustomProvider>
        {children}
      </MyCustomProvider>
    );
  },
  SignInMenu: (pluginApi) => {
    return <CustomSignInOption />;
  }
};

```

## Hooks for Plugin Events

The JustWeb3 plugin system supports a wide range of **hooks** that let developers react to specific events or changes in state. For instance, hooks are triggered when a user connects or disconnects a wallet, signs in or out with ENS, claims a subname, or switches between blockchain networks.

Examples of hooks:

* **onWalletConnected**: Triggered when a wallet is connected.
* **onEnsSignIn**: Triggered when a user signs in with an ENS name.
* **onSubnameClaimed**: Triggered when a subname is claimed.
* **onSwitchChain**: Triggered when the user switches between blockchain networks.

Example of defining hooks in a plugin:

```tsx
const MyPluginHooks: Hooks = {
  onWalletConnected: (pluginApi, address, chainId) => {
    console.log(`Wallet connected: ${address} on chain ${chainId}`);
  },
  onEnsSignIn: (pluginApi, ens, chainId, records, enabledMApps, canEnableMApps) => {
    console.log(`Signed in with ENS: ${ens}`);
  },
};
```

## Creating  a Custom Plugin

To create a custom plugin, a developer must implement the `JustaPlugin` interface. The interface includes properties such as:

* **name**: The unique name of the plugin.
* **components**: Optional components that the plugin introduces.
* **hooks**: Event hooks that the plugin listens to or reacts to.

```tsx
const MyCustomPlugin: JustaPlugin = {
  name: "MyCustomPlugin",
  components: MyPluginComponents,
  hooks: MyPluginHooks
};
```

## Plugin Lifecycle

Plugins can be mounted and unmounted depending on the lifecycle of the widget. You can use the **onMount** and **onUnmount** hooks to handle any initialization or cleanup tasks your plugin requires.

```tsx
const MyPluginHooks: Hooks = {
  onMount: (pluginApi) => {
    console.log("Plugin mounted");
  },
  onUnmount: (pluginApi) => {
    console.log("Plugin unmounted");
  },
};
```

## Implementing the Plugin in the JustWeb3 Widget

To enable a plugin, include it within the `plugins` array in your JustWeb3 configuration. The plugin should be imported and then passed into the configuration, along with any specific options it requires.

For example, you can enable a plugin like `JustVerified`, which handles social verification for platforms such as GitHub, Twitter, and Discord. Other plugins may add different functionality, depending on their purpose.

In this generic example, we’ll show how to enable a plugin by adding it to the JustWeb3 Widget configuration.

```tsx
import { MyCustomPlugin } from '@myplugin/package';  // Import the plugin

const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000
  },
  openOnWalletConnect: true,
  allowedEns: "all",
  logo: "",
  ensDomains: [
    {
      ensDomain: "your ens domain",
      apiKey: "YOUR_API_KEY",
      chainId: 1
    }
  ],
  plugins: [
    MyCustomPlugin() // Enabling your custom plugin
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)"
  }
};
```
