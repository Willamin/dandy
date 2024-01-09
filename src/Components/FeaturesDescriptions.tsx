import React, { useState } from "react"
import { CharacterContext } from "..";
import { AbilityScoreOrder, SkillsToAbilities, prefixify } from "../DataModel/CharacterSheet";

const MapAllKeys = (obj) => {
    return Object.keys(obj).map((k) => ([k, obj[k]]))
}

type SkillSortOrder = "name" | "position"

export const FeaturesDescriptions: React.FC<{style?: React.style}> = ({style}) => {
    const [character, setCharacter] = React.useContext(CharacterContext);
    const { descriptiveFeatures } = character;

    const [sortOrder, setSortOrder] = useState<SkillSortOrder>("position");

    return (
        <div style={{
            padding: "4px 1em", 
            border: "1px solid", 
            borderRadius: "4px",
            borderColor: "var(--bd-primary)",
            position: 'relative', 
             ...style
        }}>
            <strong>Features <span className="hover-show">(sorted by {sortOrder})</span></strong>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1, auto)",
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
                        case "name": setSortOrder("position"); break
                        case "position": setSortOrder("name"); break
                    }
                }}>
                    <div>⇅</div>
                </button>

                { 
                    descriptiveFeatures
                    .map((feature) => ({ name: feature.name }))
                    .sort((left, right) => {
                        switch (sortOrder) {
                            case "name":
                                if (left.name < right.name) { return -1 }
                                if (left.name > right.name) { return +1 }
                                return 0
                            case "position":
                                return 0
                        }
                    })
                    .map(({ name }) => (
                        <React.Fragment key={name}>
                            <div key="name">{name}</div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}