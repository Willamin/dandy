import * as React from "react";

import { CharacterContext } from "..";

import { prefixify, titleCase } from "../DataModel/CharacterSheet";
import { TagRow } from "./TagRow";

export const OtherStats: React.FC<{style?: React.style, className?: string}> = ({style, className}) => {
  const [character, setCharacter] = React.useContext(CharacterContext)

  const {
    initiative,
    walkingSpeed,
    hitPointMaximum,
    proficiencyBonus,
    hitDice,
    armorClass,
  } = character

  let hitDiceDescription = [
    hitDice.d4 > 0 ? [`${hitDice.d4}d4`] : [],
    hitDice.d6 > 0 ? [`${hitDice.d6}d6`] : [],
    hitDice.d8 > 0 ? [`${hitDice.d8}d8`] : [],
    hitDice.d10 > 0 ? [`${hitDice.d10}d10`] : [],
    hitDice.d12 > 0 ? [`${hitDice.d12}d12`] : [],
    hitDice.d20 > 0 ? [`${hitDice.d20}d20`] : [],
  ].flatMap(x=>(x))

  return (
    <div style={{flexShrink: 1, flexGrow: 0, ...style}} className={className ?? ""}>
      <TagRow title="Hit Point Maximum" tags={[hitPointMaximum]} tagsClassName="mono accent-color-yellow" />
      <TagRow title="Hit Dice" tags={hitDiceDescription} tagsClassName="mono"/>
      <TagRow title="Proficiency Bonus" tagsClassName="mono" tags={[prefixify(proficiencyBonus).combined]} />
      <TagRow title="Initiative" tagsClassName="mono accent-color-orange" tags={[prefixify(initiative).combined]} />
      <TagRow title="Walking Speed" tags={[(<><span className="mono">{walkingSpeed}</span> ft</>)]} />
      <TagRow title="Armor Class" tags={[(<><span className="mono">{armorClass}</span></>)]} />
    </div>
  )
}

const Proficiencies: React.FC<{style?: React.style}> = ({style}) => {
  const [character, setCharacter] = React.useContext(CharacterContext);
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
