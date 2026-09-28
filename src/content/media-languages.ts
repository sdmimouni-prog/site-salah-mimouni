export type ContentAudioLanguage = 'fr' | 'ar' | 'fr-ar';
// Original audio language reported by YouTube's automatic caption metadata,
// checked on 27 September 2026. An unknown language is never inferred from a title.
export const podcastAudioLanguages: Record<string, ContentAudioLanguage | undefined> = {
  Q6cC7A2ST7M: 'ar',
  ilmbyrflEQQ: 'ar',
  NADMauj7z68: undefined,
  WRUzlvH0lug: 'fr',
  '3CgqiI0YMUA': 'ar',
  ofJESCT5HDc: 'fr',
  ETay40EqtfY: 'fr',
};
