/** Hero film sources plus the encoding contract that keeps scroll-scrubbing smooth.
 *
 * Scroll-scrubbing is random-access seeking: the browser decodes from the nearest
 * keyframe up to `video.currentTime`. The supplied clip was a 5s H.264 file with a
 * single keyframe at frame 0, so every scrub seek decoded all 121 frames — that alone
 * guarantees stutter. Both cuts below are re-encoded with `-g 6 -keyint_min 6
 * -sc_threshold 0` (a keyframe every 6 frames / 250ms at 24fps), which bounds each
 * seek to at most 6 frames of decode work.
 *
 * Re-encoding recipe for any replacement film:
 *
 *   ffmpeg -i source.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
 *     -preset slow -crf 21 -g 6 -keyint_min 6 -sc_threshold 0 \
 *     -movflags +faststart public/media/hero-desktop.mp4
 *
 * Rules for a replacement:
 * - keep the resolution at or under the source (790x1166 here) so a seek never
 *   decodes pixels the viewport cannot show;
 * - no audio track (`-an`) — the film is never played aloud;
 * - `+faststart` moves the moov atom to the front so duration/metadata arrive before
 *   the rest of the file;
 * - H.264 is shipped alone on purpose: it is hardware-decoded on virtually every
 *   device, which is what keeps per-frame seeking lag-free. A WebM/VP9 cut
 *   (`-c:v libvpx-vp9 -crf 33 -auto-alt-ref 0 -lag-in-frames 0 -g 6`) is a valid
 *   smaller alternative if you later want a second <source> for browsers that decode
 *   VP9 in hardware.
 */

export const heroPoster = '/media/hero-poster.jpg'

const desktopFilm = '/media/hero-desktop.mp4'
const mobileFilm = '/media/hero-mobile.mp4'

/** Phones get a 720-wide cut: same camera move, less decode work and memory per seek. */
export function pickHeroVideo() {
  return window.matchMedia('(max-width: 767px)').matches ? mobileFilm : desktopFilm
}
