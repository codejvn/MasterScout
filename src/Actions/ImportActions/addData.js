import { ADD_DATA } from '../types';
export const addData = (data) => {
	console.log(data);
	console.log(typeof data);
	let newData = JSON.parse(data).map((num) => {
		return { value: num };
	});
	const commentIndex = 2;
	const matchNumIndex = 0;
	const autoBegin = 3;
	const autoEnd = 14;
	const teleopBegin = 14;
	const teleopEnd = 24;
	const endgameBegin = 24;
	const endgameEnd = 28;
	console.warn(newData);
	let parsedData = {};
	parsedData.comments = newData[commentIndex].value;
	parsedData.teamNum = JSON.parse(data)[1];
	parsedData.auto = newData.slice(autoBegin, autoEnd);
	parsedData.teleop = newData.slice(teleopBegin, teleopEnd);
	parsedData.endgame = newData.slice(endgameBegin, endgameEnd);
	// parsedData.matchNums = JSON.parse(d ata)[0];
	parsedData.matchNums = newData[matchNumIndex].value;
	parsedData.scout = newData[newData.length - 1].value;
	console.log("parsedData");
	console.warn(parsedData);
	return (dispatch) => {
		dispatch({
			type: ADD_DATA,
			payload: parsedData,
		});
	};
};
