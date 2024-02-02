import React, { useState, useContext } from "react"
import { BounceHistoryContext, useCharacter } from "..";
import { CornerButton } from "./Items";

export const InventoryHistory: React.FC<{style?: React.style}> = ({style}) => {
    const [bouncing, setBouncing] = useContext(BounceHistoryContext)
    const [character, setCharacter] = useCharacter()
    const { inventoryHistory, sheetView } = character;
    const { currentInventory } = sheetView

    const [sortOrder, setSortOrder] = useState<"asc"|"desc">("asc")

    return (
        <div className={(bouncing ? "bouncing" : "" + " box no-box-border-on-print")} style={{ 
            position: 'relative', 
             ...style
        }}>
            <strong>Inventory History ({sortOrder})</strong>
            <div
                className="inventory-history"
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

                <CornerButton
                    title="Toggle Order"
                    glyph="⇅"
                    hoverGlyph={null}
                    onClick={() => {
                        switch (sortOrder) {
                        case "asc": setSortOrder("desc"); break
                        case "desc": setSortOrder("asc"); break
                        default: console.error(`can't toggle order from '${sortOrder}'`)
                        }
                    }}
                />

                { 
                    inventoryHistory
                        .map((element, index) => ({ element, index }))
                        .reduce((accumulator, value) => {
                            switch (sortOrder) {
                                case "asc": return [...accumulator, value]
                                case "desc": return [value, ...accumulator]
                                default: return accumulator
                            }
                        }, [])
                    .map(({ element: { comment }, index }) => {
                        if (comment === "---") {
                            return (<React.Fragment key={index}>
                               <div className="do-not-print" style={{display: "inline-block"}}></div><hr style={{display: "inline-block", margin: "1em 0"}}/>
                            </React.Fragment>)
                        } else {
                            return (<React.Fragment key={index}>
                                <button
                                    className="checkbox do-not-print"
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