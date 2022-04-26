import React from 'react';
import eventBus from './EventBus';
import Drawer from './Drawer';
import './StackableDrawers.css';

class StackableDrawers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drawers: []
		};
	}

	componentDidMount() {
		this.initListeners();
	}

	initListeners() {
		eventBus.on('openDrawer', (content) => {
			this.addDrawer(content);
		});
		eventBus.on('closeDrawer', (data) => {
			this.removeDrawer(data);
		});
	}

	addDrawer(content) {
		let newDrawers = this.state.drawers || [];
		newDrawers.push(content);

		this.setState((prevState) => ({
			drawers: newDrawers
		}));
	}

	removeDrawer(data) {
		let newDrawers = this.state.drawers || [];
		newDrawers.pop();

		this.setState((prevState) => ({
			drawers: newDrawers
		}));
	}

	render() {
		return (
			<div className="stackable-drawers">
				{this.state.drawers.map((drawerContent, index) =>
					<Drawer key={index}>
						{drawerContent}
					</Drawer>
				)}
			</div>
		);
	}
}

export default StackableDrawers;