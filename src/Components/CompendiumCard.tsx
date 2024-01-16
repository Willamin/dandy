import React, { useState } from "react"
import { CornerButton } from "./Items"

export const CompendiumCard: React.FC<{title: string, content: string}> = ({ title, content }) => {
    const body = content
        .replaceAll(/---\n/g, '<hr />')
        .replaceAll(/\n/g, '<br />')

    const [classes, setClasses] = useState("anchor")

    return (
        <div className={classes} id={"compendium-" + title.replace(" ", "-")} style={{
            border: "1px solid var(--bd-primary)",
            borderRadius: "5px",
            padding: "5px 10px",
            display: "inline-block",
            marginTop: "1em",
            scrollMarginTop: "5em",
        }}>
            <b>{title}</b>
            <br/>
            <p 
                dangerouslySetInnerHTML={{__html: body}}
            />
        </div>
    )
}