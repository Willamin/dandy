import React, { useContext } from "react"
import { CompendiumCard } from "./CompendiumCard"
import { CharacterContext } from ".."

export const Compendium = () => {
    const [character, setCharacter] = useContext(CharacterContext)

    return (
        <div>
            <h2 style={{ breakBefore: "page" }}>Compendium – Spells</h2>
            <div className="compendium-columns">
                {character.spells.map((name) => {
                    const spell = character.compendium.spells.find((s) => (s.name === name))
                    return (<CompendiumCard 
                        title={spell.name} 
                        content={spell.description}
                    />)
                })}
            </div>

            <h2 style={{ breakBefore: "page" }}>Compendium – Features</h2>
            <div className="compendium-columns">
                {character.descriptiveFeatures.map(({name, description}) => {
                    return (<CompendiumCard 
                        title={name} 
                        content={description}
                    />)
                })}
            </div>
        </div>
    )   
}