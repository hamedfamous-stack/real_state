/** Shared image sources. All photography is served from the Unsplash CDN with
 *  responsive width + quality parameters. */
export const photoIds = {
  hero: '1600596542815-ffad4c1539a9',
  aboutMain: '1613490493576-7fde63acd811',
  aboutSide: '1600607687939-ce8a6c25118c',
  cta: '1600585154340-be6161a56a0c',
  why: '1512917774080-9991f1c4c750',
  whyDetail: '1600210492486-724fe5c67fb0',
  map: '1523217582562-09d0def993a6',
} as const

export function photoUrl(id: string, width = 1280, quality = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export const photoWidths = [640, 960, 1280, 1920]

export function photoSrcSet(id: string, quality = 80) {
  return photoWidths.map((width) => `${photoUrl(id, width, quality)} ${width}w`).join(', ')
}
