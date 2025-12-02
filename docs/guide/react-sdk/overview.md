---
description: >-
  Use hooks directly in your React app for full control over the UI and user
  experience. Build custom flows for subname claiming, profile management, and
  ENS resolution, tailored exactly to your app.
---

# Overview

**Quickstart:** A fast and easy setup guide to help you integrate the JustaName React SDK and start building custom ENS experiences in your application.

{% content-ref url="quickstart.md" %}
[quickstart.md](quickstart.md)
{% endcontent-ref %}

**Check Availability**: Verify if a subname is available before allowing users to claim it. Includes best practices for debouncing user input.

{% content-ref url="check-availability.md" %}
[check-availability.md](check-availability.md)
{% endcontent-ref %}

**Issue Subnames**: Claim and issue new subnames off-chain using the `useAddSubname` hook. Handles wallet signatures and API communication automatically.

{% content-ref url="issue-subnames.md" %}
[issue-subnames.md](issue-subnames.md)
{% endcontent-ref %}

**Update Subnames**: Update ENS records including text records (avatar, bio, socials) and multi-chain addresses. Includes `toCoinType` usage for EVM chain address storage.

{% content-ref url="update-subnames.md" %}
[update-subnames.md](update-subnames.md)
{% endcontent-ref %}

**Resolution:** Resolve any ENS name to retrieve all associated records—text records, coin addresses, and content hash—in a single call using `useRecords`.

{% content-ref url="resolution.md" %}
[resolution.md](resolution.md)
{% endcontent-ref %}

***

**Reverse Resolution:** Look up the primary ENS name for any Ethereum address using `usePrimaryName`. Includes L2 primary name support with `toCoinType`.

{% content-ref url="reverse-resolution.md" %}
[reverse-resolution.md](reverse-resolution.md)
{% endcontent-ref %}

**Get Subnames:** Fetch all subnames owned by the connected account or any arbitrary address using `useAccountSubnames` and `useAddressSubnames`.

{% content-ref url="get-all-subnames-for-an-owner.md" %}
[get-all-subnames-for-an-owner.md](get-all-subnames-for-an-owner.md)
{% endcontent-ref %}



***

#### Installation

{% tabs %}
{% tab title="npm" %}
```bash
npm install @justaname.id/react
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @justaname.id/react
```
{% endtab %}
{% endtabs %}
