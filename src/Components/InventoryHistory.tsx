import React, { useState, useContext } from "react"
import { BounceHistoryContext, useCharacter } from "..";

export const InventoryHistory: React.FC<{style?: React.style}> = ({style}) => {
    const [bouncing, setBouncing] = useContext(BounceHistoryContext)
    const [character, setCharacter] = useCharacter()
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
                    gridTemplateColumns: "auto 1fr",
                    gap: "0 1em",
                    alignItems: "baseline",
                    margin: "1em",
                    marginTop: "0em",
                    justifyContent: "flex-start",
                }}
            >

                { 
                    inventoryHistory
                    .map(({ comment }, index) => {
                        if (comment === "---") {
                            return (<React.Fragment key={index}>
                               <div style={{display: "inline-block"}}></div><hr style={{display: "inline-block", margin: "1em 0"}}/>
                            </React.Fragment>)
                        } else {
                            return (<React.Fragment key={index}>
                                <button
                                    className="checkbox"
                                    style={{top: "3px"}}
                                    onClick={ () => { setCharacter({...character, sheetView: {...sheetView, currentInventory: index }}) }}
                                >
                                    <div className={currentInventory === index ? "checkmark" : ""} />
                                </button>
                                <div style={{display: "inline-block"}} key="comment">{comment}</div>
                            </React.Fragment>
                        )}
                    })
                }
            </div>
        </div>
    )
}