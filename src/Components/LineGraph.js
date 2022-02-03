import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
export class LineGraph extends Component {
	constructor(props) {
		super(props);
		this.colors = [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)',
		];
	}
	getData = () => {
		let data = [];
		for (const dataSet of this.props.dataSets) {
			let dataValues = [];
			// console.log(dataSet);
			try {
				dataValues = dataSet.data.map((thing) => thing.value);
			} catch (err) {
				// console.log(err);

				dataValues = [];
			}
			data.push({
				label: dataSet.teamNumber,
				fill: true,
				lineTension: 0.5,
				backgroundColor: this.colors[data.length],
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 1,
				data: dataValues,
			});
		}
		return {
			labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			datasets: data,
		};
	};
	render() {
		return (
			<div>
				<Line
					data={this.getData()}
					options={{
						maintainAspectRatio: true,
						title: {
							display: true,
							text: this.props.title,
							fontsize: 20,
						},
						scales: {
							yAxes: [
								{
									ticks: {
										beginAtZero: true,
									},
								},
							],
						},
						legend: {
							display: false,
							position: 'right',
						},
					}}
				/>
			</div>
		);
	}
}

export default LineGraph;
