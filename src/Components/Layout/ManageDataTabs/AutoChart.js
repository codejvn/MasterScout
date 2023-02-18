import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
export class AutoChartRaw extends Component {
	getChartData = () => {
		// this is hard coded for now, import auto props from team.js later
		try {
			let chartData = [];
			if (this.props.team.aggregated[0].length > 0) {
				for (let i = 2; i < 11; i++) {
					console.log('SOME CHART DATA: ' + this.props.team.aggregated[0][i]);
					chartData.push(this.props.team.aggregated[0][i]);
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
				labels: [
					'Cones High',
					'Cones Mid',
					'Cones Low',
					'Cones Missed',
					'Cubes High',
					'Cubes Mid',
					'Cubes Low',
					'Cubes Missed',
					'Charge Station',
				],
				datasets: [
					{
						data: this.getChartData(),
						label: 'AUTONOMOUS',
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
						text: 'AUTONOMOUS',
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
const mapStateToProps = (state) => {
	return {
		search: state.search,
		teams: state.dataReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	// propName: (parameters) => dispatch(action)
	return {
		// put actions here
	};
};

export const AutoChart = connect(
	mapStateToProps,
	mapDispatchToProps
)(AutoChartRaw);
