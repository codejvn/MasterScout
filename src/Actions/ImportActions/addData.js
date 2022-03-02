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
	parsedData.auto = newData.slice(3, 10);
	parsedData.teleop = newData.slice(10, 19);
	parsedData.endgame = newData.slice(19);
	parsedData.matchNums = newData[matchNumIndex].value;
	console.warn(parsedData);
	return (dispatch) => {
		dispatch({
			type: ADD_DATA,
			payload: parsedData,
		});
	};
};
