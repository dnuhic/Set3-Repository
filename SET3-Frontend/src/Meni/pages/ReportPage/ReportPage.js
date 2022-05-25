import React, {PureComponent, useEffect} from 'react';
import './ReportPage.css';

import {
    LineChart,
    AreaChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ScatterChart,
    Area, Scatter, ZAxis, Bar
} from 'recharts';
import {BarChart} from "@material-ui/icons";

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const data01 = [
    {
        "x": 100,
        "y": 200,
        "z": 200
    },
    {
        "x": 120,
        "y": 100,
        "z": 260
    },
    {
        "x": 170,
        "y": 300,
        "z": 400
    },
    {
        "x": 140,
        "y": 250,
        "z": 280
    },
    {
        "x": 150,
        "y": 400,
        "z": 500
    },
    {
        "x": 110,
        "y": 280,
        "z": 200
    }
];
const data02 = [
    {
        "x": 200,
        "y": 260,
        "z": 240
    },
    {
        "x": 240,
        "y": 290,
        "z": 220
    },
    {
        "x": 190,
        "y": 290,
        "z": 250
    },
    {
        "x": 198,
        "y": 250,
        "z": 210
    },
    {
        "x": 180,
        "y": 280,
        "z": 260
    },
    {
        "x": 210,
        "y": 220,
        "z": 230
    }
];
const data03 = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300
    }
]

const ReportPage = () => {
    return(
        <div className="page-report-container">
            <div className="grid-layout">
                <div className="grid-layout__item">
                    <div className="chart-container">
                        <div className="chart-layout">
                            <h2 className="chart-label">Scatter chart</h2>
                            <ScatterChart width={640} height={400}
                                          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" name="stature" unit="cm" />
                                <YAxis dataKey="y" name="weight" unit="kg" />
                                <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter name="A school" data={data01} fill="#8884d8" />
                                <Scatter name="B school" data={data02} fill="#82ca9d" />
                            </ScatterChart>

                        </div>
                    </div>
                </div>
                <div className="grid-layout__item">
                    <div className="chart-container">
                        <div className="chart-layout">
                            <h2 className="chart-label">Area Chart</h2>
                            <AreaChart width={600} height={400} data={data}
                                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                            </AreaChart>
                        </div>
                    </div>
                </div>
                <div className="grid-layout__item">
                    <div className="chart-container">
                        <div className="chart-layout">
                            <h2 className="chart-label">Scatter chart</h2>
                            <ScatterChart width={640} height={400}
                                          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" name="stature" unit="cm" />
                                <YAxis dataKey="y" name="weight" unit="kg" />
                                <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter name="A school" data={data01} fill="#8884d8" />
                                <Scatter name="B school" data={data02} fill="#82ca9d" />
                            </ScatterChart>

                        </div>
                    </div>
                </div>
                <div className="grid-layout__item">
                    <div className="chart-container">
                        <div className="chart-layout">
                            <h2 className="chart-label">Area Chart</h2>
                            <AreaChart width={600} height={400} data={data}
                                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                            </AreaChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportPage;