import React, { useState } from 'react';
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
	HStack,
	NumberInput,
	NumberInputField,
	Button,
} from '@chakra-ui/react';

export default function PositionChanger({ rank, changeRank }) {
	const [display, setDisplay] = useState(rank);
	const handleChange = (event) => setDisplay(event.target.value);
	return (
		<div style={{ width: '40%', marginRight: '10%' }}>
			<HStack>
				<NumberInput style={{ textAlign: 'center' }} value={display}>
					<NumberInputField onChange={handleChange} />
				</NumberInput>
				<Button colorScheme='red' p='1%'></Button>
			</HStack>
		</div>
	);
}
