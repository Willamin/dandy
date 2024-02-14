import React from "react"

export const Tag: React.FC<{children: React.ReactChild, className?: string, inline?: boolean, style?: object}> = ({ children, className, inline = false, style = {} }) => (
    <div className={"tag " + className} style={{
        display: "inline-block",
        border: "1px solid",
        borderRadius: "4px",
        padding: "0 4px",
        margin: inline ? "0px" : "4px 4px",
        lineHeight: inline ? "1em" : "1.2em",
        position: "relative",
        ...style
    }}>{children}</div>
)

export const TagRow: React.FC<{title: string, tags: React.ReactChild[], tagsClassName?: string, key?: string, classNameCallback?: (string)=>(string)}> = ({title = "", tags, style = {}, tagsClassName = "", classNameCallback = (tagName) => ("")}) => {
    return <div style={{
        display: "block",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
        lineHeight: "1.2em",
        textIndent: "1em hanging each-line",
        ...style,
    }}>
        { title != "" && <span>{title}:</span> }
        { (tags ?? []).length == 0 && (<Tag className={tagsClassName} key={"none"}>None</Tag>)}
        {[...(tags ?? [])].map(tag => {
            const extraClassNames = (() => {
                if (typeof tag === "string") {
                    return classNameCallback(tag)
                } else {
                    return ""
                }
            })()
            if (typeof tag == "object" && "render" in tag) {
                return tag.render
            } else {
                return <Tag className={tagsClassName + " " + extraClassNames} key={typeof tag == "object" ? tag.key ?? tag : tag}>{tag}</Tag>
            }
        })}
    </div>
}