// import types
import Team from './Team';
import { SET_TEAMS } from '../Actions/types';
import { ADDPEND_MATCHDATA } from '../Actions/types';
import { SET_COMPDATA } from '../Actions/types';
import { AGGREGATE_ALL } from '../Actions/types';
import axios from 'axios';

const dataInitState = {
	teams: [new Team(0, 0)],
};
const dataReducer = (state = dataInitState, action = {}) => {
	switch (action.type) {
		case SET_TEAMS:
			let newTeams = [];
			for (const teamNum of action.payload) {
				newTeams.push(new Team(teamNum, newTeams.length));
			}
			return {
				...state,
				teams: newTeams,
			};
			break;
		case AGGREGATE_ALL:
			let teamsPre = state.teams;
			for (const team of teamsPre) {
				if (team.comments.length > 0) {
					team.aggregate();
				}
			}
			return {
				...state,
				teams: teamsPre,
			};
		case ADDPEND_MATCHDATA:
			let teams = state.teams;
			// console.log(state.teams);
			for (const matchDataObj of action.payload) {
				// looping through each "qr code" being imported
				let index = teams.findIndex(
					(team) => team.teamNumber == matchDataObj.teamNum
				);
				try {
					console.log('actually adding in the data');
					console.log(matchDataObj);
					teams[index].appendData(matchDataObj);
					teams[index].aggregate();
				} catch (err) {
					console.log(err);
				}
			}
			//update on button
			// axios.put(
			// 	'https://jsonbox.io/box_5a9767899ab8ef9ab5d0/data/5fb0b24b9c0ec50017038679',
			// 	{ data: state.teams }
			// );

			return {
				...state,
				teams: teams,
			};

		case SET_COMPDATA:
			let teamsRaw = state.teams;
			console.log('RUNNIGN SET COMP DATA');
			console.log(action.payload);
			let teamsFromPayload = action.payload;
			let newTeamsImport = [];
			// for (const teamNum of action.payload) {
			// newTeamsImport.push(new Team(teamNum, newTeamsImport.length));
			// }
			for (const team of teamsFromPayload) {
				console.log(newTeamsImport.length);
				let newTeam = new Team(team.teamNumber, newTeamsImport.length);
				newTeamsImport.push(newTeam);
				console.log('FROM IMPORT');
				console.log(newTeam);
				console.log('RAW');
				console.log(team);
				newTeam.setData(team);
			}
			return {
				...state,
				teams: newTeamsImport,
			};
		default:
			return state;
	}
};
export default dataReducer;
