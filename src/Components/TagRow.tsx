import React from "react"

export const Tag: React.FC<{children: React.ReactChild, className?: string, inline?: boolean}> = ({ children, className, inline = false }) => (
    <div className={className} style={{
        display: "inline",
        border: "1px solid",
        borderColor: "var(--bd-primary)",
        borderRadius: "4px",
        padding: "0 4px",
        margin: inline ? "0px" : "4px 4px",
        lineHeight: inline ? "1em" : "1.2em",
        position: "relative",
        backgroundColor: "var(--bg-secondary)"
    }}>{children}</div>
)

export const TagRow: React.FC<{title: string, tags: React.ReactChild[], tagsClassName?: string}> = ({title, tags, tagsClassName}) => (
    <div style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
        lineHeight: "1.2em",
    }}>
        <span>{title}:</span>
        { (tags ?? []).length == 0 && (<Tag className={tagsClassName} key={"none"}>None</Tag>)}
        {[...(tags ?? [])].map(tag => (
            <Tag className={tagsClassName} key={tag}>{tag}</Tag>
        ))}
    </div>
)