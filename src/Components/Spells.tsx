import React from "react"
import { CharacterContext, useCharacter } from "..";

import { StatBlock } from "./StatBlock";
import { StatBlockMod } from "./AbilityScoresAndSaves";
import { GeneralList } from "./GeneralList";
import { useCompendiumJump } from "../Helpers/useCompendiumJump";

export const makeSortFun = (key, direction = "asc") => {
    const multiplier: number = (() => {
        switch (direction) {
        case "asc": return +1
        case "desc": return -1
        default: return 0
        }
    })()

    return ((left, right) => {
        if (left[key] < right[key]) { return -1 * multiplier }
        if (left[key] > right[key]) { return +1 * multiplier }
        return 0
    })
}

export const Spells: React.FC = () => {
    const [character, setCharacter] = useCharacter()
    const { spells, compendium, spellMod, spellSaveDC } = character;

    const topChunk = (
        <>
            <StatBlock
                name="Spell Attack"
                primary={StatBlockMod(character.spellMod)}
                secondary=""
            />
            <StatBlock
                name="Spell Save DC"
                primary={character.spellSaveDC}
                secondary=""
            />
        </>
    )

    const SpellNameInList = ({ name }) => {
        const doJump = useCompendiumJump(name)

        return <div key="name"
            onClick={doJump}
            className={
                (character.compendium.spells.map((i) => (i.name)).includes(name))
                ? "pointer compendium-present"
                : ""
            }
        >{name}</div>
    }

    const SpellLevelInList = ({ level }) => (<div key="level">{level === 0 ? "Cantrip" : `Level ${level}`}</div>)

    return <GeneralList
            title="Spells" 
            topChunk={topChunk}
            data={ character.fullSpells }
            sortOptions={[
                { name: "level", sort: makeSortFun("level") },
                { name: "name", sort: makeSortFun("name") },
            ]}
            columns={[ SpellNameInList, SpellLevelInList ]}   
            gridTemplateColumns="1fr auto"
    />
}