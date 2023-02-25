export const autoDataProps = [
	{ aggre: 'mode', name: 'Starting Position', id: 0 },
	{ aggre: 'boolavg', name: 'Cross Community', id: 1 },
	{ aggre: 'avg', name: 'Cones High', id: 2 },
	{ aggre: 'avg', name: 'Cones Mid', id: 3},
	{ aggre: 'avg', name: 'Cones Low', id: 4 },
	{ aggre: 'avg', name: 'Cones Missed', id: 5 },
	{ aggre: 'avg', name: 'Cubes High', id: 6 },
	{ aggre: 'avg', name: 'Cubes Mid', id: 7 },
	{ aggre: 'avg', name: 'Cubes Low', id: 8 },
	{ aggre: 'avg', name: 'Cubes Missed', id: 9 },
	{ aggre: 'avg', name: 'Charging Station', id: 10 },

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
	{ aggre: 'avg', name: 'Intake From Floor', id: 8 },
	{ aggre: 'avg', name: 'Intake From Shelf', id: 9 },
	{ aggre: 'avg', name: 'Intake From Substation', id: 10 },
	{ aggre: 'avg', name: 'Defense Quantity', id: 11 },
	{ aggre: 'avg', name: 'Defense Quality', id: 12 },
];
export const endgameDataProps = [
	// { aggre: 'boolavg', name: 'Climbed?', id: 0 },
	{ aggre: 'avg', name: 'Charge Station', id: 0 },
	{ aggre: 'avg', name: 'Additional Robots', id: 1 },
	{ aggre: 'avg', name: 'Time Left', id: 2 },
	{ aggre: 'speed', name: 'Slow or Fast', id: 3 },
	{ aggre: 'boolavg', name: 'Adjusted Pieces', id: 4 },
	{ aggre: 'boolavg', name: 'Dropped Pieces', id: 5 },
	{ aggre: 'boolavg', name: 'Long Intake Time', id: 6 },
];//consider making slow or fast a mode, since it shouldnt change throughout a match
/*
	Aggregation Types:
	* mode: Finds the most common occurence  
	* avg: Averages the values among the set
	* boolavg: Create a percent based off of true or false values 
	* max: The maximum among a set
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
		console.log('data:');
		console.log(data);
		this.autoData = data.autoData;
		this.teleopData = data.teleopData;
		this.endgameData = data.endgameData;
		this.comments = data.comments;
		this.aggregated = data.aggregated;
		this.matchNums = data.matchNums;
		this.totaldata = data.totaldata;
		this.organizedDataSets = data.organizedDataSets;
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
			switch (prop.aggre) {
				case 'mode':
					// console.log(organizedSet[prop.id]);
					// console.log('Mode lol');
					return this.mode(organizedSet[prop.id]).value;
				case 'avg':
					// console.log(prop.name);
					//["11","2590","Nice","T",false,3,1,3,1,2,1,1,1,1,1,2,"Good",50,"H",30]
					return this.average(organizedSet[prop.id]);
				case 'boolavg':
					return this.boolAverage(organizedSet[prop.id]);
				case 'max':
					return this.max(organizedSet[prop.id]);
				case 'speed':
					return this.speed();
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

	speed = () => {
		console.log("this is matchNums");
		console.log(this.matchNums)
		let dataSpeed = {};
		let slow = 0;
		let fast = 0;
		for(let i = 0; i < this.matchNums.length; i++){
			dataSpeed = this.endgameData[i];
			console.log("speed go vroom");
			console.log(dataSpeed);
			console.log(dataSpeed[3]);
			if(dataSpeed[3].value === 'Slow') {
				console.log("adding to slow");
				slow++;
			}
			else{
				console.log("adding to fast");
				fast++;
			}
		}
		if (slow > fast){
			return 'Slow';
		}
		else{
			return 'Fast';
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
