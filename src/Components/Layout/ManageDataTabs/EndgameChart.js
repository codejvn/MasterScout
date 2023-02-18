import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Team from '../../../Reducers/Team.js';
import Button from 'react-bootstrap/Button';

export default class EndgameChart extends Component {
	getChartData = () => {
		// this is hard coded for now, import auto props from team.js later
		try {
			let chartData = [];
			if (this.props.team.aggregated[2].length > 0) {
				for (let i = 0; i < 4; i++) {
					chartData.push(this.props.team.aggregated[2][i]);
				}
			}
			return chartData;
		} catch (err) {
			return [];
		}
	};
	getChartInfo = () => {
		return {
			data: {
				labels: ['Attempted CS', 
				'Charging Station',
				'Climb Efficiency',
				'Time at CS Start'],
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
