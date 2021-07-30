import React from 'react'
import { render } from '@testing-library/react';
import * as chai from 'chai';

import { testSensor } from '../lib/Sensor';

import Climate from './Climate';
const expect = chai.expect;

it('Climate app shows the current temperature (example usage of test sensor)', async () => {
    // It's important to use `testSensor` for the tests, instead of the "real"
    // sensor used in the app. There are two reasons for this:
    // 1. Performance: the real sensor emits data after delayed timeouts,
    //    which would slow down our tests.
    // 2. Predictability: the real sensor generates random values, which is
    //    almost impossible to test. We need to control the emitted values.
    const { findByText } = render(<Climate sensor={testSensor} />);

    // No value from the sensor yet, so "-" is shown.
    expect(await findByText(/temperature:/i)).to.have.text('Temperature: -');

    // We let the sensor emit a temperature value of 21:
    testSensor.emit('temperature', 21);

    // Let's check if that 21 is actually rendered.
    // We need to use `findBy…` and `await` that, because the event loop needs
    // to run first, so that our emitted event from above actually reaches the
    // component.
    expect(await findByText(/temperature:/i)).to.have.text('Temperature: 21');

    // Same thing again with a different temperature value, so that we can be
    // sure that the shown values are always up to date with the latest emitted
    // value from the sensor.
    testSensor.emit('temperature', 22);
    expect(await findByText(/temperature:/i)).to.have.text('Temperature: 22');
});
