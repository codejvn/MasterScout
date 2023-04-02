import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import ReactApexChart from 'react-apexcharts';
export class EnhancedCharts extends Component {
	constructor(props) {
		super(props);
		this.state = {
            options: {
                chart: {
                  type: 'bar',
                  height: 350,
                  stacked: true,
                  stackType: 'normal'
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                    dataLabels: {
                      total: {
                        enabled: true,
                        offsetX: 0,
                        style: {
                          fontSize: '13px',
                          fontWeight: 900
                        }
                      }
                    }
                  },
                },
                stroke: {
                  width: 1,
                  colors: ['#fff']
                },
                title: {
                  text: 'Game Pieces Scored'
                },
                xaxis: {
                  type: 'numeric',
                  categories: ['High', 'Mid', 'Low'],
                  labels: {
                    formatter: (val) => {return val}
                  },
                  tickPlacement: 'on',
                  decimalsInFloat: 2,
                  tickAmount: 5,
                },
                yaxis: {
                  title: {
                    text: undefined
                  },
                },
                tooltip: {
                  y: {
                    formatter:  (val) => {return val}
                  }
                },
                fill: {
                  opacity: 1,
                  colors: ['#ecde0c', '#a718b2']
                },
                colors : ['#ecde0c', '#a718b2'],
                legend: {
                  position: 'top',
                  horizontalAlign: 'left',
                  offsetX: 40,
                }
              },
        }
	}
	// getData = () => {
	// 	let data = [];
	// 	for (const dataSet of this.props.dataSets) {
	// 		let dataValues = [];
	// 		console.log(this.props);
	// 		try {
	// 			dataValues = dataSet.data.map((thing) => thing.value);
	// 		} catch (err) {
	// 			// console.log(err);

	// 			dataValues = [];
	// 		}
	// 		data.push({
	// 			label: dataSet.teamNumber,
	// 			fill: true,
	// 			lineTension: 0.5,
	// 			backgroundColor: this.colors[data.length],
	// 			borderColor: 'rgba(0,0,0,1)',
	// 			borderWidth: 1,
	// 			data: dataValues,
	// 		});
	// 	}
	// 	return {
	// 		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	// 		datasets: data,
	// 	};
	// };



/**
 * basically how the data should be inputted to generate the right chart is that under cones and cubes you have all the data for that
 */
  /**
   * 
   * @returns the 3 charts for comapre, which compare the game pieces scored for all teams chosen to compare
   */
    getDataCompare = () => {
      //cones of each, cubes of each
      try{
      let series = [[],[],[]];
      let teams = this.props.team;
      let headers = [];
      let chartTitles = ['High', 'Mid', 'Low'];
      let barHeaders = ['Cones', 'Cubes'];
      let i = 0;
      let index = 0;
      let diff = 4;
      let info = [];
      let cubes = false;
      console.log("teams array in getdatacompare");
      console.log(teams);
      //do everything for cones first
      //meaning cones high for all teams 
      for(let i = 0; i < teams.length; i++){
        headers.push(teams[i].teamNumber+"");
      }
      for(const title of chartTitles){
      for(const header of barHeaders){//does all cones and then all cubes 
        info = [];
      for(let i = 0; i < teams.length; i++){
        let team = teams[i];
        console.log('team in the loop');
        console.log(team);
        if(cubes){
        info.push(team.aggregated[1][index + diff]);
        }
        else{
          info.push(team.aggregated[1][index]);
        }
      }
      console.log('info in get data compare');
      console.log(info)
      series[i].push({
        name: header,
        data: info
      });
      cubes = !cubes;
      }
      i++;
      index++;
    }
    // this.setState({...this.state, categories: headers, text: ''});
    let st = {...this.state.options, xaxis: {...this.state.options.xaxis, categories: headers}, chart: {...this.state.options.chart, height: 100}}//sets the object in options
    console.log('fake state');
        console.log(st);
      console.log('series in getdatacompare');
      console.log(series);
    return (
      <div>
        <ReactApexChart options={{...st, title: {text: 'Game Pieces Scored ' + chartTitles[0]}}} series={series[0]} type={"bar"} height={350}/>
        <ReactApexChart options={{...st, title: {text: 'Game Pieces Scored ' + chartTitles[1]}}} series={series[1]} type={"bar"} height={350}/>
        <ReactApexChart options={{...st, title: {text: 'Game Pieces Scored ' + chartTitles[2]}}} series={series[2]} type={"bar"} height={350}/>
      </div>
    );
      }
      catch{
        return null;
      }
    }
    getData = () => {
        console.log("doing enhanced charts for team breakdown");
        let series1 = [];
        let headers = ['Cones', 'Cubes']; 
        let info = [];
        let index = 0;
        let barTitles = ['High', 'Mid', 'Low'];
        console.log("team in getData of enhanced");
        console.log(this.props.team[0]);
        for(const header of headers){//do cones high mid low, then cubes high mid low 
            info = [];
            for(let i = 0; i < 3; i++){
            info.push(this.props.team[0].aggregated[1][index]);
            index++;
            }
            series1.push({
                name: header,
                data: info
            });
            index++;
        }
        console.log("series in getData");
        console.log(series1);
        let st = {...this.state.options, xaxis: {...this.state.options.xaxis, categories: barTitles}, title: {text: 'Game Pieces Scored '}};
        // this.setState({...this.state, categories: ['High', 'Mid', 'Low'], text: 'Game Pieces Scored'});
        console.log('fake state in teambreakdown enhanced');
        console.log(st)
        return(<div>
          <ReactApexChart options={st} series={series1} type={"bar"} height={350}/>
        </div>);
    }
    chooseGetData = (teams) => {
      console.log("props w teams");
      console.log(teams);
      console.log(teams !== undefined);
      console.log(this.props.compare);
      if(typeof teams !== "undefined"){
      if(this.props.compare){return this.getDataCompare();}
      else{
        return this.getData();
      }
    }
    else{
      return null;
    }
    }
	render() {
		return (
			// <div>
      //           <ReactApexChart options={this.state.options} series={this.getData()} type={"bar"} height={350}/>
			// </div>
      this.chooseGetData(this.props.team)
		);
	}
}

export default EnhancedCharts;
