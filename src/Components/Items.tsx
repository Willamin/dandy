import React, { useState } from "react"
import { BounceHistoryContext, CharacterContext } from "..";
import { AbilityScoreOrder, SkillsToAbilities, prefixify, titleCase } from "../DataModel/CharacterSheet";

const MapAllKeys = (obj) => {
    return Object.keys(obj).map((k) => ([k, obj[k]]))
}

type ItemsSortOrder = "name" | "position"

export const Items: React.FC<{style?: React.style}> = ({style, className}) => {
    const [bouncing, setBouncing] = React.useContext(BounceHistoryContext);
    const [character, setCharacter] = React.useContext(CharacterContext);
    const { currentItems, sheetView } = character;
    const { currentInventory, inventoryHistoryVisible } = sheetView

    const [sortOrder, setSortOrder] = useState<ItemsSortOrder>("position");

    const toggleStatus = (index : number, status : "equipped" | "attuned") => {
        if (currentInventory != 0) {
            setBouncing(true)
            return
        }

        let firstSlice, lastSlice;
        switch (index) {
        case 0:
            firstSlice = [];
            lastSlice = currentItems.slice(index + 1, currentItems.length)
        case currentItems.length - 1:
            firstSlice = currentItems.slice(0, index)
            lastSlice = []
        default:
            firstSlice = currentItems.slice(0, index)
            lastSlice = currentItems.slice(index + 1, currentItems.length)
        }

        const newStatus = !currentItems[index][status]
        const itemWithNewStatus = { 
            ...currentItems[index],
            [status]: newStatus,
        }

        setCharacter({
            ...character,
            inventoryHistory: [
                {
                    comment: titleCase((newStatus ? "" : "un") + status) + ": " + itemWithNewStatus.name,
                    items: [
                        ...firstSlice,
                        itemWithNewStatus,
                        ...lastSlice,
                    ]
                },
                ...character.inventoryHistory,
            ]
        })
    }

    return (
        <div className={className} style={{
            padding: "4px 1em", 
            border: "1px solid", 
            borderRadius: "4px",
            borderColor: "var(--bd-primary)",
            position: 'relative', 
             ...style
        }}>
            <strong>Items <span className="hover-show">(sorted by {sortOrder})</span></strong>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, auto)",
                    gap: "5px",
                    alignItems: "first baseline",
                    margin: "1em",
                    marginTop: "0em",
                    justifyContent: "start",
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

                <button
                    title="Show History"
                    className="do-not-print"
                    style={{
                    color: 'var(--fg-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--bd-primary)',
                    borderRadius: '5px',
                    boxShadow: 'none',
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '20px',
                    height: '20px',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }} onClick={()=>{
                    setCharacter({
                        ...character,
                        sheetView: {
                            ...sheetView,
                            inventoryHistoryVisible: !inventoryHistoryVisible,
                        }
                    })
                }}>
                    <div>H</div>
                </button>

                {
                    currentItems
                    .map(( element, index ) => ({ element, index }))
                    .sort(({element: left}, {element: right}) => {
                        switch (sortOrder) {
                            case "position":
                                return 0
                            case "name":
                                if (left.name < right.name) { return -1 }
                                if (left.name > right.name) { return +1 }
                                return 0
                        }
                    })
                    .map(({ element: { name, equipped = null, attuned = null, quantity = 1, comment = null}, index }) => (
                        <React.Fragment key={name}>
                            <button
                                key="equipped"
                                className="checkbox"
                                disabled={ equipped == null }
                                onClick={ () => { toggleStatus(index, "equipped") }}
                            >
                                <div className={equipped ? "checkmark" : ""}>E</div>
                            </button>
                            <button
                                key="attuned" 
                                className="checkbox" 
                                disabled={ attuned == null } 
                                onClick={ () => { toggleStatus(index, "attuned") }}
                            >
                                <div className={attuned ? "checkmark" : ""}>A</div>
                            </button>
                            <div key="name" style={{
                                textIndent: "1em hanging each-line",
                                lineHeight: "15px",
                            }}>
                                {name}

                                { comment && (<br/>) }
                                { comment && (<small style={{ display: "inline-block", textIndent: "1em"}}>{comment}</small>) }
                            </div>
                        </React.Fragment>
                    ))
                }

                <div key="name-footer"></div>
                <div key="equipped-footer"></div>
                <div key="attuned-footer"></div>

            </div>
        </div>
    )
}