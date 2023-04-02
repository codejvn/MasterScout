import React, { useEffect, useState } from 'react';
import LineGraph from '../../LineGraph';
import { connect, useSelector, useStore, shallowEqual } from 'react-redux';
import { AutoChart } from './AutoChart.js';
import EndgameChart from './EndgameChart.js';
import TeleopChart from './TeleopChart.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Center, UnorderedList, ListItem, Box } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/layout';
import { Grid, GridItem } from '@chakra-ui/react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { aggreProps } from '../../../Reducers/Team';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { autoDataProps } from '../../../Reducers/Team';
import { teleopDataProps } from '../../../Reducers/Team';
import { endgameDataProps } from '../../../Reducers/Team';
import EnhancedCharts from '../../EnhancedCharts';

export default function TeamBreakdown2(props) {
	// const autoScoreData = [
	// 	{
	// 		name: 'Cross Tarmac',
	// 		point: 5,
	// 		aggreIndex: 1,
	// 	},
	// 	{
	// 		name: 'Upper Hub',
	// 		point: 4,
	// 		aggreIndex: 2,
	// 	},
	// 	{
	// 		name: 'Lower Hub',
	// 		point: 2,
	// 		aggreIndex: 3,
	// 	},
	// ];
	// const teleopScoreData = [
	// 	{
	// 		name: 'Upper Hub',
	// 		point: 2,
	// 		aggreIndex: 0,
	// 	},
	// 	{
	// 		name: 'Lower Hub',
	// 		point: 1,
	// 		aggreIndex: 2,
	// 	},
	// ];
	// const endgameScoreData = [
	// 	{
	// 		name: 'Climb',
	// 	},
	// ];
	const { teamSearched } = useSelector((state) => state.search, shallowEqual);
	const dataReducer = useSelector((state) => state.dataReducer, shallowEqual);
	const [team, setTeam] = useState(null);
	const [searchedOnce, setSearchedOnce] = useState(false);
	const [renderCount, setRenderCount] = useState(0);
	const preMadeIndexStart = 2;
	// let getTotalConesData = (teams) => {
	// 	let data = [];
	// 	for (let i = 0; i < teams[0].organizedDataSets.length; i++){
	// 		for(let j = 0; j < teams[0].organizedDataSets[i].length; j++){

	// 		}
	// 	}
	// }

	
	let doCharts = (teams) => {//method for all of the line graphs at the bottom
		let charts = [];
		let headers = ['Auto', 'Teleop', 'Endgame'];
		if (teams.length > 0) {
			// loop through all the entries in organized data set and then access the team data
			for (let i = 0; i < teams[0].organizedDataSets.length; i++) {
				let sectionCharts = [[<Col></Col>, <Col></Col>, <Col></Col>]];
				// loops through auto teleop and endgame
				for (let j = 0; j < teams[0].organizedDataSets[i].length; j++) {
					// loops through each part of the game like auto inner scored, auto outer scored over all matches played
					if(i == 0 && j == 0){
						j++;
					}
					if(i == 2 && j == preMadeIndexStart){
						break;
					}
					console.log(teams[0].organizedDataSets[i]);
					let dataSets = [];
					for (const team of teams) {
						dataSets.push({
							data: team.organizedDataSets[i][j],
							teamNumber: team.teamNumber,
						});
					}
					if (j % 3 == 0) {
						sectionCharts.push([<Col></Col>, <Col></Col>, <Col></Col>]);
					}
					sectionCharts[sectionCharts.length - 1][j % 3] = (
						<Col>
							<LineGraph title={aggreProps[i][j].name} dataSets={dataSets} />
						</Col>
					);
				}
				charts.push(
					// <Accordion style={formWidth}>
					<Card style={collapseStyling}>
						{/* <Accordion.Toggle as={Card.Header} eventKey={JSON.stringify(i)}>
								{headers[i]}
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={JSON.stringify(i)}> */}
						<Center>
							<Heading size='lg' p='1%'>
								{headers[i]}
							</Heading>
						</Center>
						<Card.Body style={makeWhite}>
							<Container>
								{sectionCharts.map((row) => {
									return <Row>{row}</Row>;
								})}
							</Container>
						</Card.Body>
						{/* </Accordion.Collapse> */}
					</Card>
					// </Accordion>
				);
			}
			charts.push(
			<Card style={collapseStyling}>
						{/* <Accordion.Toggle as={Card.Header} eventKey={JSON.stringify(i)}>
								{headers[i]}
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={JSON.stringify(i)}> */}
						<Center>
							<Heading size='lg' p='1%'>
								{"Enhanced"}
							</Heading>
						</Center>
						<Card.Body style={makeWhite}>
							<Container>
								<EnhancedCharts team={teams} compare={false}/>
							</Container>
						</Card.Body>
						{/* </Accordion.Collapse> */}
					</Card>
					);
		}
		return charts;
	};
	console.log(team);
	console.log(teamSearched);
	if (teamSearched != '' && team == null) {
		console.log('searched for an actual team');
		console.log(teamSearched);
		console.log(dataReducer.teams);
		console.log(
			dataReducer.teams.find((team) => teamSearched == team.teamNumber)
		);
		// if (teamSearched != team.teamNumber) {
		setTeam(dataReducer.teams.find((team) => teamSearched == team.teamNumber));
		setSearchedOnce(true);
		// }
	} else if (teamSearched != '' && searchedOnce) {
		if (teamSearched != team.teamNumber) {
			setTeam(
				dataReducer.teams.find((team) => teamSearched == team.teamNumber)
			);
		}
	}
	if (team == null || team == {}) {
		console.log(team);
		console.log('empty team no breakdown section 4 u lolw');
		return <Heading>No Team Searched</Heading>;
	}
	return (
		<Center w='100%'>
			{(() => {
				console.log('re render moment');
			})()}

			<Grid templateColumns='repeat(2, 1fr)' gap={6} w='100%' mr='5%'>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<Heading w='100%' textAlign='center'>
							Team {teamSearched} Breakdown
						</Heading>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<h3>Most Common Starting Position: {team.aggregated[0][0]}</h3>
					</Center>
				</GridItem>

				<GridItem>
					<Center>
						<Heading size='md'>Autonomous</Heading>
					</Center>
				</GridItem>

				<GridItem w='100%'>
					<Tabs defaultActiveKey='bar' id='uncontrolled-tab'>
						<Tab eventKey='bar' title='Bar'>
							<AutoChart team={team} />
						</Tab>
						<Tab eventKey='line' title='Line'>
							{(() => {
								const autoIndices = [2, 3, 4, 5, 6, 7, 8, 9, 10]; // indexes of the datapoints you want to have in the line hraph tab
								console.log('logging from component');
								console.log(team);
								if (team.organizedDataSets[0].length < 1) {
									console.log('NOT ENOUGH DATA');
									return (
										<Text>
											Add More Data To Produce a Breakdown For This Team
										</Text>
									);
								} else {//data: team.organizedDataSets[0][index],
									const dataSet = autoIndices.map((index) => ({
										data: team.organizedDataSets[0][index],
										teamNumber: autoDataProps[index].name,
									}));
									console.log("dataset");
									console.log(dataSet);
									return (
										// <h2>nana</h2>
										<LineGraph
											style={lineWidth}
											title='AUTONOMOUS'
											dataSets={dataSet}
										/>
									);
								}
							})()}
						</Tab>
					</Tabs>
				</GridItem>

				<GridItem>
					<Center>
						<Heading size='md'>Teleoperated</Heading>
					</Center>
				</GridItem>
				<GridItem w='100%'>
					<Tabs defaultActiveKey='bar' id='uncontrolled-tab'>
						<Tab eventKey='bar' title='Bar'>
							<TeleopChart team={team} />
						</Tab>
						<Tab eventKey='line' title='Line'>
							{(() => {
								const teleopIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]; // indexes of the datapoints you want in the line graph tab top of bar graphs
								console.log('logging from component');
								console.log(team);
								if (team.organizedDataSets[0].length < 1) {
									console.log('NOT ENOUGH DATA');
									return (
										<Text>
											Add More Data To Produce a Breakdown For This Team
										</Text>
									);
								} else {
									const dataSet = teleopIndices.map((index) => ({
										data: team.organizedDataSets[1][index],
										teamNumber: teleopDataProps[index].name,
									}));
									return (
										<LineGraph
											style={lineWidth}
											title='Teleop'
											dataSets={dataSet}
										/>
									);
								}
							})()}
						</Tab>
					</Tabs>
				</GridItem>

				<GridItem>
					<Center>
						<Heading size='md'>Endgame</Heading>
					</Center>
				</GridItem>
				<GridItem w='100%'>
					<Tabs defaultActiveKey='bar' id='uncontrolled-tab'>
						<Tab eventKey='bar' title='Bar'>
							<EndgameChart team={team} />
						</Tab>
						<Tab eventKey='line' title='Line'>
							{(() => {
								const endgameIndicies = [0,1,2]; // indexes of the datapoints you want to adjust
								console.log('logging from component');
								console.log(team);
								if (team.organizedDataSets[0].length < 1) {
									console.log('NOT ENOUGH DATA');
									return (
										<Text>
											Add More Data To Produce a Breakdown For This Team
										</Text>
									);
								} else {
									const dataSet = endgameIndicies.map((index) => ({
										data: team.organizedDataSets[2][index],
										teamNumber: endgameDataProps[index].name,
									}));
									console.log("dataset when rendering line graphs");
									console.log(dataSet);
									return (
										<LineGraph
											style={lineWidth}
											title='Endgame'
											dataSets={dataSet}
										/>
									);
								}
							})()}
						</Tab>
					</Tabs>
				</GridItem>
				{/**make the following a) dynamic and b) in its own class */}
				<GridItem colSpan={2}>
					<Center w='100%'>
						<Heading w='100%' textAlign='center'>
							Comments
						</Heading>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<h3>Slow/Fast: {team.aggregated[2][2]}</h3>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<h3>Adjusted Pieces?: {team.aggregated[2][3]}</h3>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<h3>Dropped Many Pieces While Cycling?: {team.aggregated[2][4]}</h3>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<h3>Long Time to Intake?: {team.aggregated[2][5]}</h3>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<h3>Dropped When Hit?: {team.aggregated[2][6]}</h3>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>
					<Center w='100%'>
						<h3>Triple Climb?: {team.aggregated[2][7]}</h3>
					</Center>
				</GridItem>
				<GridItem w='100%' colSpan={2} rowSpan={3}>
					<Center w='100%'>
						{/** araash */}
						<Grid templateColumns='repeat(3, 1fr)'>
							{team.comments.map((comment) => (
								<GridItem>
									<Box
										maxW='sm'
										borderWidth='1px'
										borderRadius='lg'
										overflow='hidden'
										p={6}
									>
										<Center w='100%'>
											<Text>
												{comment != '' ? comment : 'No Comment Given'}
											</Text>
										</Center>
									</Box>
								</GridItem>
							))}
						</Grid>
					</Center>
				</GridItem>
				<GridItem colSpan={2}>{doCharts([team])}</GridItem>
				{/* <GridItem w='100%' colSpan={2}>
					<Center w='100%'>
						<Heading w='100%' textAlign='center'>
							Score Breakdown
						</Heading>
					</Center>
				</GridItem> */}
				{/* <GridItem w='100%' colSpan={2}>
					<Center w='100%'>
						<Table w='100%' textAlign='center'>
							<Thead>
								<Tr textAlign='center'>
									<Th textAlign='center'>Scoring Criteria</Th>
									<Th textAlign='center'>Point Value</Th>
									<Th textAlign='center'>Average Points Per Match</Th>
									<Th textAlign='center'>Game Phase</Th>
								</Tr>
							</Thead>
							<Tbody>
								{autoScoreData.map(({ name, point, aggreIndex }) => {
									return (
										<Tr textAlign='center'>
											<Td>{name}</Td>
											<Td>{point}</Td>
											<Td>{team.aggregated[0][aggreIndex] * point}</Td>
											<Td>Auto</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</Center>
				</GridItem> */}
			</Grid>
		</Center>
	);
}
const lineWidth = {
	width: '26%',
};
const formWidth = {
	width: '100%',
};
const makeWhite = {
	backgroundColor: 'white',
};
const collapseStyling = {
	width: '100%',
	marginTop: '2vh',
	backgroundColor: 'rgba(75, 192, 192, 0.2)',
};
