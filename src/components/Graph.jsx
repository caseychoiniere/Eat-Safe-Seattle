import React, {Component} from 'react';
import { observer } from 'mobx-react';
import {AreaChart, BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, Legend, ReferenceLine, Tooltip} from 'recharts';
import Place from 'material-ui/svg-icons/maps/place';
import Phone from 'material-ui/svg-icons/communication/phone';
import MainStore from '../stores/MainStore';

@observer
class Graph extends Component {

    render() {
        const style = {
            closeBtn: { float: 'left', margin: '0px 0px 0px 6px' },
            h4: {margin: '10px 14px'},
            mapTitle: { textAlign: 'center', margin: '14px 12%' },
            icon: { verticalAlign: 'bottom' },
            tick: {fontSize: 10}
        };

        let { averagePointsPerInspection, graphData, hours, selectedRestaurant } = MainStore;

        const data = graphData.length ? graphData.slice() : [];

        return (
            data.length > 1 ? <AreaChart width={410} height={300} data={data} margin={{top: 10, right: 20, left: -16, bottom: 0}}>
                    <XAxis dataKey='date' tick={style.tick}/>
                    <YAxis tick={style.tick}/>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend align='right' verticalAlign='top' />
                    <ReferenceLine y={averagePointsPerInspection} label='Average points per inspection' stroke='red' />
                    <Area type='monotone' dataKey='violation_points' stackId='1' stroke='#8884d8' fill='#8884d8' />
            </AreaChart> : <BarChart width={410} height={300} data={data} margin={{left: -15}}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' tick={style.tick}/>
                    <YAxis tick={style.tick}/>
                    <Tooltip />
                    <Legend align='right' verticalAlign='top' />
                    <Bar fillOpacity={.5} dataKey='violation_points' fill='#8884d8' />
                    <ReferenceLine y={averagePointsPerInspection} label='Average points per inspection' stroke='red'/>
                </BarChart>

        )
    }
}

export default Graph;