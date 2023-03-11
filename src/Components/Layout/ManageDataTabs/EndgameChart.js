import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Team from '../../../Reducers/Team.js';
import Button from 'react-bootstrap/Button';

export default class EndgameChart extends Component {
	countDocked = () => {
		let matches = this.props.team.matchNums.length;
		// let input = "";
		let count = 0;
		let data = {};
		for(let i = 0; i < matches; i++){
			data = this.props.team.endgameData[i];
			if(data[0].value == 6){
				count++
			}
			// console.log("count val");
			// console.log(count);
		}
		return count.toFixed(3) + "";
	}
	countEngaged = () => {
		let matches = this.props.team.matchNums.length;
		// let input = "";
		let count = 0;
		let data = {};
		for(let i = 0; i < matches; i++){
			data = this.props.team.endgameData[i];
			if(data[0].value == 10){
				count++
			}
		}
		// console.log("count val");
		// 	console.log(count);
		return count.toFixed(3) + "";
	}
	countNone = () => {
		let didSmth = parseInt(this.countDocked()) + parseInt(this.countEngaged());
		console.log("num of matches" + this.props.team.matchNums.length + ", didsmth: " + didSmth);
		return this.props.team.matchNums.length - didSmth;
	}
	getChartData = () => {
		// this is hard coded for now, import auto props from team.js later
		try {
			let chartData = [];
			if (this.props.team.aggregated[2].length > 0) {
				console.log("new funcs");
				console.log(this.countDocked());
				console.log(this.countEngaged());
				console.log(this.countNone());
				chartData.push(this.countDocked());
				chartData.push(this.countEngaged());
				chartData.push(this.countNone());
				// for (let i = 1; i < 3; i++) {
				// 	chartData.push(this.props.team.aggregated[2][i]);
				// }
				chartData.push(this.props.team.aggregated[2][1]);
			}
			return chartData;
		} catch (err) {
			return [];
		}
	};
	getChartInfo = () => {
		return {
			data: {
				labels: ['Docked', 
				'Engaged', 
				'None',
				'Additional Robots'],
				datasets: [
					{
						data: this.getChartData(),
						label: 'ENDGAME',
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			},
		};
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Bar
				options={{
					responsive: true,
					maintainAspectRatio: true,
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
								},
							},
						],
					},
					title: {
						display: true,
						text: 'ENDGAME',
						fontsize: 80,
					},

					legend: {
						display: false,
						position: 'right',
					},
				}}
				data={this.getChartInfo().data}
				style={chart}
			/>
		);
	}
}
const chart = {
	width: '20%',
};
const spacer = {
	padding: '2vh',
};
