import { layout } from '../layout.js'

export const hudLayout = levelData({
    u: Number,
    invScale: Number,
    halfW: Number,
    liveLeft: Number,
    liveRight: Number,
    liveTop: Number,
    liveU: Number,
    cardCenterX: Number,
    cardCenterY: Number,
    cardBottom: Number,
    cardU: Number,
})

export const CANVAS_W = 1920
export const CANVAS_H = 1080
export const CONTENT_BOTTOM_MARGIN = 40
export const LIVE_MARGIN = { l: 0, r: 0, t: 0, b: CONTENT_BOTTOM_MARGIN } as const
export const CARD_MARGIN = { l: 20, r: 20, t: 20, b: 40 } as const

export const setupHudLayout = (aspect: number) => {
    const u = Math.min(aspect / (CANVAS_W / 2), 1 / (CANVAS_H / 2))
    hudLayout.u = u
    hudLayout.invScale = 1 / layout.scale
    hudLayout.halfW = aspect

    const liveLeft = Math.max(safeArea.l, -aspect)
    const liveRight = Math.min(safeArea.r, aspect)
    const liveTop = Math.min(safeArea.t, 1)
    const liveBottom = Math.max(safeArea.b, -1 + LIVE_MARGIN.b * u)
    hudLayout.liveLeft = liveLeft
    hudLayout.liveRight = liveRight
    hudLayout.liveTop = liveTop
    hudLayout.liveU = Math.min(u, (liveRight - liveLeft) / CANVAS_W, (liveTop - liveBottom) / (CANVAS_H - LIVE_MARGIN.b))

    const cardLeft = Math.max(liveLeft, -aspect + CARD_MARGIN.l * u)
    const cardRight = Math.min(liveRight, aspect - CARD_MARGIN.r * u)
    const cardTop = Math.min(liveTop, 1 - CARD_MARGIN.t * u)
    hudLayout.cardCenterX = (cardLeft + cardRight) / 2
    hudLayout.cardCenterY = (cardTop + liveBottom) / 2
    hudLayout.cardBottom = liveBottom
    hudLayout.cardU = Math.min(u, (cardRight - cardLeft) / (CANVAS_W - CARD_MARGIN.l - CARD_MARGIN.r),
        (cardTop - liveBottom) / (CANVAS_H - CARD_MARGIN.t - CARD_MARGIN.b))
}

export const px = (v: number) => v * hudLayout.u
export const leftX = (x: number) => hudLayout.liveLeft + x * hudLayout.liveU
export const rightX = (x: number) => hudLayout.liveRight + (x - CANVAS_W) * hudLayout.liveU
export const contentCenterX = (x: number) => (hudLayout.liveLeft + hudLayout.liveRight) / 2 + (x - CANVAS_W / 2) * hudLayout.liveU
export const topY = (y: number) => hudLayout.liveTop - y * hudLayout.liveU
export const centerX = (x: number) => (x - CANVAS_W / 2) * hudLayout.u
export const centerY = (y: number) => (CANVAS_H / 2 - y) * hudLayout.u
export const cardCenterX = (x: number) => hudLayout.cardCenterX + (x - CANVAS_W / 2) * hudLayout.cardU
export const cardCenterY = (y: number) => hudLayout.cardCenterY + ((CANVAS_H + CARD_MARGIN.t - CARD_MARGIN.b) / 2 - y) * hudLayout.cardU
export const cardBottomY = (y: number) => hudLayout.cardBottom + (CANVAS_H - CARD_MARGIN.b - y) * hudLayout.cardU

export const screenRectQuad = (l: number, b: number, r: number, t: number) => {
    const k = hudLayout.invScale
    return new Quad({ x1: l * k, y1: b * k, x2: l * k, y2: t * k, x3: r * k, y3: t * k, x4: r * k, y4: b * k })
}

export const centeredScreenQuad = (cx: number, cy: number, w: number, h: number) =>
    screenRectQuad(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)

export const pxRectAt = (cx: number, cy: number, wPx: number, hPx: number, scale: number) =>
    centeredScreenQuad(cx, cy, wPx * hudLayout.u * scale, hPx * hudLayout.u * scale)

export const fullScreenQuad = () => screenRectQuad(-hudLayout.halfW, -1, hudLayout.halfW, 1)
