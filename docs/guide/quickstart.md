---
icon: gauge-max
description: >-
  The JustWeb3 Widget is the easiest way to get the best digital identity suite
  in your dApp.
---

# Quickstart

In under 5 minutes of setup and customization, you can start:

* Issuing free branded subnames to your userbase
* Authenticating your users with SIWENS
* Enabling them to edit and manage their profile in a cryptographically secured way
* Freeing your dApp from sybil actors with the use of social verifications and ZK-KYC

While we take care of setting up your admin dashboard in the background, to provide you with the best analytics, enabling you to learn about your community and start engaging them via our trusted decentralized mediums.

### 0. Prerequisites

In order to Integrate the JustWeb3 Widget, your project must run on:

* a minimum react version of 17
* a minimum version of [wagmi](https://wagmi.sh/) of 2

### 1. Install the JustWeb3 Widget

Install the latest version of the [JustWeb3 Widget ](https://www.npmjs.com/package/@justweb3/widget)using your package manager of choice:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @justweb3/widget
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @justweb3/widget
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @justweb3/widget
```
{% endtab %}
{% endtabs %}

### 2. Create an Account

#### 2.1. Sign Up:

Navigate to the [Admin Dashboard](https://dashboard.justaname.id/) and follow the simple sign-up process to create your account.

#### 2.2. Configure ENS Domain:

* Once your workspace is set up, configure your ENS domain.
* If you don’t own an ENS domain, you can purchase one during this step.

### 3. Generate an API Key

After having set up your account, you can now issue an api key:

* In the dashboard, go to the API Key section.
* Generate your API key and make sure to **save it securely**—we won't be able to retrieve it later if it’s lost.

**Congratulations!**\
You're all set. Now, you can move forward with configuring the widget.

### 4. Widget Configuration

In your project, import the JustWeb3Provider component and wrap your app with it.

An example set up for a [NextJs](https://nextjs.org/) or [Create React App](https://create-react-app.dev/) project, can be found below:\


{% tabs %}
{% tab title="NextJS" %}

{% endtab %}

{% tab title="Create React App" %}

{% endtab %}
{% endtabs %}



### 5. You're all set!  🎉

