import React, { useState } from "react"

export const Box = ({ children, title, titleOnHover }) => {
    return <div className="box">
        <strong>{title} <span className="hover-show">{titleOnHover}</span></strong>
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
                style={{
                    display: "grid",
                    gridTemplateColumns: gridTemplateColumns,
                    gap: "0 1em",
                    alignItems: "baseline",
                    margin: "1em",
                    marginTop: "0em",
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

                <div style={{
                    gridColumn: `span ${columns.length}`,
                    display: "grid",
                    textAlign: "center",
                    gridTemplateColumns: "repeat(auto-fill, minmax(0, 8em))",
                    gap: "0.5em",
                    margin: "0.5em 0",
                    justifyContent: "space-around",
                }}>
                    {topChunk}
                </div>

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