import './App.css';
import StackableDrawers from './component/StackableDrawers';
import eventBus from './component/EventBus';

function testAddDrawer() {
  eventBus.dispatch('openDrawer', <div>Hi! First drawer</div>);
}

function App() {
  return (
    <div className="App">
      <button onClick={testAddDrawer}>Open Drawer</button>
      <StackableDrawers options={{mount: 'bottom'}}/>
    </div>
  );
}

export default App;
