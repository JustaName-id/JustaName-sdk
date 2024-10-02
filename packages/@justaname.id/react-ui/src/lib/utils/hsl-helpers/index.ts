type HSLColor = {
  hue: number;
  saturation: number;
  lightness: number;
};

const parseHSL = (hsl: string): HSLColor => {
  const [hue, saturation, lightness] = hsl.match(/\d+/g)!.map(Number);
  return { hue, saturation, lightness };
}

const formatHSL = (color: HSLColor): string => {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
}

const clamp = (value: number, min = 0, max = 100): number => {
  return Math.min(Math.max(value, min), max);
}

export const generateLightVariation = (color: string, percentage = 0.3): string => {
  const { hue, saturation, lightness } = parseHSL(color);
  let newLightness: number;

  if (lightness > 90) {
    newLightness = lightness; // For very light colors, don't go lighter
  } else {
    newLightness = clamp(lightness + (100 - lightness) * percentage); // Increase lightness by 30% of the remaining range
  }

  return formatHSL({ hue, saturation, lightness: newLightness });
}

export const generateDarkVariation = (color: string, percentage = 0.2): string => {
  const { hue, saturation, lightness } = parseHSL(color);
  let newLightness: number;

  if (lightness < 10) {
    newLightness = lightness; // For very dark colors, don't go darker
  } else {
    newLightness = clamp(lightness * (1 - percentage)); // Decrease lightness by 20%
  }

  return formatHSL({ hue, saturation, lightness: newLightness });
}


export const convertToHSL = (color: string): string => {
  color = color.toLowerCase().replace(/\s/g, '');

  let r: number, g: number, b: number;

  if (color.startsWith('#')) {
    // Hex format
    const hex = color.length === 4
      ? color.slice(1).split('').map(x => x + x).join('')
      : color.slice(1);
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (color.startsWith('rgb')) {
    // RGB or RGBA format
    const parts = color.match(/\d+/g)!.map(Number);
    [r, g, b] = parts;
  } else if (color.startsWith('hsl')) {
    // HSL or HSLA format
    const parts = color.match(/\d+/g)!.map(Number);
    return formatHSL({
      hue: parts[0],
      saturation: parts[1],
      lightness: parts[2]
    });
  } else {
    throw new Error('Unsupported color format');
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h = h / 6;
  }

  return formatHSL({
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100)
  });
}

export const detectLightColor = (color: string, lightnessLimit = 75): boolean => {
  const { lightness } = parseHSL(convertToHSL(color));
  return lightness > lightnessLimit;
}