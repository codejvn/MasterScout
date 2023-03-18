import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { editTeam } from '../../../Actions/EditActions/editTeam';
import { setModal } from '../../../Actions/EditActions/setModal';
import { autoDataProps } from '../../../Reducers/Team';
import { teleopDataProps } from '../../../Reducers/Team';
import { endgameDataProps } from '../../../Reducers/Team';
// import { setModal } from "../../../Actions/EditActions/setModal";
// import edit modal
import { connect } from 'react-redux';

export class RawDataTableRaw extends Component {
	getTeamNum = (team) => {};
	showModal = (e) => {
		this.props.setModal(true, false);
		this.props.editTeam(this.props.team.teamNumber);
	};
	render() {
		console.log("teleop data props from team");
		console.log(teleopDataProps);
		console.log("autodataprops from team");
		console.log(autoDataProps);
		console.log("endgamedataprops from team");
		console.log(endgameDataProps);
		let validTeam = true;
		let team;
		try {
			team = this.props.team;
		} catch (err) {
			validTeam = false;
		}
		if (team == undefined) {
			validTeam = false;
		}
		if (validTeam) {
			return (
				<div style={middle}>
					<Accordion defaultActiveKey='1'>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey='0'>
								{team.teamNumber}
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='0'>
								<div>
									<Table hover borderless style={noTop} striped>
										<thead>
											<tr>
												<th>#</th>
												{autoDataProps.map((prop) => (
													<th>{prop.name}</th>
												))}
											</tr>
										</thead>
										<tbody>
											{team.autoData.map((match) => (
												<tr>
													<td>
														{team.matchNums[team.autoData.indexOf(match)]}
													</td>
													{match.map((matchData) => (
														<td>{JSON.stringify(matchData.value)}</td>
													))}
												</tr>
											))}
										</tbody>
									</Table>
									<Table hover borderless style={noTop} striped>
										<thead>
											<tr>
												<th>#</th>
												{teleopDataProps.map((prop) => (
													<th>{prop.name}</th>
												))}
											</tr>
										</thead>
										<tbody>
											{team.teleopData.map((match) => (
												<tr>
													<td>
														{team.matchNums[team.teleopData.indexOf(match)]}
													</td>
													{match.map((matchData) => (
														<td>{JSON.stringify(matchData.value)}</td>
													))}
												</tr>
											))}
										</tbody>
									</Table>
									<Table hover borderless style={noTop} striped>
										<thead>
											<tr>
												<th>#</th>
												{endgameDataProps.map((prop) => (
													<th>{prop.name}</th>
												))}
											</tr>
										</thead>
										<tbody>
											{team.endgameData.map((match) => (
												<tr>
													<td>
														{team.matchNums[team.endgameData.indexOf(match)]}
													</td>
													{match.map((matchData) => (
														<td>{JSON.stringify(matchData.value)}</td>
													))}
												</tr>
											))}
										</tbody>
									</Table>
									<Button onClick={this.showModal}>Edit</Button>
								</div>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</div>
			);
		} else {
			return <p>error</p>;
		}
	}
}
const autoHead = {
	backgroundColor: '#34febb',
	color: 'white',
};
const teleopHead = {
	backgroundColor: '#32ae85',
	color: 'white',
};
const endgameHead = {
	backgroundColor: '#42675a',
	color: 'white',
};
const middle = {
	textAlign: 'center',
};
const noTop = {
	top: '0px',
	marginTop: '0px',
	bottom: '0px',
	marginBottom: '0px',
};
const mapStateToProps = (state) => {
	return {
		edit: state.edit,
		data: state.dataReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	// propName: (parameters) => dispatch(action)
	return {
		setModal: (data, save) => dispatch(setModal(data, save)),
		editTeam: (data) => dispatch(editTeam(data)),
		// Upload Data
	};
};
export const RawDataTable = connect(
	mapStateToProps,
	mapDispatchToProps
)(RawDataTableRaw);
