# Assignment 4: Application State with Redux

Up to now you have structured your application in a way that holds the state of
the individual components locally. We will now prepare for a global state
handling solution powered by *Redux*.

We'll start out with the state handling itself, *without integrating it into the
React app yet*.

Create the actions and a reducer for everything that can happen in the app:

* temperature changes
* humidity changes
* reset of minimum/maximum values

Even though the *Redux* code is not yet an active part of our app, we can still
verify that it works by writing unit tests for it. Remember that *Redux* is
based on pure functions, which is very convenient in tests: the output is always
fully defined by the input.

Focus on tests for the *reducer*, which takes in some state and an action, and
produces a new state as result from that. Think of various scenarios that can
occur in the app and document them as test code. Starting with some state,
assert the state matches what you'd expect it after an action has been reduced.

**You're not supposed to integrate this state management solution into your
current React application (yet)!**

## Hints

Everything you learned in the testing chapter you can use in the tests for
Redux.

### Testing Actions

```typescript
describe('actions tests', () => {
    test('returns an action with the given id', () => {
        const id = 23;

        const action = createSetFavAction(id);

        expect(action).toEqual({
            type: SET_FAVORITE,
            payload: id,
        });
    });
});
```

### Testing Reducers

```typescript
describe('reducers tests', () => {
    test('adds the session id to the favorites list', () => {
        const initialState: FavoriteState = [23, 1337];
        const idToAdd = 42;
        const action: SetFavoriteAction = createSetFavAction(idToAdd);

        const newState: FavoriteState = reducer(initialState, action);

        const expectedState = [23, 1337, 42];
        expect(newState).toEqual(expectedState);
    });
});
```

Simply place the test file at the same level as your redux code, Jest will
automatically pick up the test files and execute them.
