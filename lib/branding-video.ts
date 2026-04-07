/** Video de fondo del hero — [YouTube](https://youtu.be/AF3c2UHTxY4) */
export const HERO_YOUTUBE_ID = "AF3c2UHTxY4"

export function getHeroYoutubeEmbedSrc(videoId: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    cc_load_policy: "0",
  })
  return `https://www.youtube.com/embed/${videoId}?${p.toString()}`
}
