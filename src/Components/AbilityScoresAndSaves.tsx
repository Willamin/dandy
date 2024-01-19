import React from "react"

import { FullCharacter } from "../DataModel/transfigure"
import { CharacterContext, useCharacter } from ".."
import { StatBlock, StatWrapper } from "./StatBlock"
import { prefixify } from "../DataModel/CharacterSheet"

export const StatBlockMod = (mod) => {
    const {sign, abs} = prefixify(mod)
    return (
        <div className="mono" style={{
            display: "flex", 
            alignItems: "center",
        }}>
            <span style={{
                fontSize: "0.7em",
            }}>{sign}</span>
            <span>{abs}</span>
            <span style={{
                visibility: "hidden",
                fontSize: "0.7em",
            }}>{sign}</span>
        </div>
    )
}

export const AbilityScores: React.FC<{style?: React.style}> = ({style}) => {
    const [fullCharacter, setCharacter] = useCharacter()

    return (
        <StatWrapper style={style} title="Abilities"
                primary={(ability) => (StatBlockMod(fullCharacter.abilityMods[ability]))}
                secondary={(ability) => (
                    <span className="mono">
                        {fullCharacter.finalAbilityScores[ability]} 
                    </span>
                )}
            />
    )
}

export const SavingThrows: React.FC<{style?: React.style}> = (style) => {
    const [fullCharacter, setCharacter] = useCharacter()

    return (
        <StatWrapper style={style} title="Saving Throws"
                primary={(ability) => {
                    const {sign, abs} = prefixify(fullCharacter.savingThrows[ability])
                    return (
                        <div className="mono" style={{
                            display: "flex", 
                            alignItems: "center",
                        }}>
                            <span style={{
                                fontSize: "0.7em",
                            }}>{sign}</span>
                            <span>{abs}</span>
                            <span style={{
                                visibility: "hidden",
                                fontSize: "0.7em",
                            }}>{sign}</span>
                        </div>
                    )
                }}
                secondary={(ability) => {
                    const isProficient = fullCharacter.savingThrowProficiencyBonuses[ability] > 0;
                    return isProficient ? "Pro" : ""
                }}
            />
    )
}

export const AbilityScoresAndSaves = () => {
    const [fullCharacter, setCharacter] = useCharacter()

    return (
        <div style={{display: 'flex', gap: '2em 5em', flexWrap: 'wrap', WebkitUserSelect: "none", cursor: "default"}}>
            <AbilityScores/>

            <SavingThrows />
        </div>
    )
}