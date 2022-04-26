import './Drawer.css';
import eventBus from './EventBus';

function closeDrawer() {
	// TODO: Add animation to close drawer here
	eventBus.dispatch('closeDrawer', {test: 'drawer closed'});
}

function Drawer(props) {
	return (
		<div className="drawer">
			<button className="close-button" onClick={closeDrawer}>X</button>
		</div>
	)
}

export default Drawer;