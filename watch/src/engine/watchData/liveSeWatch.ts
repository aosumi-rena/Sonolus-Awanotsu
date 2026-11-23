import { SimJudgement } from '../../../../shared/src/engine/data/notes.js'
import { life as lifeSettings } from '../../../../shared/src/engine/data/windows.js'
import { hudChart } from '../../../../play/src/engine/playData/hud/hudQueue.js'
import { FinishType } from '../../../../play/src/engine/playData/hud/hudState.js'
import { effect, sfxDistanceScheduled } from '../../../../play/src/engine/playData/effect.js'
import { SeFamily, SeSlot, noteSeClip } from '../../../../play/src/engine/playData/seGroups.js'
import { HookStream } from '../../../../play/src/engine/playData/hookStreams.js'
import { scheduleFinishSe } from '../../../../play/src/engine/playData/liveSe.js'

export const watchFinish = levelMemory({ n: Number, at: Number, notAp: Boolean, notFc: Boolean, damage: Number })

export const resetWatchFinish = () => {
    watchFinish.n = 0
    watchFinish.at = 0
    watchFinish.notAp = false
    watchFinish.notFc = false
    watchFinish.damage = 0
}

export const foldWatchFinish = (sim: number, hit: number) => {
    watchFinish.n += 1
    watchFinish.at = Math.max(watchFinish.at, hit)
    if (sim !== SimJudgement.Perfect && sim !== SimJudgement.Just) watchFinish.notAp = true
    if (sim === SimJudgement.Miss || sim === SimJudgement.Bad) watchFinish.notFc = true
    watchFinish.damage += sim === SimJudgement.Bad ? 50 : sim === SimJudgement.Miss ? 100 : 0
    if (watchFinish.n !== hudChart.fcc) return
    const type =
        lifeSettings.base - watchFinish.damage < 1
            ? FinishType.LiveFailure
            : !watchFinish.notAp
              ? FinishType.PerfectCombo
              : !watchFinish.notFc
                ? FinishType.FullCombo
                : FinishType.LiveClear

    scheduleFinishSe(type, Math.max(watchFinish.at, hudChart.passDone))
}

const IN_VAIN_WALK_MAX = 100000

export const scheduleReplayInVainSe = () => {

    const clipId = noteSeClip(SeSlot.InVain, SeFamily.EmptyTap, effect.clips.fbStage)
    if (clipId < 0) return
    const clip = clipId as EffectClipId
    let k = -999999
    for (let i = 0; i < IN_VAIN_WALK_MAX; i++) {
        const nk = streams.getNextKey(HookStream.emptyTap, k)
        if (nk === k) break
        effect.clips.schedule(clip, nk, sfxDistanceScheduled)
        k = nk
    }
}
