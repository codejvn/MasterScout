import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
export class AutoChartRaw extends Component {

	countDocked = () => {
		let matches = this.props.team.matchNums.length;
		// let input = "";
		let count = 0;
		let data = {};
		for(let i = 0; i < matches; i++){
			data = this.props.team.autoData[i];
			if(data[10].value == 8){
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
			data = this.props.team.autoData[i];
			if(data[10].value == 12){
				count++
			}
		}
		// console.log("count val");
		// 	console.log(count);
		return count.toFixed(3) + "";
	}
	countNone = () => {
		let didSmth = parseInt(this.countDocked()) + parseInt(this.countEngaged());
		return this.props.team.matchNums.length - didSmth;
	}
	getChartData = () => {
		// this is hard coded for now, import auto props from team.js later
		try {
			console.log("what team looks like in get chart data");
			console.log(this.props.team);
			let chartData = [];
			if (this.props.team.aggregated[0].length > 0) {
				for (let i = 2; i < 10; i++) {
					console.log('SOME CHART DATA: ' + this.props.team.aggregated[0][i] + "type: " + this.props.team.aggregated[0][i].constructor);
					chartData.push(this.props.team.aggregated[0][i]);
				}
				console.log("the new functions wooo");
				console.log(this.countDocked());
				console.log(this.countEngaged());
				console.log(this.countNone());
				console.log("did anything print?");
				chartData.push(this.countDocked());
				chartData.push(this.countEngaged());
				chartData.push(this.countNone());
			}
			console.log("fejifoe");
			console.log(chartData);
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
					'Docked',
					'Engaged',
					'None'
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
							'rgba(51, 204, 51, 0.2)',
							'rgba(172, 88, 214, 0.2)',
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
							'rgba(172, 88, 214, 1)',
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
