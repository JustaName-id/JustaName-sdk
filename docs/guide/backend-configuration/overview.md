# Overview

## Modify your Widget Configuration

Instead of directly adding your API key to the widget configuration on the frontend, you can point your widget to a backend URL that will handle all the sensitive operations. This way, the API key remains safely stored on your server, and the widget communicates with your backend.

Your widget configuration will now include a `backendUrl` like this:

```tsx
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000,
  },
  backendUrl: "http://localhost:3333/",  // Pointing to the backend server
  openOnWalletConnect: true,
  allowedEns: "all",
  logo: "",
  ensDomains: [
    {
      ensDomain: "YOUR ENS DOMAIN",
      chainId: 1,
    },
  ],
  color: {
    primary: "hsl(216, 90%, 58%)",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
};
```

## Sign-In Routes

The **Sign-In Routes** section explains how to securely manage user authentication using either **sessions** or **JWT tokens**. This includes generating a nonce for signing messages, verifying the user’s signature, and managing user sessions.&#x20;

{% content-ref url="sign-in-routes.md" %}
[sign-in-routes.md](sign-in-routes.md)
{% endcontent-ref %}

## Subname Management Routes

The **Subname Management Routes** section demonstrates how to securely manage subnames, including adding and revoking subnames through backend APIs. These routes handle all API key operations on the server side, ensuring that users can claim or revoke subnames without exposing sensitive data in the frontend.

{% content-ref url="subname-management-routes.md" %}
[subname-management-routes.md](subname-management-routes.md)
{% endcontent-ref %}

## Full Implementation

For a complete setup, the **Full Implementation** merges both the **Sign-In** and **Subname Management Routes** into a single backend service. This provides a unified solution for handling user authentication and subname management in a secure and scalable manner, using **JWT tokens** to manage user sessions and JustaName SDK for interacting with the JustaName infrastructure.

{% content-ref url="full-implementation.md" %}
[full-implementation.md](full-implementation.md)
{% endcontent-ref %}
