export type CharacterSheet = {
    sheetView: {
        currentLevel: number,
        namePreference: "long" | "short",
    },
    descriptive: {
        longName: string,
        shortName: string,
        alignment: string,
    },
    baseScores: AbilityScores,
    species: Species,
    background: Background,
    compendium: Compendium,
    levels: Array<Level>,
}

export type DiceSize = 4 | 6 | 8 | 10 | 12 | 20

export type DiceCollection = {
    d4: number,
    d6: number,
    d8: number,
    d10: number,
    d12: number,
    d20: number,
}

export type AbilityScores = {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
  }

export type Ability = keyof AbilityScores

export type Compendium = {
    classes: Array<{name: string, hitDice: DiceSize}>
    spells: Array<{name: string, level: number, description: string}>
}

export type Species = {
    name: string,
    features: Array<Feature>,
}

export type Background = {
    name: string,
    features: Array<Feature>,
    characteristics: {
        personality: Array<string>,
        ideals: Array<string>,
        bonds: Array<string>,
        flaws: Array<string>,
    },
}

export type FeatureWithEffect = {
    name: string,
    effects: [FeatureEffect, ...FeatureEffect[]], 
    description?: string,
}

export type FeatureOnlyDescription = {
    name: string,
    description: string,
}

export type Feature 
=  FeatureWithEffect | FeatureOnlyDescription

export const SkillsToAbilities = {
    "acrobatics": "dexterity",
    "animal handling": "wisdom",
    "arcana": "intelligence",
    "athletics": "strength",
    "deception": "charisma",
    "history": "intelligence",
    "insight": "wisdom",
    "intimidation": "charisma",
    "investigation": "intelligence",
    "medicine": "wisdom",
    "nature": "intelligence",
    "perception": "wisdom",
    "performance": "charisma",
    "persuasion": "charisma",
    "religion": "intelligence",
    "sleight of hand": "dexterity",
    "stealth": "dexterity",
    "survival": "wisdom",
}

export type SkillMods = 
{
    "acrobatics": number,
    "animal handling": number,
    "arcana": number,
    "athletics": number,
    "deception": number,
    "history": number,
    "insight": number,
    "intimidation": number,
    "investigation": number,
    "medicine": number,
    "nature": number,
    "perception": number,
    "performance": number,
    "persuasion": number,
    "religion": number,
    "sleight of hand": number,
    "stealth": number,
    "survival": number,
}

export type Skill = keyof SkillMods

export type FeatureEffect
= FeatureEffectIncreaseAbility
| FeatureEffectVisionDark
| FeatureEffectSkillProficiency
| FeatureEffectArmorProficienct
| FeatureEffectWeaponProficiency
| FeatureEffectToolProficiency
| FeatureEffectSavingProficiency
| FeatureEffectLanguage
| FeatureEffectWalkingSpeed
| FeatureEffectSpell
| FeatureEffectSetAbility

export type Level = {
    class: string,
    features: Array<Feature>,
}

export type FeatureEffectIncreaseAbility = { increaseAbility: Ability, amount?: number }
export type FeatureEffectVisionDark = { vision: "dark", distance: number, magical?: boolean }
export type FeatureEffectSkillProficiency = { skillProficiency: Skill }
export type FeatureEffectArmorProficienct = { armorProficiency: string }
export type FeatureEffectWeaponProficiency = { weaponProficiency: string }
export type FeatureEffectToolProficiency = { toolProficiency: string }
export type FeatureEffectSavingProficiency = { savingProficiency: Ability }
export type FeatureEffectLanguage = { language: string }
export type FeatureEffectWalkingSpeed = { walking: number}
export type FeatureEffectSpell = { spell: string }
export type FeatureEffectSetAbility = { setAbility: Ability, minimum: number }