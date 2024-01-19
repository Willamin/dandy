import React from "react"
import { useCharacter } from "..";
import { GeneralList } from "./GeneralList";
import { makeSortFun } from "./Spells";
import { useCompendiumJump } from "../Helpers/useCompendiumJump";

export const FeaturesDescriptions = () => {
    const [character, setCharacter] = useCharacter()
    const { descriptiveFeatures } = character

    const DescriptionInList = ({ name }) => {
        const doJump = useCompendiumJump(name)
        return <div key="name"
            onClick={doJump}
            className="pointer compendium-present"
        >{name}</div>
    }

    return <GeneralList
        title="Features"
        data={ descriptiveFeatures.map((feat, index) => ({ ...feat, index })) }
        sortOptions={[
            { name: "position", sort: makeSortFun("index") },
            { name: "name", sort: makeSortFun("name") },
        ]}
        columns={[ DescriptionInList ]}
        gridTemplateColumns="1fr"
    />
}