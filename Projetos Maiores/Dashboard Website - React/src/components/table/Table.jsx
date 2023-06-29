import React from 'react'
import style from './Table.module.css'

export default function Table({data}) {
  return (
    <div className={style.table_box} >
    <table className={style.table}>
        <thead className={style.thead}>
            <tr>
                {
                    data.header.map((value, index) => (
                        <th key={index}>{value}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                data.body.map((value,index) => (
                    <tr key={index}>
                        {value.map((value, index) => (
                          <td key={index}>{value}</td>  
                        ))}
                    </tr>
                ))
            }
        </tbody>
    </table>
    </div>
  )
}
