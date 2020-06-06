const autoDataProps = [
  { aggre: "mode", name: "Starting Position", id: 0 },
  { aggre: "boolavg", name: "Crossed Init Line", id: 1 },
  { aggre: "avg", name: "Bottom Scored Auto", id: 2 },
  { aggre: "avg", name: "Outer Scored Auto", id: 3 },
  { aggre: "avg", name: "Inner Scored Auto", id: 4 },
  { aggre: "avg", name: "Init Line Attempted Auto", id: 5 },
  { aggre: "avg", name: "Near Trench Attempted Auto", id: 6 },
];
const teleopDataProps = [
  { aggre: "avg", name: "Bottom Scored", id: 0 },
  { aggre: "avg", name: "Outer Scored", id: 1 },
  { aggre: "avg", name: "Inner Scored", id: 2 },
  { aggre: "avg", name: "Missed", id: 3 },
  { aggre: "avg", name: "Cycles", id: 4 },
  { aggre: "boolavg", name: "CP Rotation", id: 5 },
  { aggre: "boolavg", name: "CP Position", id: 6 },
  { aggre: "avg", name: "T-Zone Attempted", id: 7 },
  { aggre: "avg", name: "Init-Line Attempted", id: 8 },
  { aggre: "avg", name: "Near Trench Attmpeted", id: 9 },
  { aggre: "avg", name: "Far Trench Attempted", id: 10 },
  { aggre: "avg", name: "Defense", id: 11 },
];
const endgameDataProps = [
  { aggre: "boolavg", name: "Climbed?", id: 0 },
  { aggre: "boolavg", name: "Leveled?", id: 1 },
  { aggre: "mode", name: "Most Common Climb Location", id: 2 },
  { aggre: "boolavg", name: "Parked?", id: 3 },
  { aggre: "avg", name: "Time Left", id: 4 },
];
export const aggreProps = [autoDataProps, teleopDataProps, endgameDataProps];
class Team {
  constructor(num, arrayPos) {
    this.teamNumber = num;
    this.arrayPosition = arrayPos;

    this.autoData = []; // direct auto data from all the scouts
    this.teleopData = [];
    this.endgameData = [];
    this.comments = [];

    this.aggregated = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
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
   * @returns arrayy of data from a specific category from all matches
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
        case "mode":
          console.log(organizedSet[prop.id]);
          console.log("Mode lol");
          return this.mode(organizedSet[prop.id]).value;
        case "avg":
          return this.average(organizedSet[prop.id]);
        case "boolavg":
          return this.boolAverage(organizedSet[prop.id]);
        case "max":
          return this.max(organizedSet[prop.id]);
      }
    });
  };

  aggregate = () => {
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
        " : " +
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
  max = (data) => {
    return (data) => Math.max(...data.value);
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
