import React from 'react';
import eventBus from './EventBus';
import Drawer from './Drawer';
import './StackableDrawers.css';

// TODO:
// * Add customization to turn on/off animation
// * Add customization to fix the drawer to the viewport or the nearest positioned ancestor

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
		debugger;
		console.log('removing drawer');
		console.log(data);
	}

	replaceDrawer(content) {
		console.log('replacing drawer');
	}

	render() {
		return (
			<div className="stackable-drawers">
				{this.state.drawers.map((drawer, index) =>
					<Drawer key={index}>
						{drawer}
					</Drawer>
				)}
			</div>
		);
	}
}

export default StackableDrawers;