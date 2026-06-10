<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import archetypesData from '../data/archetypes.json'
import charactersData from '../data/characters.json'
import characterVisualsData from '../data/characterVisuals.json'
import { useI18n } from '../i18n'
import { getLocalizedCharacterName, getLocalizedCharacterSeries } from '../i18n/characters'
import { resolvePublicAsset } from '../utils/characterVisuals'
import { useSeo } from '../composables/useSeo'
import { buildApiUrl } from '../utils/runtimeApi'

useSeo({
  title: 'ACGTI 全局统计 - 测试数据概览',
  description: '查看 ACGTI 官网的全局测试统计数据，包括各人格类型分布、热门角色命中排行和测试参与趋势。',
  path: '/stats',
})

const { t, locale } = useI18n()

// --- Archetype lookup ---
interface ArchetypeDef {
  id: string
  name: string
  subtitle: string
  accent: string
}
const archetypeMap = computed(() => {
  const map = new Map<string, ArchetypeDef>()
  for (const a of archetypesData as ArchetypeDef[]) {
    map.set(a.id, a)
  }
  return map
})

// --- Character visual lookup ---
type CharacterVisual = { thumb?: string; accent: string }
const visualMap = characterVisualsData as Record<string, CharacterVisual>

interface CharacterDef {
  id: string
  code: string
  name: string
  series: string
  hidden?: boolean
}

const characterCodeMap = computed(() => {
  const map = new Map<string, CharacterDef>()
  for (const item of charactersData as CharacterDef[]) {
    map.set(item.code.toUpperCase(), item)
  }
  return map
})

// --- Stats data ---
interface OverviewData {
  totalSubmissions: number
  todaySubmissions: number
  last24hSubmissions: number
}
interface RankedItem {
  code: string
  count: number
  percent: number
}

const loading = ref(true)
const overview = ref<OverviewData | null>(null)
const archetypes = ref<RankedItem[]>([])
const characters = ref<RankedItem[]>([])
const updatedAt = ref<string | null>(null)
const loadError = ref<string | null>(null)

function getLocaleLoadErrorMessage(): string {
  if (locale.value === 'zh-TW') {
    return '統計資料目前無法載入。若在本機開發，請使用 wrangler pages dev 啟動，才能訪問 /api/stats/*。'
  }
  if (locale.value === 'en') {
    return 'Stats data is currently unavailable. In local development, please run with wrangler pages dev so /api/stats/* works.'
  }
  if (locale.value === 'ja') {
    return '統計データを読み込めません。ローカル開発では wrangler pages dev で起動して /api/stats/* にアクセスしてください。'
  }
  return '统计数据暂时无法加载。本地开发请使用 wrangler pages dev 启动，才能访问 /api/stats/*。'
}

async function fetchStatsJson(url: string) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  })
  const contentType = response.headers.get('content-type') ?? ''
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error('stats_api_unavailable')
  }
  return response.json()
}

function getCharacterFromCode(code: string): CharacterDef | null {
  return characterCodeMap.value.get(code.toUpperCase()) ?? null
}

function getCharacterName(code: string): string {
  const character = getCharacterFromCode(code)
  if (!character) return code
  return getLocalizedCharacterName(character, locale.value)
}

function getCharacterSeries(code: string): string {
  const character = getCharacterFromCode(code)
  if (!character) return ''
  return getLocalizedCharacterSeries(character, locale.value)
}

function getCharacterThumb(code: string): string | null {
  const character = getCharacterFromCode(code)
  if (!character) return null
  const thumb = visualMap[character.id]?.thumb
  return thumb ? resolvePublicAsset(thumb) : null
}

function getCharacterAccent(code: string): string {
  const character = getCharacterFromCode(code)
  if (!character) return '#3ba17c'
  return visualMap[character.id]?.accent ?? '#3ba17c'
}

function formatNumber(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'W'
  return n.toLocaleString()
}

