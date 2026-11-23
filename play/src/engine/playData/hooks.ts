import { SimJudgement } from '../../../../shared/src/engine/data/notes.js'
import { options } from '../configuration/options.js'
import { EffectIds, playEmptyTapEffects, playEmptyTapEffectsParallel, playJudgeEffects } from './hookEffects.js'
import { HookStream } from './hookStreams.js'
import { inputNoteSfxOn } from './seGroups.js'

const writeJudgementStreams = (entityIndex: number, op: number, dir: number, sim: number, timing: number, diffMs: number, c: number, w: number, hitTime: number) => {
    streams.set(HookStream.noteBase + entityIndex, hitTime, sim)
    streams.set(HookStream.judgement, hitTime, sim)
    streams.set(HookStream.judgementTiming, hitTime, timing)
    streams.set(HookStream.judgementDiffMs, hitTime, diffMs)
    streams.set(HookStream.judgementLane, hitTime, c)
    streams.set(HookStream.judgementWidth, hitTime, w)
    streams.set(HookStream.judgementOp, hitTime, op)
    streams.set(HookStream.judgementDir, hitTime, dir)
    if (sim === SimJudgement.Miss || sim === SimJudgement.Bad) streams.set(HookStream.comboReset, hitTime, 1)
}

export const onNoteJudged = (
    ids: ContainerType<typeof EffectIds>,
    entityIndex: number,
    op: number,
    dir: number,
    sim: number,
    timing: number,
    diffMs: number,
    c: number,
    w: number,
    edgeL: number,
    edgeR: number,
    hitTime: number,
) => {
    writeJudgementStreams(entityIndex, op, dir, sim, timing, diffMs, c, w, hitTime)

    playJudgeEffects(ids, sim, c, w, edgeL, edgeR, inputNoteSfxOn(), options.noteEffectEnabled, false)
}

export const onNoteMissed = (entityIndex: number, op: number, dir: number, timing: number, diffMs: number, c: number, w: number, hitTime: number) => {
    writeJudgementStreams(entityIndex, op, dir, SimJudgement.Miss, timing, diffMs, c, w, hitTime)
}

export const onEmptyTap = (edge: number) => {
    streams.set(HookStream.emptyTap, time.now, edge)
    playEmptyTapEffects(edge, inputNoteSfxOn(), options.laneEffectEnabled)
}

export const onEmptyTapParallel = (edge: number) => {
    streams.set(HookStream.emptyTap, time.now, edge)
    playEmptyTapEffectsParallel(edge, inputNoteSfxOn(), options.laneEffectEnabled)
}

export const onHoldBegin = (startEntity: number) => {
    streams.set(HookStream.holdBegin, time.now, startEntity)
}
export const onHoldEnd = (startEntity: number) => {
    streams.set(HookStream.holdEnd, time.now, startEntity)
}
export const onFever = (isStart: boolean) => {
    streams.set(HookStream.fever, time.now, isStart ? 1 : 0)
}
export const onSkill = () => {
    streams.set(HookStream.skill, time.now, 1)
}

export { HookStream }
