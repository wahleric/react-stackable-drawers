import './App.css';
import StackableDrawers from './component/StackableDrawers';
import eventBus from './component/EventBus';



function testAddDrawer() {
  debugger;
  eventBus.dispatch('openDrawer', {test: 'testing'});
}


function App() {
  return (
    <div className="App">
      <button onClick={testAddDrawer} />
      <StackableDrawers />
    </div>
  );
}

export default App;
