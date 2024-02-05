import React, { useRef, useState } from 'react'
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
import { Attacks } from './Attacks'
import { usePagesVisible } from '../Hooks/usePagesVisibile'

export const App: React.FC = () => {
    const [character, saveCharacter] = useCharacter()
    const { 
        sheetView: { inventoryHistoryVisible, namePreference },
        descriptive: { longName, shortName },
        preferredName,
    } = character

    const [pages, setPages, togglePages, resetPages] = usePagesVisible()

    React.useEffect(() => {
        window.character = character
    }, [character])

    return (
        <div style={{ display: "block", justifyContent: "center" }}>
            <div style={{ }}>
                <Menu />
                <IfPresent value={character}>
                    { pages.includes("main") && (
                        <>
                        <CharacterName {preferredName} />

                        <div className="main-grid">
                            <div className="box">
                                <strong>Overview</strong>
                                <Description />
                                <Proficiencies />
                            </div>

                            <Attacks />
                            
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
                        </div>
                        </>
                    )}

                    { pages.includes("inventory") && (
                        <>
                            <h2 style={{ breakBefore: "page", pageBreakBefore: "always" }}
                                onClick={() => {
                                    if (pages.length === 1) {
                                        saveCharacter({
                                            ...character,
                                            sheetView: {
                                                ...character.sheetView,
                                                namePreference: (()=>{
                                                    switch (namePreference) {
                                                    case "long": return "short"
                                                    case "short": return "long"
                                                    default: return namePreference
                                                    }
                                                })()
                                            }
                                        })
                                    }
                                }}
                            >
                                {pages.length === 1 && (preferredName + " – ")}
                                Inventory
                            </h2>
                            <div style={{ marginTop: "1em", display: "grid", gap: "1em", gridTemplateColumns: "1fr 1fr" }}>
                                <Items />
                                { inventoryHistoryVisible && (<InventoryHistory />) }
                            </div>
                        </>
                    )}

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

    const [pages, setPages, togglePages, resetPages] = usePagesVisible()
    
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

                <button onClick={() => {
                    togglePages()
                }}>
                    Toggle Visible Pages
                </button>

                <button onClick={() => {
                    resetPages()
                }}>
                    Reset Visible Pages
                </button>
            </div>

            <div style={{display: "flex", justifyContent: "flex-end", gap: "1em"}}>
            </div>
        </div>
    )
}