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
			// console.log(teamsRaw);
			// console.log(action.payload);
			for (const team of teamsRaw) {
				let teamFromImport = action.payload.find(
					(teamFromImport) => teamFromImport.teamNumber == team.teamNumber
				);
				console.log('FROM IMPORT');
				console.log(teamFromImport);
				console.log('RAW');
				console.log(team);
				team.setData(teamFromImport);
			}
			return {
				...state,
				teams: teamsRaw,
			};
		default:
			return state;
	}
};
export default dataReducer;
