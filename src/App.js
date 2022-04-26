import './App.css';
import StackableDrawers from './component/StackableDrawers';
import eventBus from './component/EventBus';
import Drawer from './component/Drawer';

function testAddDrawer() {
  debugger;
  eventBus.dispatch('openDrawer', {test: 'testing'});
}

function App() {
  return (
    <div className="App">
      <button onClick={testAddDrawer} />
      <StackableDrawers />
      <Drawer />
    </div>
  );
}

export default App;
