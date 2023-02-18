import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { teleopDataProps } from '../../../Reducers/Team';
export default class TeleopChart extends Component {
	getChartData = () => {
		// this is hard coded for now, import auto props from team.js later
		try {
			let chartData = [];
			if (this.props.team.aggregated[1].length > 0) {
				for (let i = 0; i < 10; i++) {
					chartData.push(this.props.team.aggregated[1][i]);
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
				labels: teleopDataProps.map((prop) => prop.name),
				datasets: [
					{
						data: this.getChartData(),
						label: 'TELEOPERATED',
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 153, 255, 0.2)',
							'rgba(102, 102, 255, 0.2)',
							'rgba(255, 120, 51, 0.2)',
							'rgba(51, 204, 51, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(255, 153, 255, 1)',
							'rgba(102, 102, 255, 1)',
							'rgba(255, 120, 51, 1)',
							'rgba(51, 204, 51, 1)',
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
						text: 'TELEOPERATED',
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
