import React from 'react'

export default function button({title, color, hover, border, icon, bgcolor, description}) {
    
    const buttonStyle = {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: bgcolor,
        color: color,
        hover: hover,
        border: `solid 1px ${border}`,
        padding: "5px 15px",
        fontSize: ".7rem",
        cursor: "pointer",
    };

    const buttonTextStyle = {
        display: "flex",
        flexDirection: "column"
    }

    return (
    <button style={buttonStyle}>
        {icon}
        <div style={buttonTextStyle}>
        <span style={{color: "var(--secondary-text-color)"}}>
        {title}
        </span>
        {description}
        </div>
    </button>
  )
}
