import { EngineConfigurationOption, EngineConfigurationOptionCategory, Text } from '@sonolus/core'

const SE_PATTERN_NAMES = ['Our Notes', 'Solid', 'Wood', 'Typing'] as const

const CATEGORY = {
    sonolus: 'Sonolus',
    basicNote: 'Basic / Notes Setting',
    basicLive: 'Basic / LIVE Setting',
    detailLane: 'Details / Lane Setting',
    detailNote: 'Details / Notes Setting',
    detailEffect: 'Details / Effect Setting',
    display1Bg: 'Display 1 / Background Display Setting',

    display1Combo: 'Display 1 / Combo Display Setting',
    display2Lane: 'Display 2 / Lane Skin Display Setting',
    display2Note: 'Display 2 / Notes Skin Display Setting',
    soundLive: 'Sound / LIVE Volume',
    soundNoteSe: 'Sound / Notes SE',

} as const

export const optionCategories: EngineConfigurationOptionCategory[] = [
    { name: CATEGORY.sonolus, title: 'Sonolus' },
    { name: CATEGORY.basicNote, title: 'Basic - Notes Setting' },
    { name: CATEGORY.basicLive, title: 'Basic - LIVE Setting' },
    { name: CATEGORY.detailLane, title: 'Details - Lane Setting' },
    { name: CATEGORY.detailNote, title: 'Details - Notes Setting' },
    { name: CATEGORY.detailEffect, title: 'Details - Effect Setting' },
    { name: CATEGORY.display1Bg, title: 'Display 1 - Background Display Setting' },
    { name: CATEGORY.display1Combo, title: 'Display 1 - Combo Display Setting' },
    { name: CATEGORY.display2Lane, title: 'Display 2 - Lane Skin Display Setting' },
    { name: CATEGORY.display2Note, title: 'Display 2 - Notes Skin Display Setting' },
    { name: CATEGORY.soundLive, title: 'Sound - LIVE Volume' },
    { name: CATEGORY.soundNoteSe, title: 'Sound - Notes SE' },
]

