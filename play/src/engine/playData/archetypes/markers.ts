import { DataName } from '../../../../../shared/src/engine/data/level.js'
import { options } from '../../configuration/options.js'
import { onFever, onSkill } from '../hooks.js'
import { note } from '../note.js'
import { drawBarLine } from '../stageDraw.js'
import { chartTime } from '../layout.js'

abstract class TimedLine extends Archetype {
    import = this.defineImport({
        ms: { name: DataName.Ms, type: Number },
    })

    abstract isSkill: boolean
    abstract get enabled(): boolean

    t = this.entityMemory(Number)

    preprocess() {
        this.t = chartTime(this.import.ms)
    }

    spawnOrder() {
        return 1000 + note.spawnTime(this.t)
    }

    shouldSpawn() {
        return time.now >= note.spawnTime(this.t)
    }

    updateParallel() {

        if (time.now >= this.t) {
            this.despawn = true
            return
        }
        if (!this.enabled) return
        drawBarLine(note.progress(this.t), this.isSkill)
    }
}

export class BarLine extends TimedLine {
    isSkill = false
    get enabled() {
        return options.measureLine
    }
}

export class SkillMarker extends TimedLine {
    isSkill = true
    fired = this.entityMemory(Boolean)

    get enabled() {
        return options.skillLine
    }

    updateSequential() {
        if (this.fired || time.now < this.t) return
        this.fired = true
        onSkill()
    }
}

export class FeverRange extends Archetype {
    import = this.defineImport({
        ms: { name: DataName.Ms, type: Number },
        endMs: { name: DataName.EndMs, type: Number },
    })

    started = this.entityMemory(Boolean)

    spawnOrder() {
        return 1000 + chartTime(this.import.ms)
    }

    shouldSpawn() {
        return time.now >= chartTime(this.import.ms)
    }

    updateSequential() {
        if (!this.started) {
            this.started = true
            onFever(true)
        }
        if (time.now >= chartTime(this.import.endMs)) {
            onFever(false)
            this.despawn = true
        }
    }
}
