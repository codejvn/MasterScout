import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Import } from './ManageDataTabs/Import';
import { Raw } from './ManageDataTabs/Raw';
import { Analyzed } from './ManageDataTabs/Analyzed';
import { TeamBreakdown } from './ManageDataTabs/TeamBreakdown';
import TeamBreakdown2 from './ManageDataTabs/TeamBreakdown2';

export class ManageData extends Component {
	render() {
		return (
			<Tabs
				defaultActiveKey='Team Breakdown'
				id='uncontrolled-tab-example'
				style={{ zIndex: 99 }}
			>
				<Tab eventKey='Import' title='Import' style={{ zIndex: 99 }}>
					<Import />
				</Tab>
				<Tab eventKey='Raw' title='Raw' style={{ zIndex: 99 }}>
					<Raw />
				</Tab>
				<Tab eventKey='Analyzed' title='Analyzed' style={{ zIndex: 99 }}>
					<Analyzed />
				</Tab>
				<Tab
					eventKey='Team Breakdown'
					title='Team Breakdown'
					style={{ zIndex: 99 }}
				>
					{/* <TeamBreakdown /> */}
					<TeamBreakdown2 />
				</Tab>
			</Tabs>
		);
	}
}

export default ManageData;
