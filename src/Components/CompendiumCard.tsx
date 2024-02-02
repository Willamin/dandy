import React, { useState } from "react"
import { CornerButton } from "./Items"

export const CompendiumCard: React.FC<{title: string, content: string}> = ({ title, content }) => {
    const body = content
        .replaceAll(/---\n/g, '<hr />')
        .replaceAll(/\n/g, '<br />')

    const [classes, setClasses] = useState("anchor")

    return (
        <div style={{breakInside: "avoid"}}>
            <div className={classes + " box"} id={"compendium-" + title.replace(" ", "-")} style={{
                display: "block",
                margin: "0 0 0 0",
                scrollMarginTop: "5em",
                breakInside: "avoid",
            }}>
                <b>{title}</b>
                <br/>
                <p 
                    dangerouslySetInnerHTML={{__html: body}}
                />
            </div>

            { /* stupid hack to force a "row gap" that doesn't widow itself at the top of the next column */ }
            <div style={{display: "inline-block", height: "1em", margin: 0, padding: 0}}></div>
        </div>
    )
}