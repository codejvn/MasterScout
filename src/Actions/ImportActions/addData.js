import { ADD_DATA } from '../types';
export const addData = (data) => {
	console.log(data);
	console.log(typeof data);
	let newData = JSON.parse(data).map((num) => {
		return { value: num };
	});
	const commentIndex = 2;
	const matchNumIndex = 0;
	console.warn(newData);
	let parsedData = {};
	parsedData.comments = newData[commentIndex].value;
	parsedData.teamNum = JSON.parse(data)[1];
	parsedData.auto = newData.slice(3, 9);
	parsedData.teleop = newData.slice(9, 19);
	parsedData.endgame = newData.slice(19, 21);
	// parsedData.matchNums = JSON.parse(d ata)[0];
	parsedData.matchNums = newData[matchNumIndex].value;
	parsedData.scout = newData[newData.length - 1].value;
	console.warn(parsedData);
	return (dispatch) => {
		dispatch({
			type: ADD_DATA,
			payload: parsedData,
		});
	};
};
