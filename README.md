# React Stackable Drawers

A lightweight, easy-to-use React component for creating multiple slide-out drawers

## Initializing the drawer manager

In order to initialize the drawers, you must first include the main drawer manager in your project. This should only be done once inside the project. As such, it is convenient to simply place it at the top level of the project. As an example:

```jsx
import StackableDrawers from 'react-stackable-drawers';

function App() {
  return (
    <div className="App">
      <StackableDrawers />
      ...
      {App content here}
      ...
    </div>
  );
}

export default App;
```

You can also define a set of default options that will apply to every drawer opened:

```jsx
<StackableDrawers options={mount: 'bottom'}/>
```

For a full list of available options, see below

## Using the drawers

To access the drawer manager from any component in your project, simply import the `drawerBus` component inside of it:

```jsx
import { drawerBus} from 'react-stackable-drawers';
```

### Opening a drawer

Once the `drawerBus` has been imported, you can open a drawer and insert content into it by using the `openDrawer` function:

```jsx
drawerBus.openDrawer(content, options);
```

The first argument to the `openDrawer` function should be the JSX of the content you wish to fill the drawer with. A second optional argument allows you to define options for the specific drawer being opened:

```jsx
drawerBus.openDrawer(<div>Hello World!</div>, {
	mount: 'left'
});
```

The list of options available on a per-drawer basis are the same as the ones available at the top-level `StackableDrawers` level. See below for a full list

### Closing a drawer

To close the top level drawer, simply use the `drawerBus` again:

```jsx
drawerBus.closeDrawer();
```

### Passing data back from a drawer

In some cases, you may want to pass data back to the component that opened a drawer. To do so, when opening the drawer, you can pass a callback function in the drawer options that will be run when the drawer is closed:

```jsx
drawerBus.openDrawer(<YourComponent />, {
	mount: 'left',
	callback: (drawerData) => {
		console.log('drawerData was passed back from the closed drawer');
	}
});
```

When closing the drawer, you can pass the data you need into the `closeDrawer` function. This is the data that will be passed into the callback defined above:

```jsx
drawerBus.closeDrawer({
	hello: 'World!'
});
```

## Drawer options

There are a number of options available to pass into the drawers. To set the default options for every drawer opened, you can pass your options in when placing the `StackableDrawers` componenet. Afterward, you can also override the default options for a specific drawer by passing them into the `openDrawer` function.

All of the following options are available in both the top-level drawer manager and on a per-drawer basis:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| animate | boolean | true | Enables/disables the slide animation when a drawer is opened/closed |
| mount | string | 'top' | If `animate` is set to `true`, This determines what side of the window the drawer will slide in from. Available options are `'top'`, `'right'`, `'bottom'`, or `'left'` |
| callback | function | none | Defines a callback that will run when a drawer is closed. The callback will receive a single parameter containing the data that was passed into the `closeDrawer` function |
| showClose | boolean | true | Determines whether the drawer will have a default close button shown |

## Styling

By default, each drawer has a plain white background and a close button. To hide the close button, you can pass the `showClose: false` option in to your drawer. As for the rest of the drawer, you can use your own content passed in to `openDrawer` to style the drawer as needed.