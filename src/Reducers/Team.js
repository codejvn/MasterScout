import { isCompositeComponent } from "react-dom/test-utils";

export const autoDataProps = [
	{ aggre: 'startingPosAggre', name: 'Starting Position', id: 0 },
	{ aggre: 'boolavg', name: 'Cross Community', id: 1 },
	{ aggre: 'avg', name: 'Cones High', id: 2 },
	{ aggre: 'avg', name: 'Cones Mid', id: 3},
	{ aggre: 'avg', name: 'Cones Low', id: 4 },
	{ aggre: 'avg', name: 'Cones Missed', id: 5 },
	{ aggre: 'avg', name: 'Cubes High', id: 6 },
	{ aggre: 'avg', name: 'Cubes Mid', id: 7 },
	{ aggre: 'avg', name: 'Cubes Low', id: 8 },
	{ aggre: 'avg', name: 'Cubes Missed', id: 9 },
	{ aggre: 'cs', name: 'Charging Station', id: 10 },

];
export const teleopDataProps = [
	{ aggre: 'avg', name: 'Cones High', id: 0 },
	{ aggre: 'avg', name: 'Cones Mid', id: 1 },
	{ aggre: 'avg', name: 'Cones Low', id: 2 },
	{ aggre: 'avg', name: 'Cones Missed', id: 3 },
	{ aggre: 'avg', name: 'Cubes High', id: 4 },
	{ aggre: 'avg', name: 'Cubes Mid', id: 5 },
	{ aggre: 'avg', name: 'Cubes Low', id: 6 },
	{ aggre: 'avg', name: 'Cubes Missed', id: 7 },
	{ aggre: 'avg', name: 'Intake From Floor Comm', id: 8 },
	{ aggre: 'avg', name: 'Intake From Floor Gen', id: 9 },
	{ aggre: 'avg', name: 'Intake From Shelf', id: 10 },
	{ aggre: 'avg', name: 'Intake From Substation', id: 11 },
	{ aggre: 'avg', name: 'Defense Quantity', id: 12 },
	{ aggre: 'defQualAvg', name: 'Defense Quality', id: 13 },
];
export const endgameDataProps = [
	// { aggre: 'boolavg', name: 'Climbed?', id: 0 },
	{ aggre: 'cs', name: 'Charge Station', id: 0 },
	{ aggre: 'avg', name: 'Additional Robots', id: 1 },
	// { aggre: 'avg', name: 'Time Left', id: 2 },
	{ aggre: 'speed', name: 'Slow or Fast', id: 2 },
	{ aggre: 'option', name: 'Adjusted Pieces', id: 3 },
	{ aggre: 'option', name: 'Dropped Pieces While Cycling', id: 4 },
	{ aggre: 'option', name: 'Long Intake Time', id: 5 },
	{ aggre: 'option', name: 'Dropped When Hit', id: 6 },
	{ aggre: 'option', name: 'Triple Climb', id: 7 },
];//consider making slow or fast a mode, since it shouldnt change throughout a match
/*
	Aggregation Types:
	* mode: Finds the most common occurence  
	* avg: Averages the values among the set
	* boolavg: Create a percent based off of true or false values 
	* max: The maximum among a set
	* defQualAvg: new in 2023: calculates defense quality avg based on the matches where they actually played defense instead of all matches
	* speed: special for 2023, special kind of mode which does option, except for not just yes/no question
	* cs: special for 2023, stands for charging station, calculates the percent of matches in which a robot engages/docks in endgame and the percent it enagages in auto
	* option: for premade comment, counts num of true+false, accounts for no input, and for equal num for both
*/
export const aggreProps = [autoDataProps, teleopDataProps, endgameDataProps];
class Team {
	constructor(num, arrayPos) {
		this.teamNumber = num;
		this.arrayPosition = arrayPos;

		this.autoData = []; // direct auto data from all the scouts
		this.teleopData = [];
		this.endgameData = [];
		this.comments = [];
		this.scouts = [];

		// this.aggregated = [
		// 	[0, 0, 0, 0, 0, 0, 0], // equal to the length of auto data props
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // equal to the length of teleop data props
		// 	[0, 0, 0, 0, 0], // equal to the length of endgame data props
		// ];
		this.aggregated = [
			new Array(autoDataProps.length),
			new Array(teleopDataProps.length),
			new Array(endgameDataProps.length),
		];
		this.aggregated = this.aggregated.map((set) => {
			return set.fill(0);
		});
		this.matchNums = [];

		this.totaldata = [this.autoData, this.teleopData, this.endgameData];
		this.organizedDataSets = [[], [], []];
	}
	setData = (data) => {
		console.log('data in setData:');
		console.log(data);
		this.autoData = data.autoData;
		this.teleopData = data.teleopData;
		this.endgameData = data.endgameData;
		this.comments = data.comments;
		this.aggregated = data.aggregated;
		this.matchNums = data.matchNums;
		this.totaldata = data.totaldata;
		this.organizedDataSets = data.organizedDataSets;
		this.scouts = data.scouts;
	};
	appendData = (set) => {
		console.log('this is the comment');
		console.log(set.comments);
		console.log(set);
		console.warn(set);
		this.comments.push(set.comments);
		this.autoData.push(set.auto);
		this.teleopData.push(set.teleop);
		this.endgameData.push(set.endgame);
		this.matchNums.push(set.matchNums);
		this.scouts.push(set.scout);
		console.log("curent scouts");
		console.log(set.scouts);
		console.log("list of scouts");
		console.log(this.scouts);
	};
	getMatchData = (matchNum) => {
		let matchIndex = this.matchNums.findIndex((match) => match == matchNum);
		console.log("this is what endgameData looks like");
		console.log(this.endgameData);
		let data = {
			comment: this.comments[matchIndex],
			data: {
				auto: this.autoData[matchIndex],
				teleop: this.teleopData[matchIndex],
				endgame: this.endgameData[matchIndex],
			},
		};
		console.log("getMatchData in team.js");
		console.log(data);
		return data;
	};
	deleteData = (matchNum) => {
		let delIndex = this.matchNums.findIndex((match) => match == matchNum);

		this.matchNums.splice(delIndex, 1);
		this.autoData.splice(delIndex, 1);
		this.teleopData.splice(delIndex, 1);
		this.endgameData.splice(delIndex, 1);
		this.comments.splice(delIndex, 1);
		this.scouts.splice(delIndex, 1);

		this.aggregate();
	};
	/**
	 * Input section of match data and the index of the data you want
	 * @returns array of data from a specific category from all matches (like all auto; all teleop)
	 * @param1 the total set of data ie the auto data or teleop data
	 * @param2 the index of the data you want, this chooses what specifc data will be returned
	 */
	organizeIntoSet = (set, index) => {
		return set.reduce((totalData, matchData) => {
			totalData.push(matchData[index]);
			return totalData;
		}, []);
	};
	/**
	 * Input a whole set of data from a section (like the whole auto data)
	 * @returns nested arary of data organized into it's category
	 *
	 */
	organizeSet = (set, numOfDataPoints) => {
		console.log(set);
		console.log('DOING ORGANIZATION ' + numOfDataPoints);
		let ret = [];
		// ret.push(this.organizeIntoSet)
		for (let i = 0; i < numOfDataPoints; i++) {
			ret.push(this.organizeIntoSet(set, i));
		}
		return ret;
	};
	aggregateSet = (organizedSet, dataProps) => {
		// loop over all the organized data and condense them into a funciton
		return dataProps.map((prop) => {
			console.log("what the inputs to aggregate set are")
			console.log(organizedSet);
			/**
			 * Basically, the thing being passed into this function a 2d array where the 
			 * rows correspond to the index of the data items in a certain part (teleop,auton,endgame)
			 * and the array in each row is basically all of the values for that one data value for all the matches
			 * for example, the array for starting position is:
			 * 0: {value: 'A'}
			 * 1: {value: 'C'}
			 * 2: {value: 'A'}
			 * and etc. etc. showing how in the first match, this team started at A, and in match 2, they started at C
			 */
			console.log(prop.id);
			switch (prop.aggre) {
				case 'mode':
					// console.log(organizedSet[prop.id]);
					// console.log('Mode lol');
					return this.mode(organizedSet[prop.id]).value;
				case 'avg':
					// console.log(prop.name);
					//["11","2590","Nice","T",false,3,1,3,1,2,1,1,1,1,1,2,"Good",50,"H",30]
					return this.average(organizedSet[prop.id]);//returns the particular array with all of the data for that id
				case 'boolavg':
					return this.boolAverage(organizedSet[prop.id]);
				case 'max':
					return this.max(organizedSet[prop.id]);
				case 'speed':
					return this.speed(prop.id);//just returns the id, leaves the accessing to the method
				case 'option':
					return this.option(prop.id);
				case 'defQualAvg':
					return this.defAverage(prop.id);
				case 'startingPosAggre':
					return this.startingPos(prop.id);
				case 'cs':
					return this.csPercent(prop.id, organizedSet);
			}
		});
	};

