import React from "react"

export const Inspector: React.FC<{style?: React.style}> = ({style}) => {

    return (
        <div className="do-not-print" style={{
            padding: "4px 1em", 
            border: "1px solid", 
            borderRadius: "4px",
            borderColor: "var(--bd-primary)",
            position: 'relative', 
            width: '400px',
             ...style
        }}>
            <strong>Inspector</strong>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1, auto)",
                    gap: "0 1em",
                    alignItems: "baseline",
                    margin: "1em",
                    marginTop: "0em",
                    
                }}
            >    
                <button style={{
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
                    alignItems: 'baseline',
                    cursor: 'pointer'
                }} onClick={()=>{  }}>
                    <div>×</div>
                </button>

                <div
                    style={{ whiteSpace: 'pre-line'}}
                    dangerouslySetInnerHTML={{__html: null || "Nothing selected"}}
                />
            </div>
        </div>
    )
}