import React, { useState } from "react"
import { BounceHistoryContext, CharacterContext } from "..";
import { AbilityScoreOrder, SkillsToAbilities, prefixify, titleCase } from "../DataModel/CharacterSheet";
import { StatBlock } from "./StatBlock";

const MapAllKeys = (obj) => {
    return Object.keys(obj).map((k) => ([k, obj[k]]))
}

const FilterBoth = <T,>(array : T[], predicate: ((T) => [T[], T[]])) => {
    var matching = [];
    var notMatching = [];
    array.forEach(function(value) {
        if (predicate(value)) {
            matching.push(value);
        } else {
            notMatching.push(value);
        }
    });
    return [matching, notMatching];
}

export const Items: React.FC<{style?: React.style}> = ({style, className}) => {
    const [bouncing, setBouncing] = React.useContext(BounceHistoryContext);
    const [character, setCharacter] = React.useContext(CharacterContext);

    const { currentItems, sheetView } = character;
    const { currentInventory, inventoryHistoryVisible } = sheetView

    const indexedItems = currentItems.map((element, index) => ({ element, index }))
    const [currency, nonCurrency] = FilterBoth(indexedItems, ({element: {currency = false}}) => (currency))
    const others = nonCurrency

    const toggleStatus = (index : number, status : "equipped" | "attuned" | "contained") => {
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

        let newStatus = !currentItems[index][status]

        var containedValue = (() => {
            if ((status === "equipped") && (newStatus === true)) {
                return false
            } else {
                return currentItems[index].contained
            }
        })()

        if (status === "contained" && newStatus === true) {
            newStatus = window.prompt("what's it contained in?")
        }

        const itemWithNewStatus = { 
            ...currentItems[index],
            contained: containedValue,
            [status]: newStatus,
        }

        const newHistory = (() => {
            if (character.inventoryHistory[0].comment === "uncommitted changes") {
                return [
                    {
                        comment: "uncommitted changes",
                        items: [
                            ...firstSlice,
                            itemWithNewStatus,
                            ...lastSlice,
                        ]
                    },
                    ...character.inventoryHistory.slice(1),
                ]
            } else {
                return [
                    {
                        comment: "uncommitted changes",
                        items: [
                            ...firstSlice,
                            itemWithNewStatus,
                            ...lastSlice,
                        ]
                    },
                    ...character.inventoryHistory,
                ]
            }
        })()

        setCharacter({
            ...character,
            inventoryHistory: newHistory
        })
    }

    const commitHistory = () => {
        setCharacter({
            ...character,
            inventoryHistory: [
                {
                    ...character.inventoryHistory[0],
                    comment: window.prompt("commit name?")
                },
                ...character.inventoryHistory.slice(1),
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
            <strong>Items</strong>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto 1fr",
                    gap: "5px",
                    alignItems: "first baseline",
                    margin: "1em",
                    marginTop: "1em",
                    justifyContent: "start",
                }}
            > 
                <CornerButton
                    title="Show History"
                    glyph="H"
                    hoverGlyph="History"
                    onClick={()=>{
                        setCharacter({
                            ...character,
                            sheetView: {
                                ...sheetView,
                                inventoryHistoryVisible: !inventoryHistoryVisible,
                            }
                        })
                    }}
                />

                <CornerButton
                    title="Commit to History"
                    glyph="C"
                    hoverGlyph="Commit"
                    onClick={commitHistory}
                    top="15px"
                />

                <div style={{ 
                    gridColumn: "span 4", 
                    display: "grid", 
                    gap: "0.5em", 
                    gridTemplateColumns: "repeat(3, 1fr)" 
                }}>
                    {
                        currency.map(({ element: { name, quantity }}) => (
                            <StatBlock 
                                key={"currency" + name}
                                name={name}
                                primary={quantity}
                                secondary=""
                                style={{
                                    ...(
                                        (currency.length === 1)
                                        ? { gridColumn: "2" }
                                        : {}
                                    )
                                }}
                            />
                        ))
                    }
                </div>

                {
                    others
                        .map(({ element: { name, contained = false, equipped = null, attuned = null, quantity = 1, comment = null }, index }) => (
                            <React.Fragment key={"others" + name}>
                                <button
                                    key="attuned" 
                                    className="checkbox" 
                                    disabled={ attuned == null } 
                                    onClick={ () => { toggleStatus(index, "attuned") }}
                                >
                                    <div className={attuned ? "checkmark" : ""}>A</div>
                                    <div className="disablemark">╱</div>
                                </button>
                                <button
                                    key="equipped"
                                    className="checkbox"
                                    disabled={ equipped == null }
                                    onClick={ () => { toggleStatus(index, "equipped") }}
                                >
                                    <div className={equipped ? "checkmark" : ""}>E</div>
                                    <div className="disablemark">╱</div>
                                </button>
                                <button
                                    key="contained"
                                    className="checkbox"
                                    onClick={ () => { toggleStatus(index, "contained") }}
                                    disabled={ equipped == true } 
                                >
                                    <div className={contained ? "checkmark" : ""}>C</div>
                                    <div className="disablemark">╱</div>
                                </button>
                                <div key="name" style={{
                                    textIndent: "1em hanging each-line",
                                    lineHeight: "15px",
                                }}>
                                    {name}
                                    { quantity > 1 && (<br/>) }
                                    { quantity > 1 && (<small style={{ display: "inline-block", textIndent: "1em"}}>×{quantity}</small>) }

                                    { contained && (<br/>) }
                                    { contained && (
                                        <small style={{ 
                                            display: "inline-block", 
                                            textIndent: "1em", 
                                            fontStyle: "italic"
                                        }}>in <b>{contained}</b></small>) }

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

export const CornerButton = ({ title, glyph, hoverGlyph, onClick, top = "-10px", side = "left" }) => {
    const [hover, setHover] = useState(false)
    hoverGlyph = hoverGlyph ?? glyph
    return (
        <button
            title={title}
            className="do-not-print"
            style={{
            color: 'var(--fg-primary)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--bd-primary)',
            borderRadius: '5px',
            boxShadow: 'none',
            position: 'absolute',
            top: top,
            [side]: "-10px",
            minWidth: '20px',
            height: '20px',
            margin: 0,
            padding: "5px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: '10',
        }} onClick={onClick} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => setHover(false)}>
            <div>{hover ? hoverGlyph : glyph}</div>
        </button>
    )
}