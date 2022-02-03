import React from 'react';
import QrReader from 'react-qr-reader';
import { useDispatch } from 'react-redux';
import { addData } from '../../../Actions/ImportActions/addData';

export default function CameraReader() {
	const dispatch = useDispatch();
	return (
		<QrReader
			delay={500}
			onError={(error) => {
				console.log(error);
			}}
			onScan={(scan) => {
				if (scan == null) return;
				console.log(scan);
				dispatch(addData(scan));
			}}
			style={{ width: '100%' }}
		/>
	);
}
