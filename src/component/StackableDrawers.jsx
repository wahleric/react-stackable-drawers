import React from 'react';
import eventBus from './EventBus';
import Drawer from './Drawer';
import './StackableDrawers.css';

class StackableDrawers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drawers: [],
			config: this.initConfig(props.options)
		};
	}

	/**
	 * Initializes configuration options based on the passed-in options and
	 * default values
	 *
	 * @param {Object} options the set of options passed to the component
	 */
	initConfig(options) {
		let mount = ['top', 'right', 'bottom', 'left'].includes(options.mount) ? options.mount : 'top';

		return {
			mount: mount
		}
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