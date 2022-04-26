import './Drawer.css';
import eventBus from './EventBus';

function closeDrawer() {
	// TODO: Add animation to close drawer here
	eventBus.dispatch('closeDrawer', {test: 'drawer closed'});
}

// Temp for testing - remove later
function testOpenDrawer() {
	eventBus.dispatch('openDrawer', <div>Opened from another drawer<input type="text"></input></div>);
}

function Drawer(props) {
	debugger;
	return (
		<div className="drawer">
			<div className="drawer-buttons">
				<button className="close-button" onClick={closeDrawer}>X</button>
				<button className="open-button" onClick={testOpenDrawer}>Open another drawer</button>
			</div>
			{props.children}
		</div>
	)
}

export default Drawer;