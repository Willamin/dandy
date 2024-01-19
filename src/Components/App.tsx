import React, { useRef } from 'react'
import { AbilityScores, SavingThrows, StatBlockMod } from './AbilityScoresAndSaves'
import { CharacterName } from './CharacterName'
import Proficiencies, { OtherStats } from './Proficiencies'
import { Description } from './Description'
import { CharacterContext, useCharacter } from '..'
import JSON5 from 'json5'
import { shrinkToSheet } from '../DataModel/CharacterSheet'
import { Skills } from './Skills'
import { Spells } from './Spells'
import { Items } from './Items'
import { FeaturesDescriptions } from './FeaturesDescriptions'
import { Compendium } from './Compendium'
import { InventoryHistory } from './InventoryHistory'
import { StatBlock } from './StatBlock'
import { GeneralList } from './GeneralList'

export const App: React.FC = () => {
    const [character, saveCharacter] = useCharacter()
    const { sheetView: { inventoryHistoryVisible } } = character

    React.useEffect(() => {
        window.character = character
    }, [character])

    return (
        <div style={{ display: "block", justifyContent: "center" }}>
            <div style={{ }}>
                <Menu />
                <IfPresent value={character}>
                    <CharacterName />

                    <div className="main-grid">
                        <div className="box">
                            <Description />
                            <Proficiencies />
                        </div>
                        
                        <div className="box">
                            <strong>Stats</strong>
                            <OtherStats />
                            <hr style={{margin: "1em 0"}}/>
                            <AbilityScores />
                            <hr style={{margin: "1em 0"}}/>
                            <SavingThrows />
                        </div>
                        
                        

                        <Skills />
                        <Spells />
                        <FeaturesDescriptions />
                        <Items />
                        { inventoryHistoryVisible && (<InventoryHistory />) }
                    </div>

                    <Compendium />

                    <div className="do-not-print" style={{height: "80vh"}}></div>
                </IfPresent>
                <IfNotPresent value={character}>
                    <p>No character sheet loaded. Use the load button above.</p>
                </IfNotPresent>
            </div>
        </div>
    )
}

const Row: React.FC<{children: React.ReactChild, style: React.style}> = ({children, style}) => (
    <div style={{...style, display: "flex", flexDirection: "row"}}>{children}</div>
)

const Column: React.FC<{children: React.ReactChild, style: React.style}> = ({children, style}) => (
    <div style={{...style, display: "flex", flexDirection: "column"}}>{children}</div>
)

const Grid: React.FC<{children: React.ReactChild, style: React.style, className: string}> = ({children, style, className}) => (
    <div style={{
        ...style, 
        display: "grid",
    }} className={className ?? ""}>{children}</div>
)

const IfPresent: React.FC<{value: any, children: React.ReactChild}> = ({value, children}) => (
    (!!value && children)
)

const IfNotPresent: React.FC<{value: any, children: React.ReactChild}> = ({value, children}) => (
    (!value && children)
)

const Menu = () => {
    const [character, saveCharacter] = useCharacter()

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
            saveCharacter(shrinkToSheet(JSON5.parse(reader.result)))
        }
    }

    const filePickerRef = useRef()
    const downloadRef = useRef()  
    
    return (
        <div className="do-not-print" style={{display: "flex", justifyContent: 'space-between'}}>
            <div style={{display: "flex", justifyContent: "flex-start", gap: "1em"}}>
                <input 
                    ref={filePickerRef} 
                    type="file"
                    onChange={handleFileChange} 
                    style={{display: "none"}}
                />
                
                <button onClick={() => {
                    filePickerRef.current.click()
                }}>Load Sheet</button>

                <button
                    onClick={() => {
                        saveCharacter(null)
                    }}
                    disabled={character == null}
                >Remove Character</button>

                <button
                    onClick={() => {
                        const fileName = "my-character.json";
                        const fileContent = JSON5.stringify(shrinkToSheet(character))
                        const myFile = new Blob([fileContent], {type: 'text/plain'});

                        const download = downloadRef.current
                        download.setAttribute("href", window.URL.createObjectURL(myFile))
                        download.setAttribute("download", fileName)

                        download.click()
                    }}
                    disabled={character == null}
                >Save Sheet</button>
                <a ref={downloadRef} id="download" style={{display: "none"}}></a>

                <button onClick={() => {
                    window.open(window.location, "", "menubar=no, location=no")
                }}>
                    Open in Popup Window
                </button>
            </div>

            <div style={{display: "flex", justifyContent: "flex-end", gap: "1em"}}>
            </div>
        </div>
    )
}