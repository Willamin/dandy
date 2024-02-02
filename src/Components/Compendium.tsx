import React from "react"
import { CompendiumCard } from "./CompendiumCard"
import { CharacterContext, useCharacter } from ".."
import { usePagesVisible } from "../Hooks/usePagesVisibile"

export const Compendium = () => {
    const [character, setCharacter] = useCharacter()
    const [pages, setVisiblePages] = usePagesVisible()
    
    return (
        <div>
            { pages.includes("spells") && (
            <>
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
            </>
            )}

            { pages.includes("features") && (
            <>
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
            </>
            )}

            { pages.includes("items") && (
            <>
                <h2 style={{ breakBefore: "page" }}>Compendium – Items</h2>
                <div className="compendium-columns">
                    {character.compendium.items.flatMap(({ name, description }) => (
                        description ? [(<CompendiumCard
                            key={name}
                            title={name} 
                            content={description}
                        />)] : []
                    ))}
                </div>
            </>
            )}
        </div>
    )   
}