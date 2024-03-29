import React from "react"
import { useCharacter } from "..";
import { AbilityScoreOrder, SkillsToAbilities, prefixify, titleCase } from "../DataModel/CharacterSheet";
import { GeneralList } from "./GeneralList";
import { makeSortFun } from "./Spells";

const MapAllKeys = (obj) => {
    return Object.keys(obj).map((k) => ([k, obj[k]]))
}

export const Skills = () => {
    const [character, setCharacter] = useCharacter()
    const { skillMods, finalAbilityScores, skillProficiencyBonuses } = character
    const skillsInfo = MapAllKeys(skillMods)
    .map(([name, value]) => ({
        skill: name,
        mod: value,
        ability: SkillsToAbilities[name],
        prof: skillProficiencyBonuses[name] ?? 0
    }))

    const SkillCell = ({ skill }) => (<div key="name">{titleCase(skill)}</div>)
    const AbilityCell = ({ ability }) => (<div key="ability" style={{textAlign: 'center' }}>{ability.slice(0, 3).toUpperCase()}</div>)
    const ModCell = ({mod}) => (<div key="value" style={{fontVariantNumeric: "tabular-nums", textAlign: "right"}}>{prefixify(mod).combined}</div>)
    const ProfCell = ({prof}) => (<div key="prof">{(() => {
        switch (prof) {
            case 0: return ""
            case 0.5: return "half proficient"
            case 1: return "proficient"
            case 2: return "expertise"
        }
    })()}</div>)

    return <GeneralList
        title="Skills"
        data={skillsInfo}
        sortOptions={[
            { name: "name", sort: makeSortFun("skill") },
            { name: "skill mod", sort: makeSortFun("mod", "desc") },
            { name: "ability book order", sort: (left, right) => {
                const leftOrder = AbilityScoreOrder.indexOf(left.ability)
                const rightOrder = AbilityScoreOrder.indexOf(right.ability)
                if (leftOrder < rightOrder) { return -1 }
                if (leftOrder > rightOrder) { return +1 }
                return 0
            } },
            { name: "ability score", sort: (left, right) => {
                const leftLevel = finalAbilityScores[left.ability]
                const rightLevel = finalAbilityScores[right.ability]
                if (leftLevel > rightLevel) { return -1 }
                if (leftLevel < rightLevel) { return +1 }
                return 0
            }},
        ]}
        columns={[ AbilityCell, SkillCell, ModCell, ProfCell ]}
        gridTemplateColumns="auto auto auto 1fr"
    />
}