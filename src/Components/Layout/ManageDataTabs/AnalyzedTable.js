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
				<Table style={center} responsive striped={stripes}>
					<thead>
						<tr>
							<td>Team</td>
							<td>Start Position</td>
							<td>Cross Tarmac</td>
							<td>Upper Auto</td>
							<td>Lower Auto</td>
							<td>Upper Missed Auto</td>
							<td>Lower Missed Auto</td>
							<td>Upper Teleop</td>
							<td>Missed Upper Teleop</td>
							<td>Lower Teleop</td>
							<td>Missed Lower Teleop</td>
							<td>Shoot From Tarmac</td>
							<td>Shoot From Launch Pad</td>
							<td>Shoot From Fender'</td>
							<td>Defense Quality</td>
							<td>Defense Quantity</td>
							<td>Climb Level</td>
							<td>Time of Climb Start</td>
						</tr>
					</thead>
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
};
const defaultHeader = {
	color: 'gray',
};

export default AnalyzedTable;
