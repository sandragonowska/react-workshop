# Assignment 4: Application State with Redux

Up to now you have structured your application in a way that holds the state of
the individual components locally. We will now switch over to a global state
handling solution powered by *Redux*.

## 4.1 Create Redux Store & Climate Slice

We'll start out with the state handling itself, *without integrating it into the
React app yet*.

Remember that the following things can happen in our climate app:

* Temperature and humidity changes (with possible updates of minimum/maximum)
* Resets of the minimum/maximum values for both temperature and humidity

The functionality for this shall be encapsulated by a `climateSlice`. A *slice*
contains both an *initial state* and *reducers* to update that state. Use
[`createSlice()`](https://redux-toolkit.js.org/api/createslice) to create your
slice and put it into a module called `climateSlice.ts`.

Think about a good data structure that holds all required climate values and
define a type for it (e.g. an `interface ClimateState`). Then implement the
actions that are handled by *reducer* functions.

Also set up a *Redux store* with the help of
[`configureStore()`](https://redux-toolkit.js.org/api/configureStore). As we
only have a small app with a single slice, we will just pass the reducer from
that slice to the `reducer` parameter of `configureStore()`. It should be
available as a `default export` in the `climateSlice` module. Put the code for
the store into a module called `store.ts`.

To be able to check that your Redux implementation works as expected, start
early with writing *tests*. Choose the approach of testing the store as a whole,
as you have learned previously. Remember that it is important to get a fresh
store instance before each test case, so wrap that
[`configureStore()`](https://redux-toolkit.js.org/api/configureStore) call in
`store.ts` in a function and export it, so that you can call it in your test
module (preferably in a `beforeEach()` hook).

When writing the tests, you might notice that a few *selectors* could be helpful
to quickly access certain parts of the state. Implement and export those in the
same module as the `climateSlice`.

### Hints

This could be a file structure for your Redux implementation:

```text
src/
├── components/
└── redux/
    ├── climateSlice.ts
    ├── store.ts
    └── store.test.ts
```

Try to work in small steps and verify that your code works with a test case as
early as possible! The minimal setup to start with testing is a function that
creates the store (call to
[`configureStore()`](https://redux-toolkit.js.org/api/configureStore)) and a
slice ([`createSlice()`](https://redux-toolkit.js.org/api/createslice)) with
some initial state - you can start without any reducer functions!

After the store setup is working (add a test for the expected initial state!),
start out with a single, simple reducer function. Ignore minimum/maximum in the
beginning. Check that your reducer updates the current value as expected in a
test case. Then extend the functionality including new test cases step by step.

Don't forget to add a `default export` of the slice's *reducer*, and named
`export`s for the *actions* and *selectors*.

When writing tests for minimum/maximum values, think of good combinations of
values sequences. It may be useful to dispatch multiple actions with different
values, and to do various assertions in between to be sure that there are no
bugs.

**Remember: You're not yet supposed to integrate this state management solution
into your current React application!**

## 4.2 Connect React and Redux

Now that we are confident that our state management works, we can integrate it
into our React app.

You have already used *React Toolkit's*
[`configureStore()`](https://redux-toolkit.js.org/api/configureStore) to set up
the Redux store. Make it available to the React app by passing it to a
[`<Provider>`](https://react-redux.js.org/api/provider) component. Redux will be
available to the component and all child components within the `<Provider>`
component. Decide where in the component hierarchy you are going to place the
`<Provider>`.

After that, adapt your components to use the Redux state handling. The *hooks*
[`useDispatch()`](https://react-redux.js.org/api/hooks#usedispatch) and
[`useSelector()`](https://react-redux.js.org/api/hooks#useselector) from the
package `react-redux` will help you with that.

The previously implemented local state management with React's `useState()` can
be removed.

### Hints

To get your *integration tests* (`Climate.test.tsx`) running again, you need to
provide a Redux store in your test setup. The test cases should not require any
modification, as the are still doing the same interactions with the app as
before, and the behavior of the app should not have changed - only its
implementation.

For the Redux tests from the previous exercise, you will already have needed a
function that creates the *store*. Use that in the setup (probably a
`beforeEach` hook) as well. Pass the result of the store creation function to
the `store` prop of a `<Provider>` component and wrap it around your tested
component. This will create a fresh store with its initial state before each
test case, so that you get reliable results. Pass the wrapped component to React
Testing Library's `render()` function. You can see an example for this in
`renderWithStore` below.

```jsx
import React from 'react'
import { Provider } from 'react-redux'
import { render, RenderResult } from '@testing-library/react'

import { createStore } from './App'
import TestedComponent from './TestedComponent'

const renderWithStore = (): RenderResult => render(
    <Provider store={createStore()}>
        <TestedComponent someProp={someStuff} />
    </Provider>
)
```

## 4.3 Quality Indicators *(optional bonus exercise)*

Add indicators that show the quality of temperature and humidity. This should be
represented by emoji and appropriate labels, as shown below.

### Temperature

| Range                         | Representation
|-------------------------------|----------------
| *temperature ≤ 17° C*         | 🥶 cold
| *17° C < temperature < 25° C* | 😀 normal
| *temperature ≥ 25° C*         | 🥵 hot

### Humidity

| Range                         | Representation
|-------------------------------|----------------
| *humidity ≤ 40%*              | 🌵 dry
| *40% < humidity < 60%*        | 🌄 normal
| *humidity ≥ 60%*              | 🌊 moist

Think about some design decisions before starting to code:

* Should the quality values be put into the global state or not?
* Cutting of components (single responsibility, reusability)

Also don't forget about testing. :-)
