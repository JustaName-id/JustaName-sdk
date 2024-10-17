# Appearance

The JustWeb3 Widget offers flexible appearance customization, allowing you to style it to match your dApp's branding. You can modify colors, logos, and the general look and feel of the widget with ease. Below is a detailed guide on how to configure the appearance of your widget.

## Primary Color

The `primary` color controls the main accent color used throughout the widget for buttons, links, and other interactive elements. You can specify any valid CSS color format (hex, rgb, hsl, etc.).\


```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  color: {
    primary: 'hsl(216, 90%, 58%)', // Example: Sky Blue
  },
};
```

## Background Color

The `background` color controls the background color of the widget. This is especially useful to make the widget fit seamlessly into your app’s design.

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  color: {
    background: 'hsl(0, 0%, 100%)', // Example: White
  },
};
```

## Destructive Color

The `destructive` color is used for warning or destructive actions (e.g., delete, reset). You can customize this to match your branding guidelines.

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  color: {
    destructive: 'hsl(0, 100%, 50%)', // Example: Red
  },
};

```

## Custom Logo

You can provide a custom logo to display in the widget interface. This logo helps reinforce your branding within the JustWeb3 Widget.

* Add the URL to your logo image in the `logo` field of the configuration.

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  logo: 'https://yourdomain.com/your-logo.png',
};

```

Ensure the logo has appropriate dimensions for best results. We recommend a **200x200px PNG or SVG**.

## Custom Fonts (Advanced)

While the widget doesn't directly expose a font customization option, you can apply custom fonts through global CSS in your app. To do this, apply the font styles in your project and ensure that your widget is contained within those styled elements.

```css
/* In your global CSS file */
body {
  font-family: 'YourCustomFont', sans-serif;
}
```

## Full Example Configuration

Below is an example configuration showcasing appearance customization with colors and a custom logo:

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000,
  },
  openOnWalletConnect: true,
  allowedEns: "all",
  logo: "https://yourdomain.com/your-logo.png",
  ensDomains: [
    {
      ensDomain: "your ens domain",
      apiKey: "YOUR_JUSTANAME_API_KEY",
      chainId: 1,
    }
  ],
  color: {
    primary: 'hsl(216, 90%, 58%)',   // Sky Blue
    background: 'hsl(0, 0%, 100%)',  // White
    destructive: 'hsl(0, 100%, 50%)' // Red
  }
};
```

This setup ensures the widget integrates smoothly with your dApp's design while maintaining a consistent brand experience.
