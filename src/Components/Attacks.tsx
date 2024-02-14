import React, { useState } from "react"
import { Box, GeneralList } from "./GeneralList"
import { useCharacter } from ".."
import { StatBlock } from "./StatBlock"
import { AbilityScoreOrder, prefixify, titleCase } from "../DataModel/CharacterSheet"
import { Tag, TagRow } from "./TagRow"
import { useCompendiumJump } from "../Helpers/useCompendiumJump"

export const Attacks = () => {
    const [character, setCharacter] = useCharacter()
    
    const FullName = ({ 
        kind, 
        source, 
        name, 
        attackType = null,
        damageTypes = [], 
        reach = null, 
        range = null, 
        equipNeeded = false, 
        currentlyEquipped = false,
        attuneNeeded = false, 
        currentlyAttuned = false,
    }) => {
        const jump = useCompendiumJump(source)

        const tags = [
            titleCase(kind),
            attackType && titleCase(attackType), 
            reach && `Reach: ${reach}`,
            range && `Range: ${range}`,
            ...damageTypes.map(titleCase),
        ]
            .filter((x) => (x !== null))

        return <div
            onClick={jump}
            style={{
                display: "inline-block"
            }}
            className={
                ([...character.compendium.spells, ...character.currentItems].map((i) => (i.name)).includes(source))
                ? "pointer compendium-present"
                : ""
            }>
            <div style={{display: "inline-block"}}>{source}</div>
            <br />
            <TagRow tags={[
                {render: (<button
                    style={{ display: "inline-flex", marginInline: "2px", position: "relative", top: "-1px" }}
                    className="checkbox" 
                    disabled={ attuneNeeded == false } 
                    onClick={ (e) => { e.stopPropagation() /* toggleStatus(index, "attuned") */ }}
                >
                    <div className={currentlyAttuned ? "checkmark" : ""}>A</div>
                    <div className="disablemark">╱</div>
                </button>)},
                {render: (<button
                    style={{ display: "inline-flex", marginInline: "2px", position: "relative", top: "-1px" }}
                    className="checkbox" 
                    disabled={ equipNeeded == false } 
                    onClick={ (e) => { e.stopPropagation() /* toggleStatus(index, "attuned") */ }}
                >
                    <div className={currentlyEquipped ? "checkmark" : ""}>E</div>
                    <div className="disablemark">╱</div>
                </button>)},
                ...tags,
            ]} classNameCallback={(tagName) => {
                switch (tagName) {
                case "Weapon": return "red"
                case "Spell": return "violet"
                default: return ""
                }
            }} />
        </div>
    }

    return <GeneralList
        title="Attacks"
        data={character.attacks}
        gridTemplateColumns="1fr"
        headers={[""]}
        columns={[FullName]}
        style={{
            gap: "10px 0",
            alignItems: "first baseline",
        }}
    />
}

const Damage = ({ multiattack = 1, damage, name, from }) => {
    const [character, setCharacter] = useCharacter()

    if (damage === undefined) {
        return <span>N/A</span>
    }

    const dice = 
        [ "d4", "d6", "d8", "d10", "d12", "d20" ]
        .flatMap((d) => (
            (damage[d] === undefined) ? [] : (`${damage[d]}${d}`)
        ))

    const dicePart: Array<any> = 
        dice
            .map((d) => (<Tag key={`${from}-${d}`}>{d}</Tag>))
            .flatMap((element, index) => index == 0 ? [element] : ["+", element])

    const showDice = dicePart.length !== 0

    const showBonus = damage.bonus && damage.bonus !== 0
    const { sign: bonusSign, abs: bonusAbs } = prefixify(damage.bonus ?? 0)

    const compClass = character.compendium.classes.find(compendiumClass => (
        compendiumClass.name.toLowerCase() === name?.toLowerCase()
    ))

    const spellcastingAbility = compClass?.spellcastingAbility ?? null

    const mods = AbilityScoreOrder.reduce((acc, ability) => ([
        ...acc,
        {
            ...prefixify(
                character.abilityMods[ability] 
                * 
                Math.max(
                    ((damage.abilityModMultipliers ?? {})[ability] ?? 0),
                    (spellcastingAbility === ability 
                        ? ((damage.abilityModMultipliers ?? {}).spellcastingAbility ?? 0)
                        : 0
                    )
                )
            ),
            abilityName: ability,
        }
    ]), [])
        .filter((m) => (m.abs != 0))

    const formula = [ 
        dice.join("+"),
        bonusSign,
        bonusAbs,
        ...mods.flatMap((m) => ([m.sign, m.abs]))
    ].join("")

    const columns = 
        1 //
        + dicePart.length 
        + ((showDice || bonusSign != "+") && showBonus ? 1 : 0)
        + (showBonus ? 1 : 0)
        + (mods.length * 2)

    return <div style={{
        display: "grid", 
        gridTemplateColumns: `repeat(${columns}, auto)`, 
        justifyContent: "start", 
        alignItems: "baseline", 
        justifyItems: "center" ,
        paddingBottom: "4px",
        gap: "0 5px",
    }}
    >
        { multiattack == 1 ? <span key={`${from}-multi`}></span> : <span key={`${from}-multi`}>{multiattack}×</span>}
        { showDice && dicePart }
        
        { mods.map((m, index) => (
            <>
            {m.sign}
            <Tag key={`${from}-mods-abs-${index}`}>{m.abs}</Tag>
            </>
        )) }

        { (showDice || bonusSign != "+") && showBonus && bonusSign }
        { showBonus && <Tag key={`${from}-bonus-abs`}>{bonusAbs}</Tag> }


        <span></span>
        { Array(dice.length).fill(null).map((e, index) => (<small key={`${from}-dice-spacer-${index}`}></small>)) }

        { mods.map((m, index) => (
            <React.Fragment key={`${from}-abilty-mod-${m.abilityName}-${index}`}>
            <small></small>
            <small>{titleCase(m.abilityName)}</small>
            </React.Fragment>
        ))}

        { (showDice || bonusSign != "+") && showBonus && <small key={`${from}-bonus-spacer`}></small> }
        { showBonus && <small key={`${from}-bonus-label`}>Bonus</small> }
    </div>
}