	aggregate = () => {
		console.log('AGGERGATING TEAM ' + this.teamNumber);
		this.totaldata = [this.autoData, this.teleopData, this.endgameData];
		this.totaldata.forEach((set, i, a) => {
			this.organizedDataSets[i] = this.organizeSet(set, aggreProps[i].length);
			this.aggregated[i] = this.aggregateSet(
				this.organizedDataSets[i],
				aggreProps[i]
			);
		});
	};

	defAverage = (data) => {
		let total = 0.0;
		let matches = 0;
		let dataSpeed = {};
		for(let i = 0; i < this.matchNums.length; i++){
			console.log()
			dataSpeed = this.teleopData[i];
			console.log("option");
			console.log(dataSpeed);
			console.log(dataSpeed[data]);
			if(dataSpeed[data].value !== 0) {
				total += dataSpeed[data].value
				matches++;
			}
		}
		if(matches > 0){
			return total/matches;
		}
		else{
			return 0;
		}
	}

	csPercent = (dataID, orgSet) => {
		/**
		 * basically this method finds the % of matches in which the robot docks/engages in endgame and engages in auto 
		 */
			let total = 0.0;
			// let matches = 0;
			let data = orgSet[dataID];
			console.log("dataID in csPercent " + dataID);
			console.log("orgSet: ");
			console.log(orgSet);
			console.log("data array in csPercent");
			console.log(data);

			for(let i = 0; i < data.length; i++){
				// dataSpeed = this.teleopData[i];
				// console.log("cs percent");
				// console.log(dataSpeed);
				// console.log(dataSpeed[dataID]);
				if(orgSet.length == endgameDataProps.length){
				if(data[i].value == 6 || data[i].value == 10) {
					total++;
				}
			}
			if(orgSet.length == autoDataProps.length){
				if(data[i].value == 12) {
					total++;
				}
			}
			}
			console.log("the total num of times the team docked/engaged: " + total + ", in " + this.matchNums.length + " matches");
			if(data.length > 0){
				return total/data.length;
			}
			else{
				return 0;
			}
	
	}

