import './App.css';
import StackableDrawers from './component/StackableDrawers';
import eventBus from './component/EventBus';
import Drawer from './component/Drawer';

function testAddDrawer() {
  debugger;
  eventBus.dispatch('openDrawer', <div>Hi! First drawer</div>);
}

function App() {
  return (
    <div className="App">
      <button onClick={testAddDrawer}>Open Drawer</button>
      <StackableDrawers />
    </div>
  );
}

export default App;
