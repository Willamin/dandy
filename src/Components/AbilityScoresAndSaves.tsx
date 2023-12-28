import React, { useContext } from "react"

import { FullCharacter } from "../DataModel/transfigure"
import { CharacterContext } from ".."
import { StatWrapper } from "./StatBlock"
import { prefixify } from "../DataModel/CharacterSheet"

export const AbilityScores: React.FC<{style?: React.style}> = ({style}) => {
    const [fullCharacter, setCharacter] = useContext(CharacterContext)

    return (
        <StatWrapper style={style} title="Abilities"
                primary={(ability) => {
                    const {sign, abs} = prefixify(fullCharacter.abilityMods[ability])
                    return (
                        <div style={{
                            display: "flex", 
                            alignItems: "center",
                            fontFamily: "ui-monospace",
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
                secondary={(ability) => (
                    <span style={{fontFamily: "ui-monospace"}}>
                        {fullCharacter.finalAbilityScores[ability]} 
                    </span>
                )}
            />
    )
}

export const SavingThrows: React.FC<{style?: React.style}> = (style) => {
    const [fullCharacter, setCharacter] = useContext(CharacterContext)

    return (
        <StatWrapper style={style} title="Saving Throws"
                primary={(ability) => {
                    const {sign, abs} = prefixify(fullCharacter.savingThrows[ability])
                    return (
                        <div style={{
                            display: "flex", 
                            alignItems: "center",
                            fontFamily: "ui-monospace",
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
    const [fullCharacter, setCharacter] = useContext(CharacterContext)

    return (
        <div style={{display: 'flex', gap: '2em 5em', flexWrap: 'wrap', WebkitUserSelect: "none", cursor: "default"}}>
            <AbilityScores/>

            <SavingThrows />
        </div>
    )
}