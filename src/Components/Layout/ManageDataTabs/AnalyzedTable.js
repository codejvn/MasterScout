import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
export class AnalyzedTable extends Component {
	getStyle = (data, gameStage, index, highlight) => {
		// loop through teams and if this is the largest then custom background
		if (highlight) {
			let highest = true;
			for (const team of this.props.teams) {
				if (team.aggregated[gameStage][index] > data) {
					highest = false;
				}
			}
			if (highest) {
				return {
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					color: 'black',
				};
			} else {
				return {};
			}
		} else {
			return {};
		}
	};
	render() {
		// console.log("rending analyzed");
		let stripes;
		try {
			stripes = this.props.stripes;
		} catch (err) {
			stripes = true;
		}
		let validTeam = true;
		if (this.props.teams[0] == undefined) {
			validTeam = false;
		}
		if (validTeam) {
			if (this.props.teams.length > 1) {
				for (const team of this.props.teams) {
					if (team.autoData.length > 0) {
						// console.log('AGGREGATING TEAM');
						team.aggregate();
					}
				}
			}
			return (
				<div style={center}>
					<div style={{ paddingTop: 75 }}></div>
					<Table style={center} responsive striped={stripes}>
						<thead>
							<tr
								style={
									{
										// backgroundColor: 'white',
										// position: 'fixed',
										// marginTop: -410,
										// paddingTop: 300,
									}
								}
							>
								<th
								// style={{
								// 	backgroundColor: 'white',
								// 	position: 'fixed',
								// 	top: 50,
								// }}
								>
									Team
								</th>
								<th>Start Position</th>
								<th>Left Community</th>
								<th>Cones High</th>
								<th>Cones Mid</th>
								<th>Cones Low</th>
								<th>Cones Missed</th>
								<th>Cubes High</th>
								<th>Cubes Mid</th>
								<th>Cubes Low</th>
								<th>Cubes Missed</th>
								<th>Charging Station</th>
								<th>Cones High</th>
								<th>Cones Mid</th>
								<th>Cones Low</th>
								<th>Cones Missed</th>
								<th>Cubes High</th>
								<th>Cubes Mid</th>
								<th>Cubes Low</th>
								<th>Cubes Missed</th>
								<th>Intake From</th>
								<th>Defense</th>
								<th>Attempted Charge Station</th>
								<th>Charging Station</th>
								<th>Climb Efficiency</th>
								<th>Time Left</th>
							</tr>
						</thead>
						<div style={{ padding: 20 }}></div>

						<tbody>
							{/* loop through teams, within teams loop through aggregate */}

							{this.props.teams.map((team) => {
								let highlight;
								// hard coded for now
								try {
									highlight = this.props.highlight;
								} catch (err) {
									highlight = false;
								}
								return (
									<tr>
										<td>{team.teamNumber}</td>
										{/**maps all auto datas */}
										{team.aggregated[0].map((data, index) => {
											return (
												<td style={this.getStyle(data, 0, index, highlight)}>
													{data}
												</td>
											);
										})}
										{/**maps all teleop datas */}
										{team.aggregated[1].map((data, index) => {
											return (
												<td style={this.getStyle(data, 1, index, highlight)}>
													{data}
												</td>
											);
										})}
										{/**maps all endgame datas */}
										{team.aggregated[2].map((data, index) => {
											return (
												<td style={this.getStyle(data, 2, index, highlight)}>
													{data}
												</td>
											);
										})}
									</tr>
								);
							})}
							{/* {this.props.dataReducer.teams.map((team) => {
                  return <tr>{team.aggregated}</tr>;
                })} */}
						</tbody>
					</Table>
				</div>
			);
		} else {
			return (
				<div style={center}>
					<h5 style={defaultHeader}>No Teams Selected</h5>
				</div>
			);
		}
	}
}
const center = {
	textAlign: 'center',
	width: '100%',
};
const defaultHeader = {
	color: 'gray',
};

export default AnalyzedTable;
