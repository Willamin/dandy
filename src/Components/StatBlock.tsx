import React from 'react'
import { AbilityScoreOrder } from '../DataModel/CharacterSheet'

export const StatBlock: React.FC<{ name: string, primary: string | React.ReactChild, secondary: string }> = ({name, primary, secondary}) => (
    <div key={`row-${name}`} className="stat-block" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4px 1em",
        border: "1px solid",
        borderRadius: "4px",
        borderColor: "var(--bd-primary)",
        backgroundColor: "var(--bg-secondary)",
        cursor: "pointer",
    }}>
        <div style={{fontSize: "0.7em"}}>{name}</div>
        <div style={{fontSize: "1.3em"}}>{primary}</div>
        <div style={{fontSize: "0.7em"}}>{secondary}</div>
    </div>
)

export const StatWrapper = ({title, primary, secondary, style}) => (
    <div style={style}>
        <strong>{title}</strong>
        <div style={{
        display: "grid",
        textAlign: "center",
        gridTemplateColumns: "repeat(6, minmax(0, 4em))",
        gap: "0.5em",
        margin: "0.5em 0",
        }}>
        { AbilityScoreOrder.map(ability => {
            const shortname = ability.slice(0,3).toUpperCase()
            return (<StatBlock 
                key={ability}
                name={shortname} 
                primary={primary(ability)}
                secondary={secondary(ability)}
            />)
        })}</div>
    </div>
)