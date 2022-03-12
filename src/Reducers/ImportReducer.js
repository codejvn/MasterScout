// import all types
import { ADD_DATA } from '../Actions/types';
import { MODIFY_DATA } from '../Actions/types';
import { CLEAR_DATA } from '../Actions/types';

let keyToLookFor = 0;
const matchesInitState = {
	data: [],
};
const findData = (data) => {
	return data.key == keyToLookFor;
};
const importReducer = (state = matchesInitState, action = {}) => {
	switch (action.type) {
		case ADD_DATA:
			let newData = state.data;
			console.log('from import reducer');
			console.log(action.payload);
			let parsedData = action.payload;
			const climbLevelIndex = 0;
			switch (parsedData.teleop[8].value) {
				case 'NA':
					parsedData.teleop[8].value = 0;
				case 'Awful':
					parsedData.teleop[8].value = 0;
					break;
				case 'Ok':
					parsedData.teleop[8].value = 1;
					break;
				case 'Good':
					parsedData.teleop[8].value = 2;
					break;
				case 'Great':
					parsedData.teleop[8].value = 3;
					break;
			}
			// forgive me father for this utter garbage
			switch (parsedData.endgame[climbLevelIndex].value) {
				case 'NA':
					parsedData.endgame[climbLevelIndex].value = 0;
					break;
				case 'Fail':
					parsedData.endgame[climbLevelIndex].value = 0;
					break;
				case 'L':
					parsedData.endgame[climbLevelIndex].value = 1;
					break;
				case 'M':
					parsedData.endgame[climbLevelIndex].value = 2;
					break;
				case 'H':
					parsedData.endgame[climbLevelIndex].value = 3;
					break;
				case 'T':
					parsedData.endgame[climbLevelIndex].value = 4;
					break;
			}
			parsedData.teleop[9].value = JSON.parse(parsedData.teleop[9].value);
			parsedData.endgame[climbLevelIndex + 1].value = JSON.parse(
				parsedData.endgame[climbLevelIndex + 1].value
			);
			parsedData.key = state.data.length;
			newData.unshift(parsedData);
			console.log('ADDING THAT DATA!');
			return {
				data: newData,
			};
		case MODIFY_DATA:
			let newDataSet = state.data;
			keyToLookFor = action.num;
			let index = newDataSet.findIndex(findData);
			let id = parseInt(action.dataId);
			let data = JSON.parse(action.data);
			switch (action.section) {
				case 'auto':
					//newDataSet[index].data.auto[id] = { id: id, value: action.data };
					newDataSet[index].data.auto[id].value = data;
					break;
				case 'teleop':
					newDataSet[index].data.teleop[id].value = data;
					break;
				case 'endgame':
					newDataSet[index].data.endgame[id].value = data;
					break;
				default:
					break;
			}
			return {
				data: newDataSet,
			};
		case CLEAR_DATA:
			return {
				data: [],
			};
		default:
			return state;
	}
};
export default importReducer;
