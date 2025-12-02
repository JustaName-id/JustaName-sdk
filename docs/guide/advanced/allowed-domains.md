# Allowed Domains

Allowed Domains let you restrict which domains can use your API key, adding an extra layer of security when integrating JustaName SDKs directly in frontend applications.

### Setting Up Allowed Domains

1. Navigate to the **API Keys** section in your dashboard
2. Locate the API key you want to configure
3. Click the **three dots menu** (⋮) next to the key
4. Select **Add Domain** and enter your domain

### Wildcard Support

You can use wildcard patterns to allow multiple subdomains at once. For example:

* `*.justaname.id` — Allows all subdomains of justaname.id (e.g., `app.justaname.id`, `dev.justaname.id`, `staging.justaname.id`)
* `*.example.com` — Allows all subdomains of example.com

### When to Use Allowed Domains

**Recommended:** Configure allowed domains whenever you're using JustaName SDKs directly in frontend applications. Since frontend code is publicly accessible, restricting your API key to specific domains prevents unauthorized usage from other origins.