export const optionsDefinition = {

    speed: {
        name: Text.Speed,
        category: CATEGORY.sonolus,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    hidden: {
        name: Text.Hidden,
        category: CATEGORY.sonolus,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    sfxEnabled: {
        name: Text.Effect,
        description: 'Play note sounds and live sound effects.',
        category: CATEGORY.sonolus,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },
    autoSFX: {
        name: Text.EffectAuto,
        description: 'Play note sounds on the beat, regardless of when you tap.',
        category: CATEGORY.sonolus,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },
    noteEffectEnabled: {
        name: Text.NoteEffect,
        description: 'Show a visual effect when a note is judged.',
        category: CATEGORY.sonolus,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },
    laneEffectEnabled: {
        name: Text.LaneEffect,
        description: 'Light up the lane when you hit a note or tap an empty lane.',
        category: CATEGORY.sonolus,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },
    lockStageAspectRatio: {
        name: Text.StageAspectratioLock,
        category: CATEGORY.sonolus,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },
    previewVerticalScale: {
        name: Text.PreviewScaleVertical,
        category: CATEGORY.sonolus,
        scope: 'Our Notes',
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },

    flickDirectionCheck: {
        name: 'Strict Flick Direction',
        description: 'Require flicks to follow the arrow direction.',
        category: CATEGORY.sonolus,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    noteSpeed: {
        name: 'Notes Speed',
        description: 'Higher values make notes approach the judgment line faster.',
        category: CATEGORY.basicNote,
        scope: 'Our Notes',
        type: 'slider',
        def: 5,
        min: 1,
        max: 12,
        step: 0.01,
    },

    noteTiming: {
        name: 'Notes Timing',
        description: 'If you see more SLOW judgments, increase the value. If you see more FAST judgments, decrease it.',
        category: CATEGORY.basicNote,
        scope: 'Our Notes',
        type: 'slider',
        def: 0,
        min: -300,
        max: 300,
        step: 1,
        unit: Text.MillisecondUnit,
    },

    chartPosition: {
        name: 'Chart Position',
        description: 'Positive values delay the chart relative to the music. Negative values move it earlier.',
        category: CATEGORY.basicNote,
        scope: 'Our Notes',
        type: 'slider',
        def: 0,
        min: -300,
        max: 300,
        step: 1,
        unit: Text.MillisecondUnit,
    },

    mirror: {
        name: 'Mirror Chart',
        category: CATEGORY.basicNote,
        type: 'toggle',
        def: 0,
    },

    vibration: {
        name: 'Vibration',
        description: 'Vibrate on note judgments on supported devices.',
        category: CATEGORY.basicLive,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },

    fastSlowDisplay: {
        name: 'FAST/SLOW Display',
        category: CATEGORY.detailLane,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    perfectFastSlowDisplay: {
        name: 'PERFECT FAST/SLOW Display',
        category: CATEGORY.detailLane,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    judgeOffsetMsDisplay: {
        name: 'FAST/SLOW Numerical Display',
        category: CATEGORY.detailLane,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    judgeResultPosition: {
        name: 'Judgment Text Display Position',
        category: CATEGORY.detailLane,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: ['Center', 'Each Lane', 'No Display'],
    },

    judgePosition: {
        name: 'HIT Position',
        category: CATEGORY.detailNote,
        scope: 'Our Notes',
        type: 'slider',
        def: 0,
        min: -5,
        max: 5,
        step: 1,
    },

    judgementLine: {
        name: 'HIT Position Display',
        category: CATEGORY.detailNote,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    slideOpacity: {
        name: 'Slide Opacity',
        category: CATEGORY.detailNote,
        scope: 'Our Notes',
        type: 'slider',
        def: 60,
        min: 10,
        max: 100,
        step: 5,
    },

    guideOpacity: {
        name: 'Guide Opacity',
        category: CATEGORY.detailNote,
        scope: 'Our Notes',
        type: 'slider',
        def: 60,
        min: 10,
        max: 100,
        step: 5,
    },

    simLineEnabled: {
        name: 'Simultaneous Press Line Display',
        category: CATEGORY.detailNote,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },

    measureLine: {
        name: 'Bar Line Display',
        category: CATEGORY.detailNote,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    damageEffect: {
        name: 'Damage Effect',
        category: CATEGORY.detailEffect,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },

    backgroundBrightness: {
        name: 'Background Brightness',
        description: 'Lower the brightness to darken the stage behind the notes.',
        category: CATEGORY.display1Bg,
        scope: 'Our Notes',
        type: 'slider',
        def: 70,
        min: 30,
        max: 100,
        step: 1,
    },

    comboCountDisplay: {
        name: 'Combo Number Display',
        category: CATEGORY.display1Combo,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },

    judgeDetailDisplay: {
        name: 'HIT Breakdown',
        category: CATEGORY.display1Combo,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },

    continuationEffectDisplay: {
        name: 'Continuous Effect Display',
        category: CATEGORY.display1Combo,
        scope: 'Our Notes',
        type: 'toggle',
        def: 1,
    },

    laneOpacity: {
        name: 'Lane Opacity',
        description: 'Lower the opacity to see more of the stage through the lanes.',
        category: CATEGORY.display2Lane,
        scope: 'Our Notes',
        type: 'slider',
        def: 80,
        min: 0,
        max: 100,
        step: 1,
    },

    guidelineOpacity: {
        name: 'Guideline Opacity',
        category: CATEGORY.display2Lane,
        scope: 'Our Notes',
        type: 'slider',
        def: 25,
        min: 0,
        max: 100,
        step: 1,
    },

    guidelineCount: {
        name: 'Number of Guidelines',
        category: CATEGORY.display2Lane,
        scope: 'Our Notes',
        type: 'select',
        def: 2,
        values: ['No Display', '4 Lanes', '6 Lanes', '8 Lanes', '12 Lanes'],
    },

    skillLine: {
        name: 'LIVE Skill Activation Display',
        category: CATEGORY.display2Lane,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    noteStartPosition: {
        name: 'Notes Start Position',
        category: CATEGORY.display2Note,
        scope: 'Our Notes',
        type: 'slider',
        def: 0,
        min: 0,
        max: 100,
        step: 10,
    },

    liveSeMute: {
        name: 'SE Mute',
        category: CATEGORY.soundLive,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    liveNoteSeMute: {
        name: 'Notes SE Mute',
        category: CATEGORY.soundLive,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    noteSePattern: {
        name: 'Notes SE Change',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: [...SE_PATTERN_NAMES],
    },

    useIndividualNoteSe: {
        name: 'Notes Type SE & Volume Setting',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    tapSe: {
        name: 'Tap',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: [...SE_PATTERN_NAMES],
    },

    tapSeMute: {
        name: 'Tap Mute',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    emptyTapSe: {
        name: 'Empty Tap',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: [...SE_PATTERN_NAMES],
    },

    emptyTapSeMute: {
        name: 'Empty Tap Mute',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    flickSe: {
        name: 'Flick',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: [...SE_PATTERN_NAMES],
    },

    flickSeMute: {
        name: 'Flick Mute',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    sideFlickSe: {
        name: 'Side Flick',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: [...SE_PATTERN_NAMES],
    },

    sideFlickSeMute: {
        name: 'Side Flick Mute',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    slideSe: {
        name: 'Slide',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: [...SE_PATTERN_NAMES],
    },

    slideSeMute: {
        name: 'Slide Mute',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    traceSe: {
        name: 'Trace',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: [...SE_PATTERN_NAMES],
    },

    traceSeMute: {
        name: 'Trace Mute',
        category: CATEGORY.soundNoteSe,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

    judgeDisplayPositionPattern: {
        name: '判定表示位置',
        category: CATEGORY.detailLane,
        scope: 'Our Notes',
        type: 'select',
        def: 0,
        values: ['パターン1', 'パターン2'],
    },
    rhythmSupport: {
        name: 'Rhythm Support',
        description: 'Change the look of taps, flicks and slide starts to show their timing within the measure.',
        category: CATEGORY.basicNote,
        scope: 'Our Notes',
        type: 'toggle',
        def: 0,
    },

} satisfies Record<string, EngineConfigurationOption>

export const SE_GROUP_COUNT = SE_PATTERN_NAMES.length
