# Assignment 1: React Component Tree

Add a *header component* to the app that shows a nice big title at the top.
The text that is shown shall be passed in as a `prop`. It shall be rendered in a
`<h1>` element.

Try to find a good way to split up the application into components. You will
notice that the starting point of the application, `index.tsx`, directly renders
the `<Climate>` component. With the newly introduced `<Header>` component, we
need to render that as well. `ReactDOM.render` however only accepts a single
React component.

A typical pattern to solve this is to introduce a single `<App>` component that
acts as a container for all the parts of the application. So you should end up
with a component tree like this:

```text
(index)
   └── App
       ├── Header
       └── Climate
```

If you have some time left, feel free to either:

* Add a footer as well (also think of some props to pass in, e.g. a *copyright
  year* and a *company name*)
* Add some styling (you can put CSS rules into `index.css`)
