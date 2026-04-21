// 统计上报工具 — fire-and-forget，绝不阻碍页面加载

/** 结果页真实统计数据 */
export interface ResultStats {
  totalSubmissions: number
  sameCharacterCount: number
  sameCharacterPercent: number
  sameArchetypeCount: number
  sameArchetypePercent: number
  characterRank: number | null
  archetypeRank: number | null
}

/**
 * 获取结果页真实统计数据
 * 静默失败返回 null，不阻碍页面
 */
export async function fetchResultStats(
  characterCode: string,
  archetypeCode: string,
): Promise<ResultStats | null> {
  try {
    const params = new URLSearchParams({ character: characterCode, archetype: archetypeCode })
    const res = await fetch(`/api/stats/result?${params.toString()}`)
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}
// 使用 sendBeacon 优先，fallback 到 fetch keepalive

const APP_VERSION = '0.3.5-jp-fix'

export interface SubmitPayload {
  submissionId: string
  appVersion: string
  archetypeCode: string
  characterCode: string
  predictedMbti?: string
  dimensionScores: {
    ei?: number
    sn?: number
    tf?: number
    jp?: number
  }
  durationMs?: number
  answers?: Array<{ questionId: string; answerValue: number }>
}

export interface FeedbackPayload {
  submissionId: string
  selfMbti: string
  confidence: number
  note?: string
  appVersion: string
  turnstileToken?: string
  answers?: Array<{ questionId: string; answerValue: number }>
  predictedMbti?: string
  archetypeCode?: string
  characterCode?: string
}

/**
 * 后台静默上报问卷结果
 * 使用 sendBeacon 或 fetch keepalive，失败完全吞掉
 */
export function reportResultInBackground(payload: Omit<SubmitPayload, 'appVersion'>) {
  const body = JSON.stringify({ ...payload, appVersion: APP_VERSION })

  console.log('📤 Sending submit payload:', {
    submissionId: payload.submissionId,
    archetypeCode: payload.archetypeCode,
    characterCode: payload.characterCode,
    durationMs: payload.durationMs ?? null,
    appVersion: APP_VERSION,
  })

  setTimeout(() => {
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' })
        const queued = navigator.sendBeacon('/api/submit', blob)
        console.log('📨 sendBeacon queued:', queued)
        if (queued) return
      }

      // fallback
      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).then(res => {
        console.log('📡 /api/submit response:', res.status, res.statusText)
      }).catch((err) => {
        console.error('❌ /api/submit error:', err)
      })
    } catch (err) {
      console.error('❌ reportResultInBackground error:', err)
    }
  }, 0)
}

/**
 * 用户主动提交 MBTI 反馈
 * 返回 true/false 表示成功/失败，用于 UI 提示
 */
export async function submitFeedback(payload: Omit<FeedbackPayload, 'appVersion'>): Promise<boolean> {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, appVersion: APP_VERSION }),
    })
    const data = await res.json()
    if (res.status !== 200) {
      console.error('❌ /api/feedback failed:', res.status, data)
    }
    return data.ok === true
  } catch (err) {
    console.error('❌ submitFeedback error:', err)
    return false
  }
}
