export const convertRgbToHex = (r: string, g?: string, b?: string) => {
  if (r.includes('rgb')) {
    const openedBracketIndex = r.indexOf('(');
    const closedBracketIndex = r.indexOf(')');

    const rgb = r
      .substring(openedBracketIndex + 1, closedBracketIndex)
      .split(',')
      .map((v) => v.trim());

    return `#${rgb
      .map((v) => {
        const hex = Number(v).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join('')}`;
  }

  if (!(r && g && b)) throw new Error('invalid RGB color!');

  return `#${[r, g, b]
    .map((v) => {
      const hex = Number(v).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;
};

export const luminance = (currentColor = 'ffffff') => {
  let color = currentColor;

  if (color.includes('rgb')) {
    color = convertRgbToHex(color);
  }

  if (color.length === 0) {
    color = 'ffffff';
  }

  color = color.replace(/[^0-9a-f]/gi, '');
  const isValidHexColor = new RegExp(/^(?:[0-9a-f]{3}){1,2}$/i).test(color);

  if (isValidHexColor) {
    if (color.length < 6) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
  } else {
    throw new Error('Invalid HEX color !');
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  if (!result) throw new Error('Invalid color shape');

  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };

  const RsRGB = rgb.r / 255;
  const GsRGB = rgb.g / 255;
  const BsRGB = rgb.b / 255;

  const R = RsRGB <= 0.03928 ? RsRGB / 12.92 : ((RsRGB + 0.055) / 1.055) ** 2.4;
  const G = GsRGB <= 0.03928 ? GsRGB / 12.92 : ((GsRGB + 0.055) / 1.055) ** 2.4;
  const B = BsRGB <= 0.03928 ? BsRGB / 12.92 : ((BsRGB + 0.055) / 1.055) ** 2.4;

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

export const isBrightColor = (color: string) => {
  return luminance(color) > 0.5;
};
