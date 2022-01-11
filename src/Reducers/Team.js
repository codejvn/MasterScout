export const autoDataProps = [
	{ aggre: 'mode', name: 'Auto Data Header', id: 0 },
];
export const teleopDataProps = [
	{ aggre: 'avg', name: 'Teleop Data Header', id: 0 },
];
export const endgameDataProps = [
	{ aggre: 'boolavg', name: 'Endgame Data Header', id: 0 },
];
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
		this.matchNums = [];

		this.totaldata = [this.autoData, this.teleopData, this.endgameData];
		this.organizedDataSets = [[], [], []];
	}
	setData = (data) => {
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
		this.comments.push(set.comment);
		this.autoData.push(set.data.auto);
		this.teleopData.push(set.data.teleop);
		this.endgameData.push(set.data.endgame);
		this.matchNums.push(set.matchNum);
	};
	getMatchData = (matchNum) => {
		let matchIndex = this.matchNums.findIndex((match) => match == matchNum);

		let data = {
			comment: this.comments[matchIndex],
			data: {
				auto: this.autoData[matchIndex],
				teleop: this.teleopData[matchIndex],
				endgame: this.endgameData[matchIndex],
			},
		};
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
		let ret = [];
		console.log(set);
		for (let i = 0; i < numOfDataPoints; i++) {
			ret.push(this.organizeIntoSet(set, i));
		}
		return ret;
	};

	aggregateSet = (organizedSet, dataProps) => {
		// loop over all the organized data and condense them into a funciton
		return dataProps.map((prop) => {
			let operation;
			switch (prop.aggre) {
				case 'mode':
					console.log(organizedSet[prop.id]);
					console.log('Mode lol');
					return this.mode(organizedSet[prop.id]).value;
				case 'avg':
					return this.average(organizedSet[prop.id]);
				case 'boolavg':
					return this.boolAverage(organizedSet[prop.id]);
				case 'max':
					return this.max(organizedSet[prop.id]);
			}
		});
	};

	aggregate = () => {
		console.log('AGGERGATING TEAM ' + this.teamNumber);
		this.totaldata.forEach((set, i, a) => {
			console.log(set);
			this.organizedDataSets[i] = this.organizeSet(set, aggreProps[i].length);
			this.aggregated[i] = this.aggregateSet(
				this.organizedDataSets[i],
				aggreProps[i]
			);
		});
	};

	average = (data) => {
		console.log(data);
		console.log(
			data.reduce((acc, current) => acc + current.value, 0) +
				' : ' +
				data.length
		);
		return data.reduce((a, b) => a + b.value, 0) / data.length;
	};
	boolAverage = (data) => {
		return (
			data.reduce((a, b) => {
				b = b.value ? 1 : 0;
				return a + b;
			}, 0) / data.length
		);
	};
	max = (data) => (data) => Math.max(...data.value);

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
