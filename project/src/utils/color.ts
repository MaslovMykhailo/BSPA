function hashCode(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 10) - hash)
  }
  return Math.abs(hash)
}

export interface HSLColor {
  hue: number
  saturation: number
  lightness: number
}

export interface ColorOptions {
  baseHue?: number
  hueRange?: number
  saturation?: number
  lightness?: number
}

export function toColor(
  value: unknown,
  { baseHue = 0, hueRange = 360, saturation = 60, lightness = 50 }: ColorOptions = {},
): HSLColor {
  const hash = hashCode(String(value))
  const hue = (baseHue + (hash % hueRange)) % 360
  return {
    hue,
    saturation,
    lightness,
  }
}

export function createColorGenerator(options?: ColorOptions) {
  return (value: unknown) => toColor(value, options)
}

export function formatColor({ hue, lightness, saturation }: HSLColor) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

export function toSimilarColor(value: unknown, base: HSLColor) {
  const hash = hashCode(String(value))

  const hueOffset = (hash % 41) - 20
  const lightnessOffset = (hash % 51) - 25
  const saturationOffset = (hash % 41) - 20

  const hue = (base.hue + hueOffset + 360) % 360
  const saturation = Math.min(100, Math.max(0, base.saturation + saturationOffset))
  const lightness = Math.min(100, Math.max(0, base.lightness + lightnessOffset))

  return {
    hue: hue,
    saturation,
    lightness,
  }
}
