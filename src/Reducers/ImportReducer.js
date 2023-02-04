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
			const climbLevelIndex = 1;
			console.log("orig teleop data");
			console.log(parsedData.teleop);
			const csAutoIndex = 10;
			const csEndgameIndex = 1;
			const timeLeftIndex = 3;
			const intakeFromIndex = 8;
			const startingPosIndex = 0;
			// switch (parsedData.teleop[8].value) {
			// 	case 'NA':
			// 		parsedData.teleop[8].value = 0;
			// 	case 'Awful':
			// 		parsedData.teleop[8].value = 0;
			// 		break;
			// 	case 'Ok':
			// 		parsedData.teleop[8].value = 1;
			// 		break;
			// 	case 'Good':
			// 		parsedData.teleop[8].value = 2;
			// 		break;
			// 	case 'Great':
			// 		parsedData.teleop[8].value = 3;
			// 		break;
			// }
			// forgive me father for this utter garbage
			// switch (parsedData.endgame[climbLevelIndex].value) {
			// 	case 'NA':
			// 		parsedData.endgame[climbLevelIndex].value = 0;
			// 		break;
			// 	case 'Fail':
			// 		parsedData.endgame[climbLevelIndex].value = 0;
			// 		break;
			// 	case 'L':
			// 		parsedData.endgame[climbLevelIndex].value = 1;
			// 		break;
			// 	case 'M':
			// 		parsedData.endgame[climbLevelIndex].value = 2;
			// 		break;
			// 	case 'H':
			// 		parsedData.endgame[climbLevelIndex].value = 3;
			// 		break;
			// 	case 'T':
			// 		parsedData.endgame[climbLevelIndex].value = 4;
			// 		break;
			// }
			switch (parsedData.auto[csAutoIndex].value){
				case 'N/A':
					parsedData.auto[csAutoIndex].value = 0;
				case 'None':
					parsedData.auto[csAutoIndex].value = 0;
				case 'Docked':
					parsedData.auto[csAutoIndex].value = 1;
				case 'Engaged':
					parsedData.auto[csAutoIndex].value = 2;
			}
			switch (parsedData.endgame[csEndgameIndex].value){
				case 'N/A':
					parsedData.endgame[csEndgameIndex].value = 0;
				case 'None':
					parsedData.endgame[csEndgameIndex].value = 0;
				case 'Docked':
					parsedData.endgame[csEndgameIndex].value = 1;
				case 'Engaged':
					parsedData.endgame[csEndgameIndex].value = 2;
			}
			switch (parsedData.teleop[intakeFromIndex].value){
				case 'Floor':
					parsedData.teleop[intakeFromIndex].value = 1;
				case 'Shelf':
					parsedData.teleop[intakeFromIndex].value = 1;
				case 'Both':
					parsedData.teleop[intakeFromIndex].value = 2;
			}
			console.log(parsedData.teleop[9].value);
			
			parsedData.teleop[9].value = JSON.parse(parsedData.teleop[9].value);
			console.log(parsedData.endgame[climbLevelIndex + 1].value);
			parsedData.endgame[timeLeftIndex].value = JSON.parse(
				parsedData.endgame[timeLeftIndex].value
			);
			parsedData.endgame[startingPosIndex].value = JSON.parse(
				parsedData.endgame[startingPosIndex].value
			);
			// parsedData.endgame[timeLeftIndex].value = JSON.parse(
			// 	parsedData.endgame[timeLeftIndex].value
			// );
			parsedData.key = state.data.length;
			newData.unshift(parsedData);
			console.log('ADDING THAT DATA!');
			return {
				data: newData,
			};
		case MODIFY_DATA:
			console.log(action);
			let newDataSet = state.data;
			keyToLookFor = action.num;
			let index = newDataSet.findIndex(findData);
			let id = parseInt(action.dataId);
			if (action.data == '') {
				return {
					data: newDataSet,
				};
			}
			let data = JSON.parse(action.data);
			console.warn(newDataSet);
			console.log(id);
			switch (action.section) {
				case 'auto':
					//newDataSet[index].data.auto[id] = { id: id, value: action.data };
					newDataSet[index].auto[id].value = data;
					break;
				case 'teleop':
					newDataSet[index].teleop[id].value = data;
					break;
				case 'endgame':
					newDataSet[index].endgame[id].value = data;
					break;
				case 'teamnum':
					console.log('UPDATING THE TAEM NUMBER');
					newDataSet[index].teamNum = data;
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
