import React, { useState } from "react"
import { CharacterContext } from "..";
import { AbilityScoreOrder, SkillsToAbilities, prefixify } from "../DataModel/CharacterSheet";

const MapAllKeys = (obj) => {
    return Object.keys(obj).map((k) => ([k, obj[k]]))
}

type SkillSortOrder = "name" | "ability-book" | "ability-score" | "skill-score"

export const Skills: React.FC<{style?: React.style}> = ({style}) => {
    const [character, setCharacter] = React.useContext(CharacterContext);
    const { skillMods, finalAbilityScores } = character;

    const [sortOrder, setSortOrder] = useState<SkillSortOrder>("name");

    return (
        <div style={{
            padding: "4px 1em", 
            border: "1px solid", 
            borderRadius: "4px",
            borderColor: "var(--bd-primary)",
            position: 'relative', 
             ...style
        }}>
            <strong>Skills <span className="hover-show">(sorted by {sortOrder})</span></strong>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, auto)",
                    gap: "0 1em",
                    alignItems: "baseline",
                    margin: "1em",
                    marginTop: "0em",
                    
                }}
            >    
                <button
                    title="Cycle through sorting methods"
                    style={{
                    color: 'var(--fg-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--bd-primary)',
                    borderRadius: '5px',
                    boxShadow: 'none',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    width: '20px',
                    height: '20px',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }} onClick={()=>{ 
                    switch (sortOrder) {
                        case "name": setSortOrder("ability-book"); break
                        case "ability-book": setSortOrder("ability-score"); break
                        case "ability-score": setSortOrder("skill-score"); break
                        case "skill-score": setSortOrder("name"); break
                    }
                }}>
                    <div>⇅</div>
                </button>

                { 
                    MapAllKeys(skillMods)
                    .map(([name, value]) => ({
                        skill: name,
                        mod: value,
                        ability: SkillsToAbilities[name]
                    }))
                    .sort((left, right) => {
                        switch (sortOrder) {
                            case "name":
                                if (left.skill < right.skill) { return -1 }
                                if (left.skill > right.skill) { return +1 }
                                return 0
                            case "ability-book":
                                const leftOrder = AbilityScoreOrder.indexOf(left.ability)
                                const rightOrder = AbilityScoreOrder.indexOf(right.ability)
                                if (leftOrder < rightOrder) { return -1 }
                                if (leftOrder > rightOrder) { return +1 }
                                return 0
                            case "ability-score":
                                const leftLevel = finalAbilityScores[left.ability]
                                const rightLevel = finalAbilityScores[right.ability]
                                if (leftLevel > rightLevel) { return -1 }
                                if (leftLevel < rightLevel) { return +1 }
                                return 0
                            case "skill-score":
                                if (left.mod > right.mod) { return -1 }
                                if (left.mod < right.mod) { return +1 }
                                return 0
                        }
                    })
                    .map(({skill, mod, ability}) => (
                        <React.Fragment key={skill}>
                            <div key="name">{skill.slice(0,1).toUpperCase() + skill.slice(1,skill.length)}</div>
                            <div key="ability" style={{
                                textAlign: 'center'
                            }}>
                                {ability.slice(0, 3).toUpperCase()}
                            </div>
                            <div key="value" style={{
                                fontVariantNumeric: "tabular-nums",
                                textAlign: "right"
                            }}>
                                {prefixify(mod).combined}
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}