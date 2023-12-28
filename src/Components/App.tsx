import React, { useRef, useContext } from 'react'
import { AbilityScores, AbilityScoresAndSaves, SavingThrows } from './AbilityScoresAndSaves'
import { CharacterName } from './CharacterName'
import Proficiencies from './Proficiencies'
import { Description } from './Description'
import { CharacterContext } from '..'
import JSON5 from 'json5'
import { shrinkToSheet } from '../DataModel/CharacterSheet'

export const App: React.FC = () => {
    const [character, saveCharacter] = useContext(CharacterContext)
    return (
        <div style={{ display: "flex", justifyContent: "center"}}>
            <div style={{maxWidth: "1200px"}}>
                <Menu />
                <IfPresent value={character}>
                    <CharacterName />

                    <Grid style={{
                        gridTemplateColumns: "repeat(2, 1fr)",
                        rowGap: "1em",
                        columnGap: "6em",
                    }}>
                        <Description style={{ gridRow: "1", gridColumn: "1" }} />
                        <AbilityScores style={{ gridRow: "2", gridColumn: "1" }} />
                        <SavingThrows style={{ gridRow: "3", gridColumn: "1" }} />
                        <Proficiencies style={{ gridRow: "1 / 4", gridColumn: "2" }} />

                    </Grid>
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

const Grid: React.FC<{children: React.ReactChild, style: React.style}> = ({children, style}) => (
    <div style={{
        ...style, 
        display: "grid",
    }}>{children}</div>
)

const IfPresent: React.FC<{value: any, children: React.ReactChild}> = ({value, children}) => (
    (!!value && children)
)

const IfNotPresent: React.FC<{value: any, children: React.ReactChild}> = ({value, children}) => (
    (!value && children)
)

const Menu = () => {
    const [character, saveCharacter] = useContext(CharacterContext)

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
        <div className="do-not-print" style={{display: "flex", justifyContent: 'flex-start'}}>
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
        </div>
    )
}