	startingPos = (dataID) => {//possibly the most disgusting function ever written in the history of javascript
		console.log("what data looks like");
		console.log(dataID);
		let dataSpeed = {};
		let countA = 0;
		let countB = 0;
		let countC = 0;
		let countD = 0;
		let tot = [];
		let biggest = 0;
		let ans = [];
		let finalString = '';
		for(let i = 0; i < this.matchNums.length; i++){
			dataSpeed = this.autoData[i];
			console.log("startingpos");
			console.log(dataSpeed);
			console.log(dataSpeed[dataID]);
			if(dataSpeed[dataID].value === 'A') {
				console.log("adding to a");
				countA++;
			}
			else if (dataSpeed[dataID].value === 'B'){
				console.log("adding to b");
				countB++;
			}
			else if (dataSpeed[dataID].value === 'C'){
				console.log("adding to c");
				countC++;
			}
			else if (dataSpeed[dataID].value === 'D'){
				console.log("adding to d");
				countD++;
			}
		}
		console.log("countA: " + countA);
		console.log("countB: " + countB);
		console.log("countC: " + countC);
		console.log("countD: " + countD);
		tot.push(countA);
		tot.push(countB);
		tot.push(countC);
		tot.push(countD);
		biggest = Math.max(countA, countB,countC,countD);
		console.log("biggest");
		console.log(biggest);
		// switch(biggest){
		// 	case countA:
		// 		ans.push('A');
		// 	case countB:
		// 		ans.push('B');
		// 	case countC:
		// 		ans.push('C');
		// 	case countD:
		// 		ans.push('D');
		// }
		if(countA == biggest){
			ans.push('A');
		}
		if (countB == biggest){
			ans.push('B');
		}
		if(countC == biggest){
			ans.push('C');
		}
		if(countD == biggest){
			ans.push('D');
		}
		console.log("ans in team.js: ");
		console.log(ans);
		finalString += ans[0];
		for (let y = 1; y < ans.length; y++){
			console.log("accessing ans --> "+ ans[y]);
			finalString += ", " + ans[y];
		}
		console.log("finalString: " + finalString);
		return finalString;
	}
	highestClimb = () => {
		if (this.organizedDataSets[2].length > 0) {
			return this.organizedDataSets[2][0].sort((a, b) => b.value - a.value)[0];
		} else {
			return { value: 1 };
		}
	};

