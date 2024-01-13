
import React from "react"
import { CharacterContext } from "..";
import { Tag } from "./TagRow";
import { aan } from "../Helpers/aan";

export const Description: React.FC<{style?: React.style, className?: string}> = ({style, className}) => {
    const [character, saveCharacter] = React.useContext(CharacterContext);
    const {
        levels,
        sheetView: { currentLevel },
        species: { name: species },
        background: { name: background, characteristics },
        descriptive: { alignment },
        classes,
    } = character;

    const adjustLevel = (byAmount) => {
        let newLevel = currentLevel + byAmount

        if (newLevel > levels.length) {
            newLevel = 1
        } else if (newLevel < 1) {
            newLevel = levels.length
        }

        saveCharacter({
            ...character,
            sheetView: {
                ...character.sheetView,
                currentLevel: newLevel,
            }
        })
    }

    const LevelAdjuster = () => {
        return (<span 
            onClick={()=>{adjustLevel(+1)}}
            onContextMenu={()=>{adjustLevel(-1)}}
            className="pointer mono"
            style={{
                WebkitUserSelect: "none"
            }}
        ><Tag inline>{currentLevel}</Tag></span>)
    }

return (
    <div style={{flexShrink: 1, flexGrow: 0, ...style}} className={className ?? ""}>
        A level 
        {' '}
        <LevelAdjuster />
        {' '}
        <em>{alignment}</em>
        {' '}
        <em>{classes.join("-")}</em>
        {' '}
        <em>{species}</em>
        {' '}
        with {aan(background)}
        {' '}
        <em>{background}</em> background.
    <ul style={{marginBlockStart: 0, paddingInlineStart: "2em"}}>
        {
        [
            ...characteristics.personality,
            ...characteristics.ideals,
            ...characteristics.bonds,
            ...characteristics.flaws,
        ].map(c => (<li key={c}>{c}</li>))
        }
    </ul>
    </div>
)
}