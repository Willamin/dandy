import React, { useState } from "react"
import { CornerButton } from "./Items"
import { DiceRollDescription } from "../DataModel/CharacterSheet"
import { useCharacter } from ".."

export const CompendiumCard: React.FC<{title: string, content: string, diceRolls?: DiceRollDescription[]}> = ({ title, content, diceRolls = [] }) => {
    const [character] = useCharacter()

    const body = content
        .replaceAll(/---\n/g, '<hr />')
        .replaceAll(/\n/g, '<br />')

    const [classes, setClasses] = useState("anchor")

    return (
        <div style={{breakInside: "avoid"}}>
            <div className={classes + " box"} id={"compendium-" + title.replace(" ", "-")} style={{
                display: "block",
                margin: "0 0 0 0",
                scrollMarginTop: "5em",
                breakInside: "avoid",
            }}>
                <b>{title}</b>
                <br/>
                <p 
                    dangerouslySetInnerHTML={{__html: body}}
                />
                { diceRolls.length > 0 && (
                <>
                    <hr />
                    <strong>Dice Rolls</strong>
                    <br/>
                    <em>using stats for <strong>{character.preferredName}</strong></em>
                    <table className="attacks" cellSpacing="0">
                        {(() => {
                            const allRollsPieces = diceRolls
                                .map((d) => (diceRollDefinitionToPieces(d, character)))

                            const maxLength = 
                                allRollsPieces
                                .map((p) => (p.length))
                                .reduce((acc, p) => (p > acc ? p : acc), 0)

                            return allRollsPieces
                            .map((pieces, index) => {
                                console.log(title, diceRolls[index].name, pieces)

                                return (<DiceRollView for={diceRolls[index].name} pieces={pieces} slots={maxLength} />)
                            })
                            .flatMap((elem, index) => (
                                index === 0 ? [elem] : [
                                    <tr style={{height: "5px"}}></tr>,
                                    elem,
                                ]
                            )) 
                        })()}
                    </table>
                </>
                )}

            </div>

            { /* stupid hack to force a "row gap" that doesn't widow itself at the top of the next column */ }
            <div style={{display: "inline-block", height: "1em", margin: 0, padding: 0}}></div>
        </div>
    )
}

export const diceRollDefinitionToPieces = ({
    d20, d12, d10, d8, d6, d4,
    strengthMod, dexterityMod, constitutionMod,
    intelligenceMod, wisdomMod, charismaMod,
    staticBonus,
    proficiencyBonus,
}, character) => (
    [
        writeDice("d20", d20), 
        writeDice("d12", d12),
        writeDice("d10", d10), 
        writeDice("d8", d8), 
        writeDice("d6", d6), 
        writeDice("d4", d4),
        writeMod("STR", character.abilityMods.strength, strengthMod), 
        writeMod("DEX", character.abilityMods.dexterity, dexterityMod), 
        writeMod("CON", character.abilityMods.constitution, constitutionMod), 
        writeMod("INT", character.abilityMods.intelligence, intelligenceMod), 
        writeMod("WIS", character.abilityMods.wisdom, wisdomMod), 
        writeMod("CHA", character.abilityMods.charisma, charismaMod),
        writeMod("BONUS", staticBonus, staticBonus != 0),
        writeMod("PRO", character.proficiencyBonus, proficiencyBonus),
    ]
    .filter(([left, right]) => (right !== null && right !== undefined))
)

export const writeDice = (size, count) => (
    [
        count > 0 ? `${count}${size}` : null,
        count > 0 ? `${count}${size}` : null,
    ]
)

export const writeMod = (stat, value, present) => (
    [
        present ? stat : null,
        present ? value : null,
    ]
)

export const DiceRollView = ({for: name, pieces, slots }) => {
    const characterString = 
        pieces
        .flatMap(([character, generic]) => (character === null ? [] : [character]))
        .join(" + ")

    const genericString = 
        pieces
        .flatMap(([character, generic]) => (generic === null ? [] : [generic]))
        .join(" + ")

    const extraSpacerCells = (2 * (slots - pieces.length)) > 0 && Array(2 * (slots - pieces.length)).fill(null).map(() => (<td></td>))

    const topSpacerCells = (2 * slots) > 0 && Array(2 * slots).fill(null).map(() => (<td></td>))

    return <>
        <tr style={{height: "5px"}}>{topSpacerCells}</tr>
        <tr>
            <td>{name}</td>
            { pieces.flatMap(([gen, char], index) => (
                char === null ? [] : [[gen,char]]
            )).flatMap(([gen, char], index) => (
                <>
                {index > 0 && <td>+</td>}
                <td>{char}</td>
                </>
            )) }


            { extraSpacerCells }
        </tr>
        <tr style={{fontSize: "0.7em"}}>
            <td></td>
            { pieces.flatMap(([gen, char], index) => (
                gen === null ? [] : [[gen, char]]
            )).flatMap(([gen, char], index) => (
                <>
                {index > 0 && <td></td>}
                {char != gen ? <td>{gen}</td> : <td></td>}
                </>
            )) }
            { extraSpacerCells }
        </tr>
        
    </>
}

const intersperse = (array, value) => (
    array.flatMap((element, index) => (
        index === 0 ? [element] : [value, element]
    ))
)