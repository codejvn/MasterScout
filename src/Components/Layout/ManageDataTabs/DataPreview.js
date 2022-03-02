import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Input } from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion';
import { modifyData } from '../../../Actions/ImportActions/modifyData';
import { connect } from 'react-redux';
import { autoDataProps } from '../../../Reducers/Team';
import { teleopDataProps } from '../../../Reducers/Team';
import { endgameDataProps } from '../../../Reducers/Team';
export class DataPreviewRaw extends Component {
	state = {
		editable: false,
	};
	modifyData = (e) => {
		let input = e.currentTarget;
		this.props.modifyData({
			section: 'auto',
			dataId: input.id,
			data: input.value,
			num: this.props.data.key,
		});
	};
	toggleEdit = () => {
		this.setState({
			editable: !this.state.editable,
		});
	};
	render() {
		return (
			<Row style={topMargin}>
				<Card style={formWidth}>
					<Card.Title>
						{this.props.data.teamNum}

						<Button style={buttonStyle} size='small' onClick={this.toggleEdit}>
							{this.state.editable ? 'Save' : 'Edit'}
						</Button>
					</Card.Title>

					<Card.Subtitle className='mb-2 text-muted'>
						{this.props.data.scout}
					</Card.Subtitle>
					<Accordion defaultActiveKey='-1'>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey='0'>
								Auto
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='0'>
								<Card.Body>
									{(() => {
										console.log(this.props.data);
									})()}
									{
										//JSON.stringify(this.props.data.data.auto)
										this.props.data.auto.map((data) => {
											return (
												<div>
													{autoHeaders[data.id]}
													{this.state.editable ? (
														<Input
															type='text'
															className='mr-sm-2'
															section='auto'
															value={JSON.stringify(data.value)}
															onChange={this.modifyData}
															id={data.id}
														/>
													) : (
														JSON.stringify(data.value)
													)}
												</div>
											);
										})
									}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey='1'>
								Teleop
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='1'>
								<Card.Body>
									{this.props.data.teleop.map((data) => {
										return (
											<div>
												{teleopHeaders[data.id]}
												{this.state.editable ? (
													<Input
														type='text'
														className='mr-sm-2'
														section='teleop'
														value={JSON.stringify(data.value)}
														onChange={this.modifyData}
														id={data.id}
													/>
												) : (
													JSON.stringify(data.value)
												)}
											</div>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey='2'>
								Endgame & Comments
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='2'>
								<Card.Body>
									{this.props.data.endgame.map((data) => {
										console.log(data);
										return (
											<div>
												{endgameHeaders[data.id - 9]}
												{this.state.editable ? (
													<Input
														type='text'
														className='mr-sm-2'
														section='endgame'
														value={JSON.stringify(data.value)}
														onChange={this.modifyData}
														id={data.id}
													/>
												) : (
													JSON.stringify(data.value)
												)}
											</div>
										);
									})}
									Comments:
									{JSON.stringify(this.props.data.comment)}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</Card>
			</Row>
		);
	}
}
const buttonStyle = {
	width: '7%',
	position: 'absolute',
	textAlign: 'center',
	float: 'right',
	marginLeft: '41%',
};
// const autoHeaders = [
// 	'Starting Position: ',
// 	'Crossed Initiation Line: ',
// 	'Bottom Scored: ',
// 	'Outer Scored: ',
// 	'Inner Scored: ',
// 	'Shots Attempted From Init. Line: ',
// 	'Shots Attempted From Near Trench: ',
// ];
const autoHeaders = autoDataProps.map((prop) => prop.name + ': ');
const teleopHeaders = teleopDataProps.map((prop) => prop.name + ': ');
const endgameHeaders = endgameDataProps.map((prop) => prop.name + ': ');
const formWidth = {
	width: '100%',
	textAlign: 'center',
};
const topMargin = {
	paddingTop: '20px',
};
const mapStateToProps = (state) => {
	return {
		importer: state.importer,
	};
};
const mapDispatchToProps = (dispatch) => {
	// propName: (parameters) => dispatch(action)
	return {
		// addData: (data) => dispatch(addData(data)),
		modifyData: (data) => dispatch(modifyData(data)),
		// Upload Data
	};
};
export const DataPreview = connect(
	mapStateToProps,
	mapDispatchToProps
)(DataPreviewRaw);
