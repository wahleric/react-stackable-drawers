import React, { useRef, useEffect } from 'react';
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
			drawerBus.closeDrawer();
		}, 300);
	}

	// Temp for testing - remove later
	function testOpenDrawer() {
		drawerBus.openDrawer(<div>Opened from another drawer<input type="text"></input></div>, {
			mount: 'right'
		});
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
		document.addEventListener('stackableDrawerOpen', this.handleDrawerOpenEvent.bind(this));
		document.addEventListener('stackableDrawerClose', this.handleDrawerCloseEvent.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener('stackableDrawerOpen', this.handleDrawerOpenEvent.bind(this));
		document.removeEventListener('stackableDrawerClose', this.handleDrawerCloseEvent.bind(this));
	}

	handleDrawerOpenEvent(event) {
		let data = event.detail || {};
		this.openDrawer(data.content || <></>, data.options || {});
	}

	handleDrawerCloseEvent(event) {
		let data = event.detail || {};
		this.closeDrawer(data.drawerData);
	}

	openDrawer(content, options) {
		let newDrawers = Array.from(this.state.drawers) || [];
		newDrawers.push({
			content: content,
			options: options
		});
		this.setState((prevState) => ({
			drawers: newDrawers
		}));
	}

	closeDrawer(drawerData) {
		let newDrawers = Array.from(this.state.drawers) || [];
		let drawer = newDrawers.pop();

		debugger;

		if (drawer.options && drawer.options.callback instanceof Function) {
			drawer.options.callback(drawerData);
		}

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

export const drawerBus = {
  openDrawer(content, options) {
    document.dispatchEvent(new CustomEvent('stackableDrawerOpen', {
    	detail: {
    		content: content,
    		options: options
    	}
    }));
  },

  closeDrawer(drawerData) {
    document.dispatchEvent(new CustomEvent('stackableDrawerClose', {
    	detail: {
    		drawerData: drawerData
    	}
    }));
  }
};