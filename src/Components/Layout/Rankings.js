import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { RankRow } from '../RankRow.js';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export class RankingsRaw extends Component {
	state = {
		sortMethod: 'Cones Scored',
	};
	selectSortBy = (event) => {
		console.log('New sort method:' + event.target.getAttribute('sort'));
		this.setState({
			sortMethod: event.target.getAttribute('sort'),
		});
	};
	getSortedTeams = (sortby) => {
		let sorted = this.props.dataReducer.teams;
		switch (sortby) {
			case 'Cubes Scored':
				// sorted.sort(
				// 	(a, b) =>
				// 		parseFloat(b.aggregated[0][2]) +
				// 		parseFloat(b.aggregated[1][0]) -
				// 		(parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[1][0]))
				// );
				sorted.sort(
					(a, b) =>
						(parseFloat(b.aggregated[0][6]) + parseFloat(b.aggregated[0][7]) + parseFloat(b.aggregated[0][8])+parseFloat(b.aggregated[1][4])+parseFloat(b.aggregated[1][5])+parseFloat(b.aggregated[1][6]))
						-
						(parseFloat(a.aggregated[0][6]) + parseFloat(a.aggregated[0][7]) + parseFloat(a.aggregated[0][8])+parseFloat(a.aggregated[1][4])+parseFloat(a.aggregated[1][5])+parseFloat(a.aggregated[1][6]))
				);
				break;
			case 'Cones Scored':
				// sorted.sort(
				// 	(a, b) =>
				// 		parseFloat(b.aggregated[0][3]) +
				// 		parseFloat(b.aggregated[1][2]) -
				// 		(parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[1][2]))
				// );
				sorted.sort(
					(a, b) => 
					(parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3]) + parseFloat(b.aggregated[0][4])+parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1])+parseFloat(b.aggregated[1][2]))
					-
					(parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[0][4])+parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1])+parseFloat(a.aggregated[1][2]))
				);
				break;
			case 'Cones Accuracy':
				// let conesScoredA = parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[0][4])+parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1])+parseFloat(a.aggregated[1][2]);
				// let conesScoredB = parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3]) + parseFloat(b.aggregated[0][4])+parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1])+parseFloat(b.aggregated[1][2]);
				sorted.sort(
					(a, b) =>
						((parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3]) + parseFloat(b.aggregated[0][4])+parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1])+parseFloat(b.aggregated[1][2]))/((parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3]) + parseFloat(b.aggregated[0][4])+parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1])+parseFloat(b.aggregated[1][2]))+parseFloat(b.aggregated[0][5])+parseFloat(b.aggregated[1][3]))) 
						-
						(parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[0][4])+parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1])+parseFloat(a.aggregated[1][2]))/((parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[0][4])+parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1])+parseFloat(a.aggregated[1][2]))+parseFloat(a.aggregated[0][5])+parseFloat(a.aggregated[1][3]))
				);
				break;
			case 'Cubes Accuracy':
					sorted.sort(
						(a,b) => 
						((parseFloat(b.aggregated[0][6]) + parseFloat(b.aggregated[0][7]) + parseFloat(b.aggregated[0][8])+parseFloat(b.aggregated[1][4])+parseFloat(b.aggregated[1][5])+parseFloat(b.aggregated[1][6]))/(parseFloat(b.aggregated[0][6]) + parseFloat(b.aggregated[0][7]) + parseFloat(b.aggregated[0][8])+parseFloat(b.aggregated[1][4])+parseFloat(b.aggregated[1][5])+parseFloat(b.aggregated[1][6])+ parseFloat(b.aggregated[0][9]) + parseFloat(b.aggregated[1][7])))
						-
						((parseFloat(a.aggregated[0][6]) + parseFloat(a.aggregated[0][7]) + parseFloat(a.aggregated[0][8])+parseFloat(a.aggregated[1][4])+parseFloat(a.aggregated[1][5])+parseFloat(a.aggregated[1][6]))/(parseFloat(a.aggregated[0][6]) + parseFloat(a.aggregated[0][7]) + parseFloat(a.aggregated[0][8])+parseFloat(a.aggregated[1][4])+parseFloat(a.aggregated[1][5])+parseFloat(a.aggregated[1][6])+ parseFloat(a.aggregated[0][9]) + parseFloat(a.aggregated[1][7])))
					);
					break;
			case 'Defense Quantity':
				sorted.sort((a, b) => b.aggregated[1][11] - a.aggregated[1][11]);
				break;
			case 'Defense Quality':
				sorted.sort((a, b) => b.aggregated[1][12] - a.aggregated[1][12]);
				break;
			case 'Charge Station':
				sorted.sort((a, b) => ((parseFloat(b.aggregated[2][0]) + parseFloat(b.aggregated[0][10])) - (parseFloat(a.aggregated[2][0])+parseFloat(a.aggregated[0][10]))));
				break;
			case 'Time of CS Start':
				sorted.sort((a, b) => b.aggregated[2][2] - a.aggregated[2][2]);
				break;
		}
		return sorted;
	};
	render() {
		return (
			<Container>
				<h3 style={mainHead}>Analyzed Team Rankings</h3>

				<Table hover responsive style={noTop} striped>
					<thead style={{ textAlign: 'center' }}>
						<tr>
							{/* <td>
                <Button
                  variant="outline-dark"
                  style={fullWidth}
                >
                  Delete
                </Button>
              </td> */}
							<td>
								<Button variant='outline-dark' style={fullWidth}>
									Rank
								</Button>
							</td>
							<td>
								<Button variant='outline-dark' style={fullWidth}>
									Team
								</Button>
							</td>
							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Cones Scored'}
								>
									Cones Scored
								</Button>
							</td>
							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Cubes Scored'}
								>
									Cubes Scored
								</Button>
							</td>
							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Cones Accuracy'}
								>
									Cones Accuracy
								</Button>
							</td>
							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Cubes Accuracy'}
								>
									Cubes Accuracy
								</Button>
							</td>

							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Defense Quantity'}
								>
									Defense Quantity
								</Button>
							</td>
							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Defense Quality'}
								>
									Defense Quality
								</Button>
							</td>
							<td>
								<Button
								variant='outline-dark'
								style={fullWidthDynamic}
								onClick={this.selectSortBy}
								sort={'Charge Station'}>
								Charging Station
								</Button>
							</td>
							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Time of CS Start'}
								>
									Time of CS Start
								</Button>
							</td>
						</tr>
					</thead>
					<tbody>
						{this.getSortedTeams(this.state.sortMethod).map((team, index) => {
							return <RankRow team={team} row={index} />;
						})}
					</tbody>
				</Table>
			</Container>
		);
	}
}
const fullWidth = {
	width: '100%',
};
const climbTimeWidth = {
	width: '130%',
	backgroundColor: 'rgba(75, 192, 192, 0.2)',
};
const fullWidthDynamic = {
	width: '100%',
	backgroundColor: 'rgba(75, 192, 192, 0.2)',
};
const noTop = {
	top: '0px',
	marginTop: '0px',
	bottom: '0px',
	marginBottom: '0px',
	width: '100%',
};
const mainHead = {
	textAlign: 'center',
	marginTop: '1%',
};
const mapStateToProps = (state) => {
	return {
		dataReducer: state.dataReducer,
	};
};

export const Rankings = connect(mapStateToProps)(RankingsRaw);
