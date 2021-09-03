import React from 'react'
import { render, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { testSensor } from '../lib/Sensor';
import Climate from './Climate';

describe('Climate component', () => {
    describe('Temperature', () => {
        let findCurrent: () => Promise<HTMLElement>;
        let findMinimum: () => Promise<HTMLElement>;
        let findMaximum: () => Promise<HTMLElement>;
        let getResetButton: () => HTMLElement;

        beforeEach(() => {
            const { findByTestId, getByTestId } =
                render(<Climate sensor={testSensor} />);

            findCurrent = () => findByTestId('temperature-current');
            findMinimum = () => findByTestId('temperature-minimum');
            findMaximum = () => findByTestId('temperature-maximum');

            // no need for async find, as the button always stays the same
            getResetButton = () => getByRole(getByTestId('temperature'), 'button');
        });

        it('shows the current value', async () => {
            expect(await findCurrent()).to.contain.text('-');

            testSensor.emit('temperature', 21);
            expect(await findCurrent()).to.contain.text('21° C');

            testSensor.emit('temperature', 22.666);
            expect(await findCurrent()).to.contain.text('22.7° C');
        });

        it('shows the minimum value', async () => {
            expect(await findMinimum()).to.contain.text('-');

            testSensor.emit('temperature', 21);
            expect(await findMinimum()).to.contain.text('21° C');

            testSensor.emit('temperature', 30);
            expect(await findMinimum()).to.contain.text('21° C'); // still min.

            testSensor.emit('temperature', 17);
            expect(await findMinimum()).to.contain.text('17° C'); // new min.
        });

        it('shows the maximum value', async () => {
            expect(await findMaximum()).to.contain.text('-');

            testSensor.emit('temperature', 21);
            expect(await findMaximum()).to.contain.text('21° C');

            testSensor.emit('temperature', 20.5);
            expect(await findMaximum()).to.contain.text('21° C'); // still mqx.

            testSensor.emit('temperature', 21.5);
            expect(await findMaximum()).to.contain.text('21.5° C'); // new max.
        });

        it('resets min and max to current when reset button is clicked', async () => {
            // Emit some values so that we have distinct cur/min/max.
            testSensor.emit('temperature', 21);
            testSensor.emit('temperature', 22);
            testSensor.emit('temperature', 20);
            testSensor.emit('temperature', 21);

            // Let's check the rendered state is as expected before we
            // click on the reset button.
            expect(await findCurrent()).to.contain.text('21° C');
            expect(await findMinimum()).to.contain.text('20° C');
            expect(await findMaximum()).to.contain.text('22° C');

            userEvent.click(getResetButton());

            expect(await findCurrent()).to.contain.text('21° C');
            expect(await findMinimum()).to.contain.text('21° C');
            expect(await findMaximum()).to.contain.text('21° C');
        });
    });

    describe('Humidity', () => {
        it('shows the current value', async () => {
            const { findByTestId } = render(<Climate sensor={testSensor} />);
            const findCurrent = () => findByTestId('humidity-current');

            expect(await findCurrent()).to.contain.text('-');

            testSensor.emit('humidity', 60);
            expect(await findCurrent()).to.contain.text('60 %');

            testSensor.emit('humidity', 65.1111);
            expect(await findCurrent()).to.contain.text('65.1 %');
        });
    });
});