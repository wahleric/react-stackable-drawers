import React, { useRef, useEffect } from 'react';
import eventBus from './EventBus';
import './StackableDrawers.css';

function Drawer(props) {
	const drawerRef = useRef();
	useEffect(() => {
		requestAnimationFrame(() => {
			drawerRef.current.classList.add('open');
		});
	}, []);

	function closeDrawer() {
		drawerRef.current.classList.remove('open');
		setTimeout(() => {
			eventBus.dispatch('closeDrawer', {test: 'drawer closed'});
		}, 300);
	}

	// Temp for testing - remove later
	function testOpenDrawer() {
		eventBus.dispatch('openDrawer', <div>Opened from another drawer<input type="text"></input></div>);
	}

	let options = props.options || {};

	return (
		<div ref={drawerRef} className={`drawer ${options.mount}`}>
			<div className="drawer-buttons">
				<button className="close-button" onClick={closeDrawer}>X</button>
				<button className="open-button" onClick={testOpenDrawer}>Open another drawer</button>
			</div>
			{props.children}
		</div>
	)
}

class StackableDrawers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drawers: [],
			options: this.initOptions(props.options || {})
		};
	}

	/**
	 * Initializes configuration options based on the passed-in options and
	 * default values
	 *
	 * @param {Object} options the set of options passed to the component
	 */
	initOptions(options) {
		return {
			mount: ['top', 'right', 'bottom', 'left'].includes(options.mount) ? options.mount : 'top',
			animate: typeof options.animate === 'boolean' ? options.animate : true
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
		let newDrawers = [];
		this.state.drawers.forEach((drawer) => {
			newDrawers.push(drawer);
		});
		newDrawers.push({
			content: content
		});
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
				{this.state.drawers.map((drawer, index) => {
					let drawerOptions = Object.assign({}, this.state.options, drawer.options);
					return (
						<Drawer options={drawerOptions} key={index}>
							{drawer.content}
						</Drawer>
					)
				})}
			</div>
		);
	}
}

export default StackableDrawers;