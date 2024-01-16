import { 
    CharacterSheet, 
    Level, 
    AbilityScores,
    Feature,
    FeatureEffect,
    FeatureEffectIncreaseAbility,
    FeatureEffectSetAbility,
    SkillMods,
    SkillsToAbilities,
    FeatureOnlyDescription,
    DiceCollection,
    AnyItem,
    ItemState,
    FeatureEffectSpell,
} from "./CharacterSheet";

export type DerivedCharacter = {
    currentLevels: Array<Level>,
    proficiencyBonus: number,
    finalAbilityScores: AbilityScores,
    languages: Array<string>,
    toolProficiencies: Array<string>,
    weaponProficiencies: Array<string>,
    armorProficiencies: Array<string>,
    walkingSpeed: number,
    initiative: number,
    abilityMods: AbilityScores,
    savingThrows: AbilityScores, // structurally it's the same
    skillMods: SkillMods,
    descriptiveFeatures: FeatureOnlyDescription[],
    hitPointMaximum: number,
    hitDice: DiceCollection,
    savingThrowProficiencyBonuses: AbilityScores, // structurally it's the same
    classes: string[],
    spells: string[],
    armorClass: number,
    currentItems: (AnyItem & ItemState)[],
    spellMod: number,
    spellSaveDC: number,
}

export type FullCharacter = CharacterSheet & DerivedCharacter

export const scoreToMod = (score: number): number => (Math.floor((score - 10) / 2))

