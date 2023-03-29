import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { RankRow } from '../RankRow.js';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

export class RankingsRaw extends Component {
	state = {
		sortMethod: 'Total Scored',
		withHigh: false,
		withMid: false,
		withLow: false,
	};
	selectSortBy = (event) => {
		console.log('New sort method:' + event.target.getAttribute('sort'));
		this.setState({
			...this.state,
			sortMethod: event.target.getAttribute('sort'),
		});
	};
	toggleHigh = () => {
		this.setState({...this.state, withHigh: !this.state.withHigh});
	}
	toggleMid = () => {
		this.setState({...this.state, withMid: !this.state.withMid});
	}
	toggleLow = () => {
		this.setState({...this.state, withLow: !this.state.withLow});
	}
	cubesScored = (team) => {
		let total = 0;
		if(this.state.withHigh){
			total +=  parseFloat(team.aggregated[0][6]);
			total += parseFloat(team.aggregated[1][4]);
		}
		if(this.state.withMid){
			total += parseFloat(team.aggregated[0][7]);
			total += parseFloat(team.aggregated[1][5]);
		}
		if(this.state.withLow){
			total += parseFloat(team.aggregated[0][8]);
			total += parseFloat(team.aggregated[1][6]);
		}
		return total;
	}
	conesScored = (team) => {
		let total = 0;
		if(this.state.withHigh){
			total += parseFloat(team.aggregated[0][2]);
			total += parseFloat(team.aggregated[1][0]);
		}
		if(this.state.withMid){
			total += parseFloat(team.aggregated[0][3]);
			total += parseFloat(team.aggregated[1][1]);
		}
		if(this.state.withLow){
			total += parseFloat(team.aggregated[0][4]);
			total += parseFloat(team.aggregated[1][2]);
		}
		return total;
	}
	getSortedTeams = (sortby) => {
		let sorted = this.props.dataReducer.teams;
		switch (sortby) {
			case 'Team':
				sorted.sort(
					(a,b) =>
					a.teamNumber - b.teamNumber
				)
				break;
			case 'Total Scored':
				sorted.sort(
					(a,b) =>
					(this.cubesScored(b) + this.conesScored(b))
					-
					(this.cubesScored(a) + this.conesScored(a))
				);
				break;
			case 'Cubes Scored':
				// sorted.sort(
				// 	(a, b) =>
				// 		parseFloat(b.aggregated[0][2]) +
				// 		parseFloat(b.aggregated[1][0]) -
				// 		(parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[1][0]))
				// );
				sorted.sort(
					(a, b) =>
						// (parseFloat(b.aggregated[0][6]) + parseFloat(b.aggregated[0][7]) + parseFloat(b.aggregated[0][8])+parseFloat(b.aggregated[1][4])+parseFloat(b.aggregated[1][5])+parseFloat(b.aggregated[1][6]))
						this.cubesScored(b)
						-
						// (parseFloat(a.aggregated[0][6]) + parseFloat(a.aggregated[0][7]) + parseFloat(a.aggregated[0][8])+parseFloat(a.aggregated[1][4])+parseFloat(a.aggregated[1][5])+parseFloat(a.aggregated[1][6]))
						this.cubesScored(a)
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
					// (parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3]) + parseFloat(b.aggregated[0][4])+parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1])+parseFloat(b.aggregated[1][2]))
					this.conesScored(b)
					-
					// (parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[0][4])+parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1])+parseFloat(a.aggregated[1][2]))
					this.conesScored(a)
				);
				break;
			case 'Cones Accuracy NL':
				// let conesScoredA = parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[0][4])+parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1])+parseFloat(a.aggregated[1][2]);
				// let conesScoredB = parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3]) + parseFloat(b.aggregated[0][4])+parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1])+parseFloat(b.aggregated[1][2]);
				sorted.sort(
					(a, b) =>
						((parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3]) + parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1]))/((parseFloat(b.aggregated[0][2]) + parseFloat(b.aggregated[0][3])+parseFloat(b.aggregated[1][0])+parseFloat(b.aggregated[1][1]))+parseFloat(b.aggregated[0][5])+parseFloat(b.aggregated[1][3]))) 
						-
						((parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3]) + parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1]))/((parseFloat(a.aggregated[0][2]) + parseFloat(a.aggregated[0][3])+parseFloat(a.aggregated[1][0])+parseFloat(a.aggregated[1][1]))+parseFloat(a.aggregated[0][5])+parseFloat(a.aggregated[1][3]))) 
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
			case 'Cubes Accuracy NL'://NL = No Low
					sorted.sort(
						(a,b) => 
						((parseFloat(b.aggregated[0][6]) + parseFloat(b.aggregated[0][7])+parseFloat(b.aggregated[1][4])+parseFloat(b.aggregated[1][5]))/(parseFloat(b.aggregated[0][6]) + parseFloat(b.aggregated[0][7])+parseFloat(b.aggregated[1][4])+parseFloat(b.aggregated[1][5])+parseFloat(b.aggregated[0][9]) + parseFloat(b.aggregated[1][7])))
						-
						((parseFloat(a.aggregated[0][6]) + parseFloat(a.aggregated[0][7])+parseFloat(a.aggregated[1][4])+parseFloat(a.aggregated[1][5]))/(parseFloat(a.aggregated[0][6]) + parseFloat(a.aggregated[0][7])+parseFloat(a.aggregated[1][4])+parseFloat(a.aggregated[1][5])+parseFloat(a.aggregated[0][9]) + parseFloat(a.aggregated[1][7])))
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
				sorted.sort((a, b) => b.aggregated[1][12] - a.aggregated[1][12]);
				break;
			case 'Defense Quality':
				sorted.sort((a, b) => b.aggregated[1][13] - a.aggregated[1][13]);
				break;
			case 'Charge Station':
				sorted.sort((a, b) => ((parseFloat(b.aggregated[2][0]) + parseFloat(b.aggregated[0][10])) - (parseFloat(a.aggregated[2][0])+parseFloat(a.aggregated[0][10]))));
				break;
			case 'Charge Station Auto':
				sorted.sort((a, b) => (parseFloat(b.aggregated[0][10]) - parseFloat(a.aggregated[0][10])));
				break;
			case 'Charge Station Endgame':
				sorted.sort((a, b) => (parseFloat(b.aggregated[2][0]) - parseFloat(a.aggregated[2][0])));
				break;
			
			// case 'Time of CS Start':
			// 	sorted.sort((a, b) => b.aggregated[2][2] - a.aggregated[2][2]);
			// 	break;
		}
		return sorted;
	};
	render() {
		return (
			<Container>
				<h2 classname='h2' style={mainHead}><strong>Analyzed Team Rankings</strong></h2>
				<Row>
				<h4 style={directions}>Check the positions scored you would like to count for the rankings: </h4>
				<div style={spacer}>
									<Form>
										<Form.Group controlId='formBasicCheckbox'>
											<Form.Check
												type='checkbox'
												label='High'
												onChange={this.toggleHigh}
											/>
										</Form.Group>
									</Form>
				</div>
				<div style={spacer}>
									<Form>
										<Form.Group controlId='formBasicCheckbox'>
											<Form.Check
												type='checkbox'
												label='Mid'
												onChange={this.toggleMid}
											/>
										</Form.Group>
									</Form>
				</div>
				<div style={spacer}>
									<Form>
										<Form.Group controlId='formBasicCheckbox'>
											<Form.Check
												type='checkbox'
												label='Low'
												onChange={this.toggleLow}
											/>
										</Form.Group>
									</Form>
				</div>
				</Row>
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
								<Button variant='outline-dark' style={fullWidth} sort={'Team'} onClick={this.selectSortBy}>
									Team
								</Button>
							</td>
							<td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Total Scored'}
								>
									Tot Scored
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
								sort={'Charge Station Auto'}>
								CS Auto
								</Button>
							</td>
							<td>
								<Button
								variant='outline-dark'
								style={fullWidthDynamic}
								onClick={this.selectSortBy}
								sort={'Charge Station Endgame'}>
								CS Endgame
								</Button>
							</td>
							{/* <td>
								<Button
									variant='outline-dark'
									style={fullWidthDynamic}
									onClick={this.selectSortBy}
									sort={'Time of CS Start'}
								>
									Time of CS Start
								</Button>
							</td> */}
						</tr>
					</thead>
					<tbody>
						{this.getSortedTeams(this.state.sortMethod).map((team, index) => {
							return <RankRow team={team} row={index} withHigh={this.state.withHigh} withMid={this.state.withMid} withLow={this.state.withLow}/>;
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
const spacer = {
	padding: '1vh',
	marginRight: '20px',
};
const mainHead = {
	textAlign: 'center',
	marginTop: '1%',
	marginBottom: '3%',
	fontSize: 'x-large',
};
const directions = {
	textAlign: 'center',
	marginTop: '1%',
	marginBottom: '2%',
	marginRight: '2%',
};
const mapStateToProps = (state) => {
	return {
		dataReducer: state.dataReducer,
	};
};

export const Rankings = connect(mapStateToProps)(RankingsRaw);
