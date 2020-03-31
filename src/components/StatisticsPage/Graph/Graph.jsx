import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';



export default class Graph extends Component {
    render() {
        const commonProperties = {
            margin: { top: 20, right: 20, bottom: 60, left: 80 },
            animate: true,
            enableSlices: 'x',
        }
        const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
            <g>
                <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
                <circle
                    r={size / 5}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                    fill={color}
                    fillOpacity={0.35}
                />
            </g>
        )

        const lineGraphSettings = {
            theme: {
                fontSize: '14px',
                textColor: 'black',
                axis : {
                    legend: {
                        text: {
                            fontSize: 16,
                            fontWeight: "bold"
                        }
                    }
                }
            }
        }

        return (
            <ResponsiveLine
                    {...commonProperties}  
                    theme={lineGraphSettings.theme}                  
                    data={this.props.data}
                    xScale={{
                        type: 'time',
                        format: '%d/%m/%Y',
                        precision: 'day',
                    }}
                    xFormat="time:%d/%m/%Y"
                    yScale={{
                        type: 'linear',
                        stacked:  false
                    }}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 15,
                        legend: 'Amount',
                        legendOffset: -65,
                        legendPosition: 'middle',
                        format: value =>
                            "£" + Number(value),
                    }}
                    
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every 8 days',
                        legend: 'Date',
                        legendOffset: 40,
                        legendPosition: 'middle'
                    }}
                    curve={'catmullRom'}
                    enablePointLabel={false}
                    pointSymbol={CustomSymbol}
                    pointSize={9}
                    pointBorderWidth={1}
                    pointBorderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    }}
                    colors={this.props.scheme}
                    lineWidth={4}

                    yFormat={value => '£' + Number(value)}          
                    useMesh={true}
                    enableSlices={false}
            />
        )
    }
}