export const transfigure = (character: CharacterSheet): FullCharacter => {
    const currentLevels = character.levels.slice(0, character.sheetView.currentLevel)
    const proficiencyBonus = 1 + Math.ceil(currentLevels.length / 4)

    const currentItems: Array<AnyItem & ItemState> = character.inventoryHistory[character.sheetView.currentInventory].items.flatMap((item) => (
        {
            ...(item),
            ...(character.compendium.items.find((itemDef) => ( itemDef.name == item.name ))),
        }
    ))

    const currentItemEffects: Array<FeatureEffect> = currentItems.flatMap((item) => (
        [
            ...((item.equipped ?? false) && (item.attuned ?? false) ? (item.equippedAndAttunedEffects ?? []) : []),
            ...((item.equipped ?? false) ? (item.equippedEffects ?? []) : []),
        ]
    ))

    const allFeatures: Array<Feature> = [
        character.species.features,
        character.background.features,
        ...currentLevels.map(level => (level.features)),
    ].flat()

    const featureEffects = allFeatures.flatMap(feature => {
        if ("effects" in feature) { return feature.effects } else { return [] }
    })

    const allActiveEffects: Array<FeatureEffect> = [...featureEffects, ...currentItemEffects]

    const finalAbilityScores = calculateFinalAbilityScores({ ...character, allActiveEffects })

    const languages = allActiveEffects.flatMap((effect) => {
        if ("language" in effect) { return [effect.language] } else { return [] }
    })
    const toolProficiencies = allActiveEffects.flatMap((effect) => {
        if ("toolProficiency" in effect) { return [effect.toolProficiency] } else { return [] }
    })
    const weaponProficiencies = allActiveEffects.flatMap((effect) => {
        if ("weaponProficiency" in effect) { return [effect.weaponProficiency] } else { return [] }
    })
    const armorProficiencies = allActiveEffects.flatMap((effect) => {
        if ("armorProficiency" in effect) { return [effect.armorProficiency] } else { return [] }
    })

    const walkingSpeed = allActiveEffects.reduce((acc, effect) => {
        if ("walking" in effect) { return Math.max(acc, effect.walking) } else { return acc }
    }, 0)

    const initiative = scoreToMod(finalAbilityScores.dexterity)

    const abilityMods = {
        strength: scoreToMod(finalAbilityScores.strength),
        dexterity: scoreToMod(finalAbilityScores.dexterity),
        constitution: scoreToMod(finalAbilityScores.constitution),
        intelligence: scoreToMod(finalAbilityScores.intelligence),
        wisdom: scoreToMod(finalAbilityScores.wisdom),
        charisma: scoreToMod(finalAbilityScores.charisma),
    }

    const savingThrowProficiencyBonuses = 
        allActiveEffects
            .reduce((acc, effect) => {
                if (("savingProficiency" in effect) && (acc[effect.savingProficiency] == 0)) {
                    return { ...acc, [effect.savingProficiency]: 1 }
                } else {
                    return acc
                }
            }, {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0})

    const savingThrows = {
        strength: abilityMods.strength + proficiencyBonus * savingThrowProficiencyBonuses.strength,
        dexterity: abilityMods.dexterity + proficiencyBonus * savingThrowProficiencyBonuses.dexterity,
        constitution: abilityMods.constitution + proficiencyBonus * savingThrowProficiencyBonuses.constitution,
        intelligence: abilityMods.intelligence + proficiencyBonus * savingThrowProficiencyBonuses.intelligence,
        wisdom: abilityMods.wisdom + proficiencyBonus * savingThrowProficiencyBonuses.wisdom,
        charisma: abilityMods.charisma + proficiencyBonus * savingThrowProficiencyBonuses.charisma,
    }

    const skillProficiencyBonuses = 
        allActiveEffects.reduce((acc, effect) => {
            if ("skillProficiency" in effect) {
                return {
                    ...acc,
                    [effect.skillProficiency]: (acc[effect.skillProficiency] ?? 0) + 1
                }
            } else {
                return acc
            }
        }, {})

    const skillMods = ((): SkillMods => {
        var skills: any = {}
        Object.keys(SkillsToAbilities).forEach((key) => {
            skills[key] = (
                (abilityMods[SkillsToAbilities[key]])
                + 
                ((skillProficiencyBonuses[key] ?? 0) * proficiencyBonus)
            )
        })
        return skills
    })()

    const descriptiveFeatures = 
        allFeatures.flatMap(feature => {
            if (feature.description !== undefined) {
                return [{name: feature.name, description: feature.description}]
            } else {
                return []
            }
        })
    
    const hitPointMaximum = currentLevels.reduce((accumulator, level, index) => {
        const levelClass = character.compendium.classes.find(({name}) => {
            return name == level.class
        })

        const conHP = scoreToMod(finalAbilityScores.constitution)
        const classHP = Math.ceil(
            index == 0
            ? (levelClass?.hitDice ?? 0 )
            : ((levelClass?.hitDice ?? 0 ) / 2) + 1
        )
    
        return conHP + classHP + accumulator
        }, 0)

    let hitDice = currentLevels.reduce((accumulator, level, index) => {
        let levelClass = character.compendium.classes.find(({name}) => {
            return name == level.class
        })
    
        if (levelClass) {
            accumulator[`d${levelClass.hitDice}`] += 1
            return accumulator
        } else {
            return accumulator
        }
        }, {
        d4: 0,
        d6: 0,
        d8: 0,
        d10: 0,
        d12: 0,
        d20: 0,
        })
    
    const classes = currentLevels.reduce((accumulator, level, index) => {
        if (accumulator.includes(level.class)) {
            return accumulator
        } else {
            return [...accumulator, level.class]
        }
    }, [])

    const spells = allActiveEffects.reduce((acc, effect) => {
        if ("spell" in effect) {
            return [ ...acc, effect.spell ]
        } else {
            return acc
        }
    }, [])

    const armorClass = (() => {
        const { base, dexModMultiplier, dexModMaximum, bonusAdded } = allActiveEffects.reduce(({ base, dexModMultiplier, dexModMaximum, bonusAdded }, effect) => {
            if ("armorClassBase" in effect) {
                base = Math.max(effect.armorClassBase, base)
            }

            if ("dexModMultiplier" in effect) {
                dexModMultiplier = dexModMultiplier * (effect.dexModMultiplier ?? 1)
            }

            if ("dexModMaximum" in effect) {
                dexModMaximum = Math.min(dexModMaximum, effect.dexModMaximum)
            }

            if ("armorClassBonus" in effect) {
                bonusAdded = bonusAdded + effect.armorClassBonus
            }

            return { base, dexModMultiplier, dexModMaximum, bonusAdded }
        }, { base: 10, dexModMultiplier: 1, dexModMaximum: Number.MAX_SAFE_INTEGER, bonusAdded: 0})

        const dexBonus = Math.min(abilityMods.dexterity * dexModMultiplier, dexModMaximum)

        return base + dexBonus + bonusAdded
    })()

    const spellMod = abilityMods.charisma + proficiencyBonus
    const spellSaveDC = 8 + spellMod
    
    return {
        ...character,
        currentLevels,
        proficiencyBonus,
        finalAbilityScores,
        languages,
        toolProficiencies,
        weaponProficiencies,
        armorProficiencies,
        walkingSpeed,
        initiative,
        abilityMods, 
        savingThrowProficiencyBonuses,
        savingThrows,
        skillMods,
        descriptiveFeatures,
        hitPointMaximum,
        hitDice,
        classes,
        spells,
        armorClass,
        currentItems,
        spellMod,
        spellSaveDC,
    }
}

const calculateFinalAbilityScores = ({ baseScores, allActiveEffects }: {baseScores: AbilityScores, allActiveEffects: FeatureEffect[]}): AbilityScores => {
    let increaseAbilityEffects: FeatureEffectIncreaseAbility[] = []
    let setAbilityEffects: FeatureEffectSetAbility[] = []

    allActiveEffects.forEach((effect) => {
        if ("increaseAbility" in effect) {
            increaseAbilityEffects.push(effect)
        } else if ("setAbility" in effect) {
            setAbilityEffects.push(effect)
        }
    })

    let mutableScores = { ...baseScores};

    increaseAbilityEffects.forEach(effect => {
        mutableScores[effect.increaseAbility] += (effect.amount ?? 1)
    })

    setAbilityEffects.forEach(effect => {
        mutableScores[effect.setAbility] = Math.max(mutableScores[effect.setAbility], effect.minimum)
    })

    return mutableScores
}
