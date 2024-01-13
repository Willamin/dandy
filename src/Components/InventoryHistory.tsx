import React, { useState } from "react"
import { BounceHistoryContext, CharacterContext } from "..";

export const InventoryHistory: React.FC<{style?: React.style}> = ({style}) => {
    const [bouncing, setBouncing] = React.useContext(BounceHistoryContext)
    const [character, setCharacter] = React.useContext(CharacterContext);
    const { inventoryHistory, sheetView } = character;
    const { currentInventory } = sheetView

    return (
        <div className={bouncing ? "bouncing" : ""} style={{
            padding: "4px 1em", 
            border: "1px solid", 
            borderRadius: "4px",
            borderColor: "var(--bd-primary)",
            position: 'relative', 
             ...style
        }}>
            <strong>Inventory History</strong>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, auto)",
                    gap: "0 1em",
                    alignItems: "baseline",
                    margin: "1em",
                    marginTop: "0em",
                    justifyContent: "flex-start",
                }}
            >

                { 
                    inventoryHistory
                    .map(({ comment }, index) => (
                        <React.Fragment key={index}>
                            <button
                                className="checkbox"
                                onClick={ () => { setCharacter({...character, sheetView: {...sheetView, currentInventory: index }}) }}
                            >
                                <div className={currentInventory === index ? "checkmark" : ""} />
                            </button>
                            <div key="comment">{comment}</div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}