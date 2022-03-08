import {
	Center,
	Heading,
	TableCaption,
	Tbody,
	Th,
	Thead,
	Tr,
	Table,
	Td,
	Stack,
	Box,
	Textarea,
	NumberInput,
	NumberInputField,
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchTeam } from '../../Actions/searchTeam';
import PositionChanger from './PositionChanger';

export function Picklist({ dataReducer, searchReducer, searchTeam }) {
	const [listOrder, setListOrder] = useState([]);
	const [rankChange, setRankChange] = useState([]);
	const [filledTeams, setFilledTeams] = useState(false);
	let { teams } = dataReducer;
	// let { teamSearched } = searchReducer;

	useEffect(() => {
		// console.log('teams update');
		// // console.log(teams);
		// console.log(teams.length);
		// console.log(filledTeams);

		if (teams.length > 1 && !filledTeams) {
			setListOrder(
				teams.map((team, index) => {
					return {
						rank: index + 1,
						team: team,
						comment: '',
						label: 'red.300',
					};
				})
			);
			setFilledTeams(true);
		}
	}, [teams]);
	return (
		<Center w='100%'>
			<Stack w='100%'>
				<Center>
					<Heading mt='5%'>Picklist</Heading>
				</Center>
				<Center w='100%'>
					<Table variant='striped' colorScheme='blackAlpha' w='90%' size='lg'>
						<TableCaption> </TableCaption>
						<Thead>
							<Tr>
								<Th textAlign='center'>Placement</Th>
								<Th textAlign='center'>Team Number</Th>
								{/* <Th textAlign="center">Team Rank</Th> */}
								<Th textAlign='center'>Comments</Th>
								<Th textAlign='center'>Color Label</Th>
								<Th textAlign='center'>Positioning</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								{/* {Array.from(Array(teams.length).keys()).map((num) => <Td>{num}</Td>)} */}
							</Tr>
							{listOrder.map(({ rank, team, comment, label }, index) => {
								// console.log(team);
								return (
									<Tr
										backgroundColor={rank == rankChange ? 'red.100' : 'red.200'}
									>
										<Td>
											<Heading size='md' textAlign='center'>
												{rank}
											</Heading>
										</Td>
										<Td>
											<Heading
												size='md'
												textAlign='center'
												onClick={() => {
													searchTeam(team.teamNumber);
												}}
											>
												{team.teamNumber}
											</Heading>
										</Td>
										{/* <Td>
												<Heading>
												</Heading>
											</Td> */}
										<Textarea
											value={comment}
											onChange={(e) => {
												let text = e.target.value;
												// this is a really hacky and bad solution; data should be modeled differently to edit
												let newArray = listOrder;
												// console.log(text);
												newArray[index].comment = text;
												setListOrder([...newArray]);
												// console.log(listOrder);
											}}
										></Textarea>
										<Td padding={0}>
											<Box
												w='95%'
												h='100%'
												bgColor={label}
												color={label}
												padding={'10%'}
												marginLeft={'5%'}
												onClick={() => {
													let newArray = listOrder;
													// console.log(text);
													const newLabel =
														label == 'red.300'
															? 'yellow.200'
															: label == 'yellow.200'
															? 'green.100'
															: 'red.300';
													newArray[index].label = newLabel;
													setListOrder([...newArray]);
													// console.log(listOrder);
												}}
											>
												easter egg lol
											</Box>
										</Td>
										<Td padding={0}>
											<Center w='100%' h='100%'>
												<ButtonGroup
													isAttached
													variant='ghost'
													w='60%'
													h='100%'
												>
													<Button
														w='50%'
														p='9%'
														colorScheme='black'
														onClick={() => {
															let newArray = listOrder;
															newArray[index].rank = rank + 1;
															newArray[index + 1].rank = rank;
															[newArray[index], newArray[index + 1]] = [
																newArray[index + 1],
																newArray[index],
															];
															setListOrder([...newArray]);
															setRankChange([rank + 1]);
														}}
													>
														<Heading size='lg'>-</Heading>
													</Button>
													<Button
														w='50%'
														p='10%'
														colorScheme='black'
														onClick={() => {
															//[ list[x], list[y] ] = [ list[y], list[x] ];
															let newArray = listOrder;
															if (index == 0) return;
															newArray[index].rank = rank - 1;
															newArray[index - 1].rank = rank;
															[newArray[index], newArray[index - 1]] = [
																newArray[index - 1],
																newArray[index],
															];
															setListOrder([...newArray]);
															// console.log(listOrder);
															setRankChange([rank - 1]);
														}}
													>
														<Heading size='md'>+</Heading>
													</Button>
												</ButtonGroup>
												<PositionChanger rank={rank} />
											</Center>
										</Td>
									</Tr>
								);
							})}
						</Tbody>
						{/* <Box color="red" w = "100%" h = "100%"></Box> */}
					</Table>
				</Center>
			</Stack>
		</Center>
	);
}

const mapStateToProps = (state) => {
	return {
		dataReducer: state.dataReducer,
		search: state.search,
	};
};
const mapDispatchToProps = (dispatch) => {
	// propName: (parameters) => dispatch(action)
	return {
		searchTeam: (teamNum) => dispatch(searchTeam(teamNum)),
	};
};
export default Picklist = connect(
	mapStateToProps,
	mapDispatchToProps
)(Picklist);
