import './App.css';
import StackableDrawers, { drawerBus } from './component/StackableDrawers';

function testAddDrawer() {
  let drawerContent = (
    <div>
      Hi! First drawer
      <input type="text"></input>
     <button onClick={testAddDrawer}>Open Drawer Again</button>
    </div>
  );

  drawerBus.openDrawer(drawerContent, {
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
      <StackableDrawers options={{mount: 'bottom', animate: true}}/>
    </div>
  );
}

export default App;
