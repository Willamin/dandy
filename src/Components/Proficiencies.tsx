import * as React from "react";

import { useCharacter } from "..";

import { prefixify, titleCase } from "../DataModel/CharacterSheet";
import { TagRow } from "./TagRow";
import { StatBlock } from "./StatBlock";
import { StatBlockMod } from "./AbilityScoresAndSaves";

export const OtherStats: React.FC<{style?: React.style, className?: string}> = ({style, className}) => {
  const [character, setCharacter] = useCharacter()

  const {
    initiative,
    walkingSpeed,
    hitPointMaximum,
    proficiencyBonus,
    hitDice,
    armorClass,
    spellMod,
    spellSaveDC,
  } = character

  let hitDiceDescription = [
    [...Array(hitDice.d4)].map(() => ("d4")),
    [...Array(hitDice.d6)].map(() => ("d6")),
    [...Array(hitDice.d8)].map(() => ("d8")),
    [...Array(hitDice.d10)].map(() => ("d10")),
    [...Array(hitDice.d12)].map(() => ("d12")),
    [...Array(hitDice.d20)].map(() => ("d20")),
  ]
  .flatMap((x) => (x))
  .map((x, i)=>((<React.Fragment key={i}>{x}</React.Fragment>)))

  return (
    <div style={{flexShrink: 1, flexGrow: 0, ...style}} className={className ?? ""}>
      <div style={{
          display: "grid",
          textAlign: "center",
          gridTemplateColumns: "repeat(auto-fill, minmax(0, 6em))",
          gap: "0.5em",
          margin: "0.5em 0",
      }}>
          <StatBlock
              name="Max HP"
              primary={hitPointMaximum}
              secondary=""
          />
          <StatBlock
              name="Armor"
              primary={armorClass}
              secondary="Class"
          />
          <StatBlock
              name="Initiative"
              primary={StatBlockMod(initiative)}
              secondary=""
          />
          <StatBlock
              name="Proficiency"
              primary={StatBlockMod(proficiencyBonus)}
              secondary="Bonus"
          />
          <StatBlock
              name="Walking"
              primary={(<><span className="mono">{walkingSpeed}</span> ft</>)}
              secondary="Speed"
          />

<StatBlock
              name="Perception"
              primary={10 + character.skillMods.perception}
              secondary="Passive"
          />

<StatBlock
              name="Investigation"
              primary={10 + character.skillMods.investigation}
              secondary="Passive"
          />

<StatBlock
              name="Insight"
              primary={10 + character.skillMods.insight}
              secondary="Passive"
          />
      </div>

      <TagRow title="Hit Dice" tags={hitDiceDescription} tagsClassName="mono"/>

    </div>
  )
}

const Proficiencies: React.FC<{style?: React.style}> = ({style}) => {
  const [character, setCharacter] = useCharacter();
  const {
    languages,
    toolProficiencies,
    weaponProficiencies,
    armorProficiencies,
  } = character

  return (
    <div style={{flexShrink: 1, flexGrow: 0, ...style}}>
      <TagRow title="Languages Known" tags={languages} />
      <TagRow title="Tool Proficiencies" tags={toolProficiencies} />
      <TagRow title="Weapon Proficiencies" tags={weaponProficiencies.map(titleCase)} />
      <TagRow title="Armor Proficiencies" tags={armorProficiencies.map(titleCase)} />
    </div>
  )
}

export default Proficiencies;
