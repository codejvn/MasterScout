const autoDataProps = [
  { aggre: "mode", name: "Starting Position", id: 0 },
  { aggre: "boolavg", name: "Crossed Init Line", id: 1 },
  { aggre: "avg", name: "Bottom Scored Auto", id: 2 },
  { aggre: "avg", name: "Outer Scored Auto", id: 3 },
  { aggre: "avg", name: "Inner Scored Auto", id: 4 },
  { aggre: "avg", name: "Init Line Attmpeted Auto", id: 5 },
  { aggre: "avg", name: "Near Trench Attmpeted Auto", id: 6 },
];
const teleopDataProps = [];
const endgameDataProps = [];
const aggreProps = [autoDataProps, teleopDataProps, endgameDataProps];
class Team {
  constructor(num, arrayPos) {
    this.teamNumber = num;
    this.arrayPosition = arrayPos;

    this.autoData = []; // direct auto data from all the scouts
    this.teleopData = [];
    this.endgameData = [];
    this.comments = [];

    this.aggregated = [];
    this.matchNums = [];

    this.totaldata = [this.autoData, this.teleopData, this.endgameData];
    this.organizedDataSets = [[], [], []];
  }
  appendData = (set) => {
    console.log("This is the set thats being added!!");
    this.comments.push(set.comment);
    this.autoData.push(set.data.auto);
    this.teleopData.push(set.data.teleop);
    this.endgameData.push(set.data.endgame);
    console.log(set);
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
    });
  };
  /**
   * Input a whole set of data from a section (like the whole auto data)
   * @returns nested arary of data organized into it's category
   *
   */
  organizeSet = (set, numOfDataPoints) => {
    let ret = [];
    for (let i = 0; i < numOfDataPoints; i++) {
      ret.push(this.organizeIntoSet(set), i);
    }
    return ret;
  };

  aggregateSet = (organizedSet, dataProps) => {
    // loop over all the organized data and condense them into a funciton
    return dataProps.map((prop) => {
      let operation;
      switch (prop.aggre) {
        case "mode":
          operation = this.mode;
          break;
        case "avg":
          operation = this.mode;
          break;
        case "boolavg":
          operation = this.mode;
          break;
        case "max":
          operation = this.mode;
          break;
      }
      return operation(organizedSet);
    });
  };

  aggregate = () => {
    this.sets.forEach((set, i, a) => {
      this.organizedDataSets[i] = this.organizeSet(
        set[i],
        aggreProps[i].length
      );
      this.aggregated[i] = this.aggregateSet(this.organizedDataSets[i]);
    });
  };

  average = (data) => {
    return data.reduce((a, b) => a + b, 0) / data.length;
  };
  boolAverage = (data) => {
    return (
      data.reduce((a, b) => {
        a = a ? 1 : 0; // evaluates the value to 0 or 1
        b = b ? 1 : 0;
        return a + b;
      }) / data.length
    );
  };
  max = (data) => {
    return (data) => Math.max(...data);
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
