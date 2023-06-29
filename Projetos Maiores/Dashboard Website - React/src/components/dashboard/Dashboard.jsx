import React from 'react'
import BarChart from '../chart/Bar'
import AreaChart from '../chart/Area'
import PieChart from '../chart/Pie';
import GeoChart from '../chart/Geo';
import Table from '../table/Table'
import style from './Dashboard.module.css'
import Model from '../chart/Model'
import { data as tableData } from '../../data/tableData'
import { data as areaData } from '../../data/areaData'
import { data as barData } from '../../data/barData'
import { data as pieData } from '../../data/pieData'
import { data as geoData } from '../../data/geoData'

export default function Dashboard() {
  return (
    <>
    <h1 className={style.title}>Dashboard</h1>
    <div className={style.dashboards}> 
        <Model title="Estimativas" grid="1 / 1 / 2 / 2">
        <AreaChart data={areaData}/>
        </Model>
        <Model title="Número de Fornecedores" grid="1 / 2 / 2 / 3">
        <PieChart data={pieData} />
        </Model>
        <Model title="Performance do Ano" grid="2 / 1 / 3 / 3">
        <BarChart data={barData}/>
        </Model>
        <Model title="Desempenho Mundial" grid="3 / 1 / 4 / 3">
        <GeoChart data={geoData}/>
        </Model>
        <Model title="Tabela de Produtos" grid="4 / 1 / 5 / 3">
        <Table data={tableData}/>
        </Model>
    </div>
    </>
  )
}
