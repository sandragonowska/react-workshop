# Assignment 3: Testing React Apps

## 3.1 Getting Started

Start the test runner in watch mode with `npm run test:watch`.

The initial test in `Climate.test.tsx` probably does not run green anymore,
because it was testing the app in its starting state, but we have changed the
app quite a bit in the last exercises.

We'll take care for that soon, but for now disable that test with Mocha's `skip`
feature. Change this:

```typescript
it('shows the current temperature', …)
```

to this:

```typescript
it.skip('shows the current temperature', …)
```

Mocha will list the test case as *pending* then, and no longer run it.

## 3.2 Header

Let's get started by writing some tests for the `Header` component that we
have implemented in the first assignment. You have probably put that into a
file called `Header.tsx`. Create a new file `Header.test.tsx` for the tests.

Try to `render` the component with different text values that you pass in as a
prop. Use `getByRole` and `to.have.text` or `to.contain.text` to find the
rendered header in the DOM and check its text content.

### Hints

The [Testing Playground Chrome extension](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano)
can help you with writing queries.

The existing test in `Climate.test.tsx` will give you an example how a typical
test looks like. Don't copy over too much, though! The `Climate` component has
to deal with some asynchrony, as it is listening to sensor events.

Avoid using any of the following in `Header.test.tsx`:

* `sensor` / `testSensor`
* `async` / `await`
* `findBy…` queries

## 3.3 Current Temperature and Humidity

Back to `Climate.test.tsx`. Remove that `skip` you added in 3.1 and get the test
working again!

When it works, add a similar test for the current humidity value.

### Hints

You have introduced a child component in assignment 2.1 and are using that in
your `Climate` component. We are still just writing tests on the level of the
`Climate` component and not on the child component though. That is not a unit
test, but an integration test, and it's the approach we want to use here.

If you have trouble writing a good query to find the current temperature and
humidity values, change your component so that it adds `data-testid` attributes.
Make sure to assign unique values to them. You can then use `findByTestId` in
your tests.

## 3.4 Minimum and Maximum Values

Add tests for minimum and maximum values. It is sufficient to do this for either
the temperature or the humidity here.

### Hints

Let the `testSensor` emit appropriate values so that you can actually be sure
that the minimum and maximum only change when the current value exceeds them.

## 3.5 Reset Button

Test that the reset button is doing what it should. Also make sure that after
the button is pressed the minimum and maximum are being updated again when new
values are emitted by the sensor.

Try to avoid using a `data-testid` this time. Query for the button with
`findByRole` and a `name` option. The *Testing Playground* extension can help
you again.

Again, it is sufficient to do this for either temperature or humidity.

### Hints

Use the [`user-event`](https://github.com/testing-library/user-event) lib to
click on the button:

```typescript
import userEvent from '@testing-library/user-event'

userEvent.click(theButtonYouFound);
```
