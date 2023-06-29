import React from 'react'

export default function copyright() {
  const style = {
    position: "fixed",
    bottom: 0,
    right: 0,
    backgroundColor: "#11012e",
    zIndex: 300,
    padding: "10px",
    borderRadius: "1rem 0 0 0",
    borderTop: "1px solid white",
    borderLeft: "1px solid white"
  }
  const link = {
    color: "white"
  }
  return (
    <div style={style}>
        <a title="Wesley Macedo Github" href="https://github.com/wesleymacedodev" target='_blank' rel='noreferrer' style={link}>Github</a>
    </div>
  )
}