	average = (data) => {
		// console.log(data);
		return (data.reduce((a, b) => a + b.value, 0) / data.length).toFixed(3);
	};
	// average;
	boolAverage = (data) => {
		return (
			data.reduce((a, b) => {
				b = b.value ? 1 : 0;
				return a + b;
			}, 0) / data.length
		).toFixed(3);
	};
	max = (data) => (data) => Math.max(...data.value);

	option = (data) => {
		console.log("what data looks like");
		console.log(data);
		let dataSpeed = {};
		let yes = 0;
		let no = 0;
		for(let i = 0; i < this.matchNums.length; i++){
			dataSpeed = this.endgameData[i];
			console.log("option");
			console.log(dataSpeed);
			console.log(dataSpeed[data]);
			if(dataSpeed[data].value === true) {
				console.log("adding to yes");
				yes++;
			}
			else if (dataSpeed[data].value === false){
				console.log("adding to no");
				no++;
			}
		}
		if (yes > no){
			return 'Yes';
		}
		else if (no > yes){
			return 'No';
		}
		else if (yes == 0 && no == 0){
			return 'N/A';
		}
		else if (yes == no){
			return 'Yes/No';
		}
	}

	speed = (dataID) => {
		console.log("this is matchNums");
		console.log(this.matchNums)
		let dataSpeed = {};
		let slow = 0;
		let fast = 0;
		for(let i = 0; i < this.matchNums.length; i++){
			dataSpeed = this.endgameData[i];
			console.log("speed go vroom");
			console.log(dataSpeed);
			console.log(dataSpeed[dataID]);
			if(dataSpeed[dataID].value === 'Slow') {
				console.log("adding to slow");
				slow++;
			}
			else if (dataSpeed[dataID].value === 'Fast'){
				console.log("adding to fast");
				fast++;
			}
		}
		if (slow > fast){
			return 'Slow';
		}
		else if (fast > slow){
			return 'Fast';
		}
		else if (fast == 0 && slow == 0){
			return 'N/A';
		}
		else if (fast == slow){
			return 'Both';
		}

	};
		

	mode = (data) =>
		data.reduce(
			(a, b, i, arr) =>
				arr.filter((v) => v == a).length >= arr.filter((v) => v == b).length
					? a
					: b,
			null
		);
}
export default Team;
