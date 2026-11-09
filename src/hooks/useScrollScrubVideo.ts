import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-driven film scrubber for the hero.
 *
 * The page scrolls through a tall section while the film stays pinned. Scroll
 * position maps 0 → 1 over the section's travel and that fraction is multiplied by
 * `video.duration`. The video is never played: only `currentTime` is written, so it
 * holds the exact frame the scroll implies and moves backwards just as happily.
 *
 * Performance model:
 * - scroll/resize listeners only wake a requestAnimationFrame loop (passive, no work
 *   inside the event itself);
 * - the loop reads `window.scrollY`, eases the displayed progress toward it and
 *   writes styles/video time directly through refs — nothing here touches React
 *   state during scrolling;
 * - a seek is issued only when the new time differs by ≥ 8ms *and* the previous seek
 *   has settled, which caps seek rate at what the decoder can actually keep up with;
 * - the loop stops itself once the playhead matches the scroll, so an idle page runs
 *   no animation frames at all.
 */

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value)

/** Minimum difference (seconds) before writing `currentTime` again. */
const MIN_SEEK_DELTA = 0.008
/** Exponential follow time constant, seconds. Smaller = tighter to the scroll. */
const SMOOTHING_TAU = 0.075
/** Snap once the eased playhead is this close to the scroll target (fraction). */
const SETTLE_EPSILON = 0.0005
/** Below this much change we skip restyling (the shift is sub-pixel anyway). */
const STYLE_EPSILON = 0.0004

export type ScrollVideoStatus = 'loading' | 'ready' | 'error'

interface Options {
  /** False for `prefers-reduced-motion`: no loading, no seeking, no rAF loop. */
  enabled: boolean
}

export function useScrollScrubVideo({ enabled }: Options) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const copyRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState<ScrollVideoStatus>('loading')
  const [buffered, setBuffered] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const section = sectionRef.current
    const stage = stageRef.current
    const video = videoRef.current
    if (!section || !stage || !video) return

    let frame = 0
    let looping = false
    let lastTs = 0
    let displayed = 0
    let primed = false
    let lastSeekTime = -1
    let lastStyled = -1
    let sectionTop = 0
    let travel = 1
    let aborted = false

    const resetLayers = () => {
      for (const node of [copyRef.current, searchRef.current]) {
        if (!node) continue
        node.style.opacity = ''
        node.style.transform = ''
        node.style.visibility = ''
        node.style.pointerEvents = ''
      }
    }

    const measure = () => {
      const rect = section.getBoundingClientRect()
      sectionTop = rect.top + window.scrollY
      travel = Math.max(1, section.offsetHeight - stage.offsetHeight)
    }

    const styleLayers = (progress: number) => {
      if (Math.abs(progress - lastStyled) < STYLE_EPSILON) return
      lastStyled = progress

      // Headline copy leaves during the opening third so the film can breathe.
      const copy = copyRef.current
      if (copy) {
        const exit = clamp01(progress / 0.3)
        const eased = exit * exit * (3 - 2 * exit)
        copy.style.opacity = `${1 - eased}`
        copy.style.transform = `translate3d(0, ${(-38 * eased).toFixed(1)}px, 0)`
        copy.style.visibility = eased > 0.995 ? 'hidden' : 'visible'
      }

      // Search panel follows just behind it; once gone it must not eat clicks.
      const search = searchRef.current
      if (search) {
        const exit = clamp01((progress - 0.12) / 0.26)
        const eased = exit * exit * (3 - 2 * exit)
        search.style.opacity = `${1 - eased}`
        search.style.transform = `translate3d(0, ${(-26 * eased).toFixed(1)}px, 0)`
        search.style.pointerEvents = eased > 0.04 ? 'none' : ''
        search.style.visibility = eased > 0.995 ? 'hidden' : 'visible'
      }

      // A whisper of push-in adds depth to the camera move without resampling cost.
      video.style.transform = `scale(${(1.015 + progress * 0.055).toFixed(4)})`
    }

    const step = (ts: number) => {
      const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 1 / 60
      lastTs = ts

      const target = clamp01((window.scrollY - sectionTop) / travel)
      if (!primed) {
        // Reloading mid-hero should land on the frame the scroll implies, not ease
        // in from frame 0 as if the film had been playing.
        displayed = target
        primed = true
      } else {
        const follow = 1 - Math.exp(-dt / SMOOTHING_TAU)
        displayed += (target - displayed) * follow
        if (Math.abs(target - displayed) < SETTLE_EPSILON) displayed = target
      }

      styleLayers(displayed)

      const duration = video.duration
      if (Number.isFinite(duration) && duration > 0) {
        const time = Math.min(displayed * duration, duration - 0.001)
        const canSeek = video.readyState >= 2 && !video.seeking
        if (canSeek && Math.abs(time - lastSeekTime) >= MIN_SEEK_DELTA) {
          video.currentTime = time
          lastSeekTime = time
        }
      }

      const settled = displayed === target && !video.seeking
      if (settled) {
        looping = false
        lastTs = 0
        return
      }
      frame = requestAnimationFrame(step)
    }

    const wake = () => {
      if (aborted || looping) return
      looping = true
      lastTs = 0
      frame = requestAnimationFrame(step)
    }

    const onReady = () => {
      if (video.readyState >= 2) setStatus('ready')
      lastSeekTime = -1
      wake()
    }

    const onProgress = () => {
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0 || video.buffered.length === 0) return
      const end = video.buffered.end(video.buffered.length - 1)
      setBuffered((previous) => {
        const next = clamp01(end / duration)
        return next - previous > 0.02 ? next : previous
      })
    }

    const onError = () => {
      aborted = true
      looping = false
      cancelAnimationFrame(frame)
      resetLayers()
      setStatus('error')
    }

    const onScroll = () => wake()
    const onResize = () => {
      measure()
      wake()
    }
    const onVisibility = () => {
      if (!document.hidden) onResize()
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    video.addEventListener('progress', onProgress)
    video.addEventListener('error', onError)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    if (video.readyState >= 2) setStatus('ready')
    measure()
    wake()

    return () => {
      aborted = true
      looping = false
      cancelAnimationFrame(frame)
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
      video.removeEventListener('progress', onProgress)
      video.removeEventListener('error', onError)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  // If the cinematic layer is turned off (reduced motion toggled mid-session), drop
  // the inline transforms so the static hero renders at its natural size.
  useEffect(() => {
    if (enabled) return
    for (const node of [copyRef.current, searchRef.current]) {
      if (!node) continue
      node.style.opacity = ''
      node.style.transform = ''
      node.style.visibility = ''
      node.style.pointerEvents = ''
    }
  }, [enabled])

  return { sectionRef, stageRef, videoRef, copyRef, searchRef, status, buffered }
}
