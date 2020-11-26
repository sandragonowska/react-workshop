# Assignment 6: Side Effects with Redux Thunk

In the Redux world a reducer is set up in a way that does not allow for side
effects. In this assignment you have the task to create a *reload* button that
will query the sensor's `getTemperature` and `getHumidity` getters in order to
update the current temperature and humidity.

These getters are asynchronous, which means that they return a promise that will
resolve eventually. Make sure to also check for failure cases, as the sensor
getters may fail to resolve sometimes.

Use *Redux Thunk* for this task.

## Acceptance Criteria

* A reload button is shown.
* A click on the reload button triggers an update of the current temperature and
  humidity values via the getters.
* While the requested values are loaded a "Loading…" message is shown on the
  button in the meantime.
* While the data is loading, the button is disabled.
* When one of the getter fails (the promise rejects), an appropriate message is
  displayed somewhere.
* Any previous error message is cleared when pressing the reload button again.

## Hints

It will be necessary to upgrade your application state together with some new
actions/reducers/selectors.

---

A *thunk* function requires a return type `AppThunk`, which is specific to your
Redux store. It's helpful to define this type in the module where you set up
your store (might be `index.tsx` or extracted in some `store.ts`).

```typescript
export const store = configureStore({
  reducer: {
    // your reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,    // what the thunk returns (by default void)
  RootState,     // type of the full store, derived above
  unknown,       // extra argument, we don't need that
  Action<string> // type of a Redux action (string is the type)
>;
```

You can than import this type, and define a *thunk* function like this:

```typescript
export function createSomeCoolThunk(): AppThunk { /* … */ }
```