function formatTime(iso: string | null): string {
  if (!iso) return '--'
  const d = new Date(iso)
  return d.toLocaleString(locale.value === 'zh-CN' || locale.value === 'zh-TW' ? 'zh-CN' : locale.value)
}

// Character list with progressive loading
const characterDisplayCount = ref(20)
const topCharacters = computed(() => characters.value.slice(0, characterDisplayCount.value))
const hasMoreCharacters = computed(() => characterDisplayCount.value < characters.value.length)

function loadMoreCharacters() {
  characterDisplayCount.value = Math.min(characterDisplayCount.value + 20, characters.value.length)
}

onMounted(async () => {
  try {
    const [overviewRes, archetypesRes, charactersRes] = await Promise.all([
      fetchStatsJson(buildApiUrl('/api/stats/overview')),
      fetchStatsJson(buildApiUrl('/api/stats/archetypes')),
      fetchStatsJson(buildApiUrl('/api/stats/characters')),
    ])

    const overviewJson = overviewRes
    const archetypesJson = archetypesRes
    const charactersJson = charactersRes

    if (overviewJson.data) overview.value = overviewJson.data
    if (archetypesJson.data?.items) archetypes.value = archetypesJson.data.items
    if (charactersJson.data?.items) characters.value = charactersJson.data.items
    updatedAt.value = overviewJson.updatedAt ?? archetypesJson.updatedAt ?? charactersJson.updatedAt ?? null
  } catch (err) {
    console.error('Failed to load stats:', err)
    loadError.value = getLocaleLoadErrorMessage()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="stats-page">
    <!-- Hero header -->
    <section class="stats-hero" v-reveal>
      <div class="container">
        <h1 class="stats-page-title">{{ t('stats.title') }}</h1>
        <p class="stats-page-subtitle">
          {{ t('stats.subtitle') }}
          <br>
          <small style="opacity: 0.8; font-size: 0.85em; display: inline-block; margin-top: 6px;">
            ({{ t('stats.startNote') }})
          </small>
        </p>
      </div>
    </section>

    <!-- Loading skeleton -->
    <section v-if="loading" class="stats-section">
      <div class="container">
        <div class="skeleton-grid">
          <div v-for="i in 3" :key="i" class="skeleton-card">
            <div class="skeleton-line wide"></div>
            <div class="skeleton-line narrow"></div>
          </div>
        </div>
      </div>
    </section>

    <template v-else>
      <section v-if="loadError" class="stats-section" v-reveal>
        <div class="container">
          <div class="error-card">{{ loadError }}</div>
        </div>
      </section>

      <!-- Overview cards -->
      <section class="stats-section" v-reveal>
        <div class="container">
          <div class="overview-grid">
            <div class="overview-card">
              <span class="overview-value">{{ formatNumber(overview?.totalSubmissions ?? 0) }}</span>
              <span class="overview-label">{{ t('stats.overview.total') }}</span>
            </div>
            <div class="overview-card">
              <span class="overview-value">{{ formatNumber(overview?.todaySubmissions ?? 0) }}</span>
              <span class="overview-label">{{ t('stats.overview.today') }}</span>
            </div>
            <div class="overview-card">
              <span class="overview-value">{{ formatNumber(overview?.last24hSubmissions ?? 0) }}</span>
              <span class="overview-label">{{ t('stats.overview.last24h') }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Character rankings -->
      <section class="stats-section" v-reveal>
        <div class="container">
          <h2 class="section-title">{{ t('stats.characters.title') }}</h2>
          <p class="section-subtitle">{{ t('stats.characters.subtitle') }}</p>

          <div class="ranking-list">
            <component
              :is="getCharacterFromCode(item.code) ? 'RouterLink' : 'div'"
              v-for="(item, index) in topCharacters"
              :key="item.code"
              class="ranking-row character-row"
              :to="getCharacterFromCode(item.code) ? { path: '/result', query: { character: getCharacterFromCode(item.code)?.id } } : undefined"
              style="text-decoration: none; color: inherit; display: flex;"
            >
              <span class="ranking-index">{{ index + 1 }}</span>
              <img
                v-if="getCharacterThumb(item.code)"
                :src="getCharacterThumb(item.code) ?? undefined"
                :alt="getCharacterName(item.code)"
                class="ranking-avatar"
              />
              <div v-else class="ranking-avatar placeholder"></div>
              <div class="ranking-info">
                <div class="ranking-header">
                  <span class="ranking-name">{{ getCharacterName(item.code) }}</span>
                  <span class="ranking-percent">{{ item.percent.toFixed(1) }}%</span>
                </div>
                <span class="ranking-subtitle">{{ getCharacterSeries(item.code) || item.code }}</span>
                <div class="ranking-bar-track">
                  <div
                    class="ranking-bar-fill"
                    :style="{
                      width: `${Math.max(item.percent, 1)}%`,
                      backgroundColor: getCharacterAccent(item.code),
                    }"
                  ></div>
                </div>
                <span class="ranking-count">{{ formatNumber(item.count) }}</span>
              </div>
            </component>
          </div>

          <div v-if="hasMoreCharacters" class="load-more-wrapper">
            <button class="load-more-btn" @click="loadMoreCharacters">
              {{ t('stats.characters.loadMore') }}
            </button>
            <p class="load-more-hint">{{ t('stats.characters.showing', { current: topCharacters.length, total: characters.length }) }}</p>
          </div>
        </div>
      </section>
      <section class="stats-section" v-reveal>
        <div class="container">
          <h2 class="section-title">{{ t('stats.archetypes.title') }}</h2>
          <p class="section-subtitle">{{ t('stats.archetypes.subtitle') }}</p>

          <div class="ranking-list">
            <div
              v-for="(item, index) in archetypes"
              :key="item.code"
              class="ranking-row archetype-row"
            >
              <span class="ranking-index">{{ index + 1 }}</span>
              <div class="ranking-info">
                <div class="ranking-header">
                  <span
                    class="ranking-name"
                    :style="{ color: archetypeMap.get(item.code)?.accent }"
                  >
                    {{ archetypeMap.get(item.code)?.name ?? item.code }}
                  </span>
                  <span class="ranking-percent">{{ item.percent.toFixed(1) }}%</span>
                </div>
                <div class="ranking-bar-track">
                  <div
                    class="ranking-bar-fill"
                    :style="{
                      width: `${Math.max(item.percent, 1)}%`,
                      backgroundColor: archetypeMap.get(item.code)?.accent ?? '#3ba17c',
                    }"
                  ></div>
                </div>
                <span class="ranking-count">{{ formatNumber(item.count) }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Archetype rankings -->
      <section class="stats-footer" v-reveal>
        <div class="container">
          <p class="footer-note">{{ t('stats.footer.note') }}</p>
          <p class="footer-update">{{ t('stats.footer.updateFreq') }}</p>
          <p class="footer-time">{{ t('stats.footer.lastUpdate', { time: formatTime(updatedAt) }) }}</p>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.container {
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
}

/* Hero */
.stats-hero {
  padding: 6rem 0 4rem;
  text-align: center;
  background: linear-gradient(135deg, #e8f5ee 0%, #f0f4ff 100%); /* Revert to soft pastel gradient */
  color: #1a1a2e;
  border-bottom: none;
}
.stats-page-title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.5px;
}
.stats-page-subtitle {
  margin: 1.2rem auto 0;
  font-size: 1.15rem;
  color: #55606b;
  max-width: 600px;
  line-height: 1.6;
}

/* Sections */
.stats-section {
  padding: 4rem 0;
  background-color: #fafbfc; /* Very soft light gray */
}
.stats-section:nth-child(even) {
  background-color: #ffffff; 
}

.section-title {
  margin: 0 0 0.5rem;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #1a1a2e;
  text-align: center;
}
.section-subtitle {
  margin: 0 0 3rem;
  font-size: 1.05rem;
  color: #667380; 
  text-align: center;
}

/* Overview cards */
overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.overview-card {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #edf1f4;
  transition: transform 0.2s, box-shadow 0.2s;
}
.overview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
.overview-value {
  display: block;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #3ba17c; /* Revert to familiar green */
  line-height: 1;
}
.overview-label {
  display: block;
  margin-top: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  color: #88939e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Ranking list */
.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;
}
.ranking-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: #fff;
  border-radius: 16px; /* softer border radius */
  padding: 1.25rem 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04); /* slightly softer/wider shadow */
  border: 1px solid #edf1f4; /* clearer border */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.ranking-row:hover {
  transform: translateY(-2px); /* classic SaaS hover */
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.ranking-index {
  flex-shrink: 0;
  width: 2.5rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 800;
  color: #d1d8df;
}
.ranking-row:nth-child(1) .ranking-index { color: #e5b540; font-size: 1.4rem; } 
.ranking-row:nth-child(2) .ranking-index { color: #aab0b3; font-size: 1.3rem; } 
.ranking-row:nth-child(3) .ranking-index { color: #c0885a; font-size: 1.3rem; } 

.ranking-avatar {
  flex-shrink: 0;
  width: 64px;
  height: 80px;
  border-radius: 12px;
  object-fit: contain;
  background: #f0f4f8;
  border: 1px solid #edf1f4;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.ranking-avatar.placeholder {
  background: linear-gradient(135deg, #e8edf2, #f5f8fb);
  border: none;
}

.ranking-info {
  flex: 1;
  min-width: 0;
}
.ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.ranking-name {
  font-weight: 800;
  font-size: 1.15rem;
  color: #2a3136;
}
.ranking-percent {
  font-weight: 800;
  font-size: 1.1rem;
  color: #3ba17c;
  flex-shrink: 0;
  background: rgba(59, 161, 124, 0.1); /* Match the green */
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}
.ranking-subtitle {
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  color: #88939e;
  font-weight: 500;
}
.ranking-bar-track {
  width: 100%;
  height: 12px;
  background: #f0f4f8; /* softer background */
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);
}
.ranking-bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.ranking-count {
  font-size: 0.8rem;
  font-weight: 600;
  color: #aeb6bf;
  margin-top: 0.4rem;
  display: flex;
  justify-content: flex-end;
}

/* Load more */
.load-more-wrapper {
  text-align: center;
  margin-top: 2rem;
}
.load-more-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: #3ba17c;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.load-more-btn:hover {
  background: #2e8a67;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 161, 124, 0.3);
}
.load-more-btn:active {
  transform: translateY(0);
}
.load-more-hint {
  margin: 0.75rem 0 0;
  font-size: 0.85rem;
  color: #88939e;
}

/* Footer */
.stats-footer {
  padding: 4rem 0;
  background-color: #fafbfc; /* Back to light mode */
  color: #667380;
  text-align: center;
  border-top: 1px solid #edf1f4;
}
.footer-note {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: #667380;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}
.footer-update {
  margin: 0 0 0.4rem;
  font-size: 0.85rem;
  color: #88939e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.footer-time {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a2e;
}

/* Loading skeleton */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.skeleton-card {
  background: #fff;
  border-radius: 16px;
  padding: 3rem 1.5rem;
  border: 1px solid #edf1f4;
}
.error-card {
  border: 1px solid #f0d9a6;
  background: #fff8e8;
  color: #7a5a16;
  border-radius: 12px;
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.skeleton-line {
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.skeleton-line.wide { height: 2.5rem; width: 60%; margin: 0 auto 1rem; border-radius: 8px; }
.skeleton-line.narrow { height: 1rem; width: 40%; margin: 0 auto; border-radius: 4px; }
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive */
@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
  .ranking-list {
    padding: 0 1rem;
  }
  .ranking-row {
    padding: 1rem;
    gap: 1rem;
  }
  .ranking-avatar {
    width: 52px;
    height: 64px;
    border-radius: 8px;
  }
  .overview-value {
    font-size: 2.2rem;
  }
  .stats-hero {
    padding: 4rem 1rem 3rem;
  }
}
</style>
