import React from "react";
import { CharacterContext } from "..";

export const CharacterName: React.FC<{style?: React.style}> = ({style}) => {
    const [character, setCharacter] = React.useContext(CharacterContext);

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
                {(()=>{
                    switch(namePreference) {
                    case "long": return longName;
                    case "short": return shortName;
                    default: return "error";
                    }
                })()}
            </h1>
        </div>
    )
}
