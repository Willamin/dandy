import React, { useState } from "react"
import { CharacterContext } from "..";
import { AbilityScoreOrder, SkillsToAbilities, prefixify } from "../DataModel/CharacterSheet";

const MapAllKeys = (obj) => {
    return Object.keys(obj).map((k) => ([k, obj[k]]))
}

type SkillSortOrder = "name" | "level"

export const Spells: React.FC<{style?: React.style}> = ({style}) => {
    const [character, setCharacter] = React.useContext(CharacterContext);
    const { spells, compendium } = character;

    const [sortOrder, setSortOrder] = useState<SkillSortOrder>("level");

    return (
        <div style={{
            padding: "4px 1em", 
            border: "1px solid", 
            borderRadius: "4px",
            borderColor: "var(--bd-primary)",
            position: 'relative', 
             ...style
        }}>
            <strong>Spells <span className="hover-show">(sorted by {sortOrder})</span></strong>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, auto)",
                    gap: "0 1em",
                    alignItems: "baseline",
                    margin: "1em",
                    marginTop: "0em",
                    
                }}
            >    
                <button
                    title="Cycle through sorting methods"
                    className="do-not-print"
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
                        case "name": setSortOrder("level"); break
                        case "level": setSortOrder("name"); break
                    }
                }}>
                    <div>⇅</div>
                </button>

                { 
                    spells
                    .map((name) => ({
                        ...compendium.spells.find((e) => (e.name === name)),
                        name
                    }))
                    .sort((left, right) => {
                        switch (sortOrder) {
                            case "name":
                                if (left.name < right.name) { return -1 }
                                if (left.name > right.name) { return +1 }
                                return 0
                            case "level":
                                if (left.level < right.level) { return -1 }
                                if (left.level > right.level) { return +1 }
                                return 0
                        }
                    })
                    .map(({ name, level }) => (
                        <React.Fragment key={name}>
                            <div key="name">{name}</div>
                            <div key="level">{
                                level === 0 ? "Cantrip" : `Level ${level}`
                            }</div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}