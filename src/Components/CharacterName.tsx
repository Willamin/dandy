import React from "react";
import { CharacterContext, useCharacter } from "..";

export const CharacterName: React.FC<{style?: React.style, preferredName: string}> = ({style, preferredName}) => {
    const [character, setCharacter] = useCharacter();

    const { descriptive: { longName, shortName }, sheetView: { namePreference } } = character;

    return (
        <div style={{display: "flex", justifyContent: "space-between", gap: "2em", flex: "0 0 1", WebkitUserSelect: "none", ...style}}>
            <h1 style={{cursor: "pointer", flexGrow: "1"}} onClick= {()=>{
                setCharacter({
                    ...character,
                    sheetView: {
                        ...character.sheetView,
                        namePreference: (()=>{
                            switch (namePreference) {
                            case "long": return "short"
                            case "short": return "long"
                            default: return namePreference
                            }
                        })()
                    }
                })
            }}>
                {preferredName}
            </h1>
        </div>
    )
}
