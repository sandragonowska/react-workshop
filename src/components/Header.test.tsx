import React from 'react'
import { render } from '@testing-library/react';
import Header from "./Header";

describe('Header component', () => {
    it('should render the header component', async () => {
       const {getByRole, getByAltText} = render( <Header title="Weather forecast" />);

       expect(getByRole('heading')).to.contain.text("Weather forecast");
       getByAltText('logo');
    });
});