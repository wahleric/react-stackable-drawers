import { useEffect } from 'react';
import eventBus from './EventBus';

import './StackableDrawers.css';


// TODO:
// * Add customization to turn on/off animation
// * Add customization to fix the drawer to the viewport or the nearest positioned ancestor



function initListeners() {
	debugger;
	eventBus.on('openDrawer', (content) => {
		addDrawer(content);
	});
	eventBus.on('closeDrawer', () => {
		removeDrawer();
	});
}

function addDrawer(content) {
	console.log('adding drawer', content);
}

function replaceDrawer(content) {
	console.log('replacing drawer');
}

function removeDrawer() {
	console.log('removing drawer');
}

function StackableDrawers(props) {
	useEffect(() => {
		initListeners();
	}, []);

	return (
		<div className="StackableDrawers">
			dassadsad
		</div>
	)
}

export default StackableDrawers;