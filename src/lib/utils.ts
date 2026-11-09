export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(value: number) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    return `$${millions.toFixed(millions % 1 === 0 ? 0 : 2).replace(/0$/, '')} Million`
  }
  return `$${value.toLocaleString('en-US')}`
}

export function formatCompactPrice(value: number) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    return `$${millions.toFixed(millions % 1 === 0 ? 0 : 1).replace(/\.0$/, '')}M`
  }
  return `$${Math.round(value / 1000)}K`
}

export function propertyLocation(property: { city: string; region: string; country: string }) {
  return `${property.city}, ${property.region}, ${property.country}`
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}
