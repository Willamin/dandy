export type CharacterSheet = {
    sheetView: {
        currentLevel: number,
        namePreference: "long" | "short",
        
        inventoryHistoryVisible: boolean,
        currentInventory: number,
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
    inventoryHistory: Array<Inventory>, // A snapshot of inventory. The higher the index, the farther into the past.
}

export const shrinkToSheet = ({ sheetView, descriptive, baseScores, species, background, compendium, levels, inventoryHistory }: object & CharacterSheet): CharacterSheet => (
    {
        sheetView,
        descriptive,
        baseScores,
        species,
        background,
        compendium,
        levels,
        inventoryHistory,
    }
)

export type ItemState = {
    name: string,
    quantity?: number,
    equipped?: boolean,
    attuned?: boolean, 
    comment?: string,
    charges?: number,
    currency?: boolean,
    contained?: string | "false",
}

export type Inventory = InventoryRow | InventoryRule

export type InventoryRow = {
    comment: string,
    items: Array<ItemState>
} 

export type InventoryRule = { comment: "---" }

export type WeaponTraits = 
    "light" | "heavy" | "versatile" 
    | "finesse" | "thrown" | "two handed"

export type AnyItemBase = 
    ( 
        { type: "item" } 
        | 
        { 
            type: "armor",
            armorType: "light" | "medium" | "heavy" | "shield"
        }
        | 
        {
            type: "weapon",
            traits: WeaponTraits[],
        }
    ) 
    & 
    {  
        name: string,
        description?: string,
        diceRolls?: DiceRollDescription[],
    }

export type DiceRollDescription = {
    name: string,
    staticBonus?: number,
    proficiencyBonus?: boolean,
} & {
    strengthMod?: boolean,
    dexterityMod?: boolean,
    constitutionMod?: boolean,
    intelligenceMod?: boolean,
    wisdomMod?: boolean,
    charismaMod?: boolean,
} & DiceCollection

export type AnyItem = AnyItemBase & AnyItemEffects
export type SourcedAnyItem = AnyItemBase & SourcedAnyItemEffects

export type AnyItemEffects = {
    equippedEffects?: FeatureEffect[],
    equippedAndAttunedEffects?: FeatureEffect[],
}
export type SourcedAnyItemEffects = {
    equippedEffects?: Sourced<FeatureEffect>[],
    equippedAndAttunedEffects?: Sourced<FeatureEffect>[],
}

export type DiceSize = 4 | 6 | 8 | 10 | 12 | 20

export type DiceCollection = {
    d4?: number,
    d6?: number,
    d8?: number,
    d10?: number,
    d12?: number,
    d20?: number,
}

export const AbilityScoreOrder = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
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
    classes: Array<{name: string, hitDice: DiceSize, spellcastingAbility?: string}>,
    spells: Array<SpellDefinition>,
    items: Array<AnyItem>,
}

export type SpellDefinition = {
    name: string,
    level: number,
    description: string,
    attacks?: FeatureEffectAttack[],
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
= (FeatureWithEffect | FeatureOnlyDescription) & { sourceClass?: string }

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
| FeatureEffectAC
| FeatureEffectAttack

export type Sourced<FE extends FeatureEffect> = FE & { source: string }

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
export type FeatureEffectAC =
    ({ armorClassBase: number } | { armorClassBonus: number })
    &
    ({ dexModMultiplier: number, dexModMaximum?: number })
export type FeatureEffectAttack = 
    { damageTypes: DamageType[], name?: string } 
    & 
    (
        { attackType: "melee", reach: number }
        |
        { attackType: "ranged", range: number }
    )

export type DamageType = 
    "acid" | "bludgeoning" | "cold" | "fire" | "force"
    | "lightning" | "necrotic" | "piercing" | "piercing"
    | "poison" | "psychic" | "radiant" | "slashing" | "thunder"

export const prefixify = (value: number): {sign: string, abs: string, combined: string} => {
    if (value >= 0) {
        return {sign: "+", abs: `${value}`, combined: `+${value}`}
    } else {
        return {sign: "-", abs: `${value}`, combined: `-${value}`}
    }
}

export const titleCase = (string: string): string => (
    string.slice(0, 1).toUpperCase() + string.slice(1, string.length)
)