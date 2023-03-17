import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { DataPreview } from './DataPreview';
import { connect } from 'react-redux';
import { InputBar } from './InputBar';
import { clearData } from '../../../Actions/ImportActions/clearData';
import { appendMatchData } from '../../../Actions/DataActions/appendMatchData';
import { DupDataPopup } from '../../../Components/DupDataPopup';
import { zeroRightClassName } from 'react-remove-scroll-bar';
import axios from 'axios';
import CameraReader from './CameraReader';
import { Col } from 'react-bootstrap';

export class ImportRaw extends Component {
	componentWillMount() {}
	state = {
		showSuccess: false,
		showFail: false,
		editable: true,
	};
	importHandle = () => {
		this.props.clearData();
		this.setShow(true);
		this.props.appendMatchData(this.props.importer.data);
		// console.log(this.props.importer.data[0].matchNum);
		// console.log(JSON.stringify(this.props.dataReducer.teams));

		// console.log(this.props.dataReducer.teams[0]);
		// console.log(this.props.importer.data[0].teamNum);
		// console.log(this.props.importer.data[0].matchNum);
		// console.log(this.props.dataReducer.teams[0].matchNums);

		for (var i = 0; i < this.props.dataReducer.teams[0].length; i++) {
			if (
				this.props.dataReducer.teams[i].teamNum ===
				this.props.importer.data[0].teamNum
			) {
				if (
					this.props.dataReducer.teams[0].matchNums.includes(
						this.props.importer.data[0].matchNum
					)
				) {
					// console.log('this data is aduplicate');
				}
			}
		}
		//writes to file undefined dir
		this.download(
			'CTDataSet.json',
			JSON.stringify({
				teams: this.props.dataReducer.teams,
				tba: this.props.tba,
			})
		);
	};

	setShow = (success) => {
		this.setState({
			...this.state,
			showSuccess: success,
			showFail: !success,
		});
	};
	toggleEdit = () => {
		this.setState({
			...this.state,
			editable: !this.state.editable,
		});
	};

	download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
		);
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	// updateData = async () => {
	//   await axios.put('https://jsonbox.io/box_5a9767899ab8ef9ab5d0/data/5fb0b24b9c0ec50017038679', { data: this.props.dataReducer.state }).then(
	//     console.log("WAITED and finished")
	//   );
	// }

	render() {
		return (
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 '>
				<Container>
					<Row className='border-bottom'>
						<h2>Import Data</h2>
					</Row>
					<Row style={spacer}>
					<Col><h1><strong>THIS VERSION ONLY WORKS WITH HATBORO 2023 DATA.</strong></h1></Col>
					<a href='https://masterscout2590.netlify.app/'><strong>CLICK ON THIS TEXT FOR THE UPDATED VERSION</strong></a>
					</Row>
					{this.state.showSuccess && (
						<Alert
							variant='success'
							onClose={() => this.setShow(false)}
							dismissible
							style={alertStyle}
						>
							Success! The data was successfully imported.
						</Alert>
					)}
					<Row>
						<div style={spacer}></div>
					</Row>
					<Row>
						<InputBar style={formWidth} />
					</Row>
					{this.props.importer.data.map((data) => {
						return <DataPreview data={data} editable={false}></DataPreview>;
					})}
					<Row>
						<Button style={importStyle} onClick={this.importHandle}>
							Import
						</Button>
					</Row>
					<Row>
						<div style={spacer}></div>
					</Row>
					<Row>
						{/* <CameraReader /> */}
						{/* <Button onClick={() => {
              this.updateData()
              console.log(this.props.dataReducer.data)
            }}>Update data</Button> */}
					</Row>
				</Container>{' '}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		importer: state.importer,
		dataReducer: state.dataReducer,
		tba: state.thebluealliance,
	};
};

const mapDispatchToProps = (dispatch) => {
	// propName: (parameters) => dispatch(action)
	return {
		clearData: (data) => dispatch(clearData()),
		appendMatchData: (data) => dispatch(appendMatchData(data)),
		// modifyData: (data) => dispatch(modifyData(modifyData)),
		// Upload Data
	};
};

const importStyle = {
	marginTop: '5%',
	width: '100%',
};
const alertStyle = {
	marginTop: '1%',
	width: '100%',
};
const formWidth = {
	width: '100%',
};
const spacer = {
	padding: '2vh',
};

export const Import = connect(mapStateToProps, mapDispatchToProps)(ImportRaw);
