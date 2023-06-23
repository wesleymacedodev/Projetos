import React, { useState } from 'react'
import style from './Dropdown.module.css'
import {FaChevronDown, FaChevronUp} from 'react-icons/fa'

export default function Dropdown({title, description}) {
  
    const [open, setOpen] = useState(false);

    return (
        <>
    { open
        ? <div className={style.dropdown} onClick={()=> {setOpen(!open)}}>
            <div className={style.header}>
                <span className={style.title}>
                    {title}
                </span>
                <FaChevronUp className={style.icon}/>
                </div>
            <p className={style.description}>{description}</p>
        </div>
        : 
        <div className={style.dropdown} onClick={()=> {setOpen(!open)}}>
           <div className={style.header}>
            <span className={style.title}>
                {title}
            </span>
            <FaChevronDown className={style.icon}/>
            </div>
        </div>
    }
    </>
  )
}
