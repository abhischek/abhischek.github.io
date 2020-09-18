import { shallow } from 'enzyme';
import React from 'react';
import Forecast from '../components/Forecast';

it('expect to render Forecast component', () => {
	expect(shallow(<Forecast />)).toMatchSnapshot();
})
