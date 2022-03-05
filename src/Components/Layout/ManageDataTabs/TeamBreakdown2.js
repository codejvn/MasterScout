import React, { useEffect, useState } from 'react';
import LineGraph from '../../LineGraph';
import { connect, useSelector, useStore, shallowEqual } from 'react-redux';
import { AutoChart } from './AutoChart.js';
import EndgameChart from './EndgameChart.js';
import TeleopChart from './TeleopChart.js';
import CommentBox from './CommentBox.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Center } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/layout';
import { Grid, GridItem } from '@chakra-ui/react';
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
} from '@chakra-ui/react';
import { autoDataProps } from '../../../Reducers/Team';
import { teleopDataProps } from '../../../Reducers/Team';
import { endgameDataProps } from '../../../Reducers/Team';

export default function TeamBreakdown2(props) {
	const autoScoreData = [
		{
			name: 'Cross Tarmac',
			point: 5,
			aggreIndex: 1,
		},
		{
			name: 'Upper Hub',
			point: 4,
			aggreIndex: 2,
		},
		{
			name: 'Lower Hub',
			point: 2,
			aggreIndex: 3,
		},
	];
	const teleopScoreData = [
		{
			name: 'Upper Hub',
			point: 2,
			aggreIndex: 0,
		},
		{
			name: 'Lower Hub',
			point: 1,
			aggreIndex: 2,
		},
	];
	const endgameScoreData = [
		{
			name: 'Climb',
		},
	];
	const { teamSearched } = useSelector((state) => state.search, shallowEqual);
	const dataReducer = useSelector((state) => state.dataReducer, shallowEqual);
	const [team, setTeam] = useState(null);
	const [searchedOnce, setSearchedOnce] = useState(false);
	const [renderCount, setRenderCount] = useState(0);
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
								const autoIndices = [1, 2, 3]; // indexes of the datapoints you want to adjust
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
									const dataSet = autoIndices.map((index) => ({
										data: team.organizedDataSets[0][index],
										teamNumber: autoDataProps[index].name,
									}));
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
								const teleopIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // indexes of the datapoints you want to adjust
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
								const endgameIndicies = [1]; // indexes of the datapoints you want to adjust
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
				<GridItem colSpan={2}>
					<Center w='100%'>
						<Heading w='100%' textAlign='center'>
							Comments
						</Heading>
					</Center>
				</GridItem>
				<GridItem w='100%' colSpan={2}>
					<Center w='100%'>
						{/** araash */}
						{team.comments.map((comment) => (
							<Center w='100%'>
								<Text>{comment}</Text>
							</Center>
						))}
					</Center>
				</GridItem>
				<GridItem w='100%' colSpan={2}>
					<Center w='100%'>
						<Heading w='100%' textAlign='center'>
							Score Breakdown
						</Heading>
					</Center>
				</GridItem>
				<GridItem w='100%' colSpan={2}>
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
				</GridItem>
			</Grid>
		</Center>
	);
}
const lineWidth = {
	width: '26%',
};
