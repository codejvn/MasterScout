import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

export class RankRow extends Component {
	conesScoredAdjusted = (team) => {
		let total = 0;
		console.log("getting the checkboxes from rankrow");
		console.log(this.props.withHigh);
		console.log(this.props.withMid);
		console.log(this.props.withLow);
		if(this.props.withHigh){
			total += parseFloat(team.aggregated[0][2]);
			total += parseFloat(team.aggregated[1][0]);
		}
		if(this.props.withMid){
			total += parseFloat(team.aggregated[0][3]);
			total += parseFloat(team.aggregated[1][1]);
		}
		if(this.props.withLow){
			total += parseFloat(team.aggregated[0][4]);
			total += parseFloat(team.aggregated[1][2]);
		}
		return total.toFixed(2);
	}
	cubesScoredAdjusted = (team) => {
		let total = 0;
		if(this.props.withHigh){
			total +=  parseFloat(team.aggregated[0][6]);
			total += parseFloat(team.aggregated[1][4]);
		}
		if(this.props.withMid){
			total += parseFloat(team.aggregated[0][7]);
			total += parseFloat(team.aggregated[1][5]);
		}
		if(this.props.withLow){
			total += parseFloat(team.aggregated[0][8]);
			total += parseFloat(team.aggregated[1][6]);
		}
		return total.toFixed(2);
	}
	render() {
		let team  = this.props.team;
		console.log(team);
		var conesScored = parseFloat(team.aggregated[0][2]) + parseFloat(team.aggregated[0][3]) + parseFloat(team.aggregated[0][4])+parseFloat(team.aggregated[1][0])+parseFloat(team.aggregated[1][1])+parseFloat(team.aggregated[1][2]);
		var cubesScored = parseFloat(team.aggregated[0][6]) + parseFloat(team.aggregated[0][7]) + parseFloat(team.aggregated[0][8])+parseFloat(team.aggregated[1][4])+parseFloat(team.aggregated[1][5])+parseFloat(team.aggregated[1][6]);
		var conesMissed = parseFloat(team.aggregated[0][5]) + parseFloat(team.aggregated[1][3]);
		var cubesMissed = parseFloat(team.aggregated[0][9]) + parseFloat(team.aggregated[1][7]);
		// cubesScored = cubesScored.toFixed(3);
		// conesScored = conesScored.toFixed(3);
		var totScored = conesScored + cubesScored;
		var totCones = conesScored+conesMissed;
		var totCubes = cubesScored+cubesMissed;
		var coneAcc = Number((conesScored/totCones).toFixed(3));
		var cubeAcc = Number((cubesScored/totCubes).toFixed(3));
		var totCS = parseFloat(team.aggregated[2][0]) + parseFloat(team.aggregated[0][10]);
		// if(conesScored>0){
		// 	console.log("cones scored");
		// 	console.log(conesScored);
		// 	console.log("cones missed");
		// 	console.log(conesMissed);
		// 	console.log(conesScored+conesMissed)
		// 	console.log("coneacc");
		// 	console.log(coneAcc);
		// 	console.log("cubeacc");
		// 	console.log(cubeAcc);
		// }
		return (
			<tr style={{ textAlign: 'center', width: '100%' }}>
				{/* <td style={center}><Button onClick={this.deleteRow} style={deleteButton}>X</Button></td> */}
				<td style={teamRanking}>{this.props.row + 1}</td>
				<td style={center}>{team.teamNumber}</td>
				<td style={center}>
					{Number(Number(this.conesScoredAdjusted(team)) + Number(this.cubesScoredAdjusted(team))).toFixed(2)}{/** total scored*/}
				</td>
				<td style={center}>
					{this.conesScoredAdjusted(team)}{/** cones scored*/}
				</td>
				<td style={center}>
					{this.cubesScoredAdjusted(team)} {/**cubes scored */}
				</td>
				<td style={center}>
					{coneAcc.toFixed(2)}{/**accuracy for cones*/}
				</td>
				<td style={center}>{cubeAcc.toFixed(2)}</td> {/**accuracy for cubes */}
				<td style={center}>{Number(team.aggregated[1][12]).toFixed(2)}</td>{/**defense quantity */}
				<td style={center}>{Number(team.aggregated[1][13]).toFixed(2)}</td>{/**defense quality */}
				<td style={center}>{totCS.toFixed(2)}</td>{/**charging station */}
				{/* <td style={center}>{team.aggregated[2][2]}</td>*time of climb start */}
			</tr>
		);
	}
}

const deleteButton = {
	backgroundColor: 'rgab(100,100,100,0)',
	padding: '0%',
};
const center = {
	// textAlign: 'center',
};
const teamRanking = {
	fontWeight: 'bold',
	backgroundColor: 'rgba(100,100,100,0.1 )',
};
const noTop = {
	top: '0px',
	marginTop: '0px',
	bottom: '0px',
	marginBottom: '0px',
};

const mapStateToProps = (state) => {
	return {
		dataReducer: state.dataReducer,
	};
};

export default RankRow = connect(mapStateToProps)(RankRow);
