import { SimJudgement } from './notes.js'

export const Haptic = { None: 0, Light: 1, Medium: 2, Heavy: 3, Long: 4 } as const

const recipeHaptic = (recipe: number) => (recipe === 2 ? Haptic.Light : recipe === 3 ? Haptic.Medium : recipe === 4 ? Haptic.Heavy : Haptic.None)

export const hapticGroupOf = (op: number) => (op >= 60 && op <= 62 ? 2 : op === 120 ? 3 : op === 40 ? 1 : 0)

export const hapticOf = (op: number, sim: number) => {
    if (sim < SimJudgement.Bad || sim > SimJudgement.Just) return Haptic.None
    const g = hapticGroupOf(op)

    const recipe =
        sim === SimJudgement.Bad ? 1 : sim === SimJudgement.Good ? 2 : sim === SimJudgement.Just ? 4 : g === 2 || g === 3 ? 2 : 3
    return recipeHaptic(recipe)
}
