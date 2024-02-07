import React, { useState } from "react"

export const Box = ({ children, title, titleOnHover, style = {}}) => {
    return <div className="box" style={style}>
        {title && <strong>{title} <span className="hover-show">{titleOnHover}</span></strong>}
        {children}
    </div>
}

export const GeneralList: React.FC<{style?: React.style}> = ({ 
    style, 
    title, 
    sortOptions = undefined,
    gridTemplateColumns,
    topChunk,
    data = [],
    columns = [],
    headers = [],
}) => {
    const [sortOrderIndex, realSetSortOrderIndex] = useState(0)
    const setSortOrderIndex = (newIndex) => {
        realSetSortOrderIndex(newIndex % sortOptions.length)
    }

    const sortName = sortOptions && sortOptions[sortOrderIndex].name || undefined
    const sortFun = sortOptions && sortOptions[sortOrderIndex].sort || (() => (0))

    return (
        <Box title={title} titleOnHover={`(sorted by ${sortName})`}>
            <div
                className="general-list"
                style={{
                    display: "grid",
                    gridTemplateColumns: gridTemplateColumns,
                    gap: "0 1em",
                    alignItems: "baseline",
                    margin: "1em",
                    marginTop: "0em",
                    ...style,
                }}
            >    
                {sortOptions && (
                <button
                    title="Cycle through sorting methods"
                    className="do-not-print"
                    style={{
                    color: 'var(--fg-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--bd-primary)',
                    borderRadius: '5px',
                    boxShadow: 'none',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    width: '20px',
                    height: '20px',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }} onClick={()=>{ 
                    setSortOrderIndex(sortOrderIndex + 1)
                }}>
                    <div>⇅</div>
                </button>
                )}

                {topChunk &&
                <div style={{
                    gridColumn: `span ${columns.length}`,
                    display: "grid",
                    textAlign: "center",
                    gridTemplateColumns: "repeat(auto-fill, minmax(0, 10em))",
                    gap: "0.5em",
                    margin: "0.5em 0",
                    justifyContent: "space-around",
                }}>
                    {topChunk}
                </div>
                }

                {
                    headers
                        .map((header, index) => {
                            if (typeof header === "string") {
                                return (
                                    <React.Fragment key={`header-${index}`}>
                                        <div style={{
                                            borderBottomWidth: "1px",
                                            borderBottomStyle: "solid",
                                            borderBottomColor: header === "" ? "transparent" : "var(--bd-primary)",
                                        }}>
                                            {header}
                                        </div>
                                    </React.Fragment>
                                )
                            } else {
                                return header
                            }
                        })
                }

                { 
                    data
                    .sort(sortFun)
                    .map((row, index) => (
                        <React.Fragment key={index}>
                            { columns.map(columnDef => {
                                if (typeof columnDef === "string") {
                                    return (<div key={columnDef}>{row[columnDef]}</div>)
                                } else {
                                    return (columnDef(row))
                                }
                            })}
                        </React.Fragment>
                    ))
                }
            </div>
        </Box>
    )
}