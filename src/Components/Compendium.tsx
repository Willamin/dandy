import React from "react"
import { CompendiumCard } from "./CompendiumCard"
import { CharacterContext, useCharacter } from ".."

export const Compendium = () => {
    const [character, setCharacter] = useCharacter()
    
    return (
        <div>
            <h2 style={{ breakBefore: "page" }}>Compendium – Spells</h2>
            <div className="compendium-columns">
                {character.spells.map((name) => {
                    const spell = character.compendium.spells.find((s) => (s.name === name))
                    return (<CompendiumCard 
                        key={spell.name}
                        title={spell.name} 
                        content={spell.description}
                    />)
                })}
            </div>

            <h2 style={{ breakBefore: "page" }}>Compendium – Features</h2>
            <div className="compendium-columns">
                {character.descriptiveFeatures.map(({name, description}) => {
                    return (<CompendiumCard
                        key={name}
                        title={name} 
                        content={description}
                    />)
                })}
            </div>

            <h2 style={{ breakBefore: "page" }}>Compendium – Items</h2>
            <div className="compendium-columns">
                {character.currentItems.flatMap(({ name, description }) => (
                    description ? [(<CompendiumCard
                        key={name}
                        title={name} 
                        content={description}
                    />)] : []
                ))}
            </div>
        </div>
    )   
}