# React + Socket.io

Small experiment to see how easy it is to synchronize components using Socket.io.

```shell
git clone git@github.com:enome/react.io.git
cd react.io
npm install
node server.js
```

The main work here is done in the socket-mixin.js file which is a mixin you can include in your components. It will emit a change event when the state of a component changes. The server will then broadcast this event with the state to all components. Since this would update all the components the event also has a path which relates to the position of the component inside the dom. 

In this example only the parent component (people) needs to sync it's state since it also sets the child components. If you do use the socketMixin in the person component you need to keep in mind that it will sync without telling the parent. So the state of the child component might differ from it's parent data.

If you load an other page after you already changed the data in the first page you might notice that they are out sync. This is because the same array gets initialized on each page load. Using a common data source (back-end data storage, indexedDB, ...) would fix this.
