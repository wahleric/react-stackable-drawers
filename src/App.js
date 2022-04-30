import './App.css';
import StackableDrawers, { drawerBus } from './component/StackableDrawers';

function testAddDrawer() {
  drawerBus.openDrawer(<div>Hi! First drawer</div>, {
    mount:'left',
    callback: (drawerData) => {
      console.log('Hey, it worked');
    }
  });
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
