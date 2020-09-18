import { shallow } from 'enzyme';
import React from 'react';
import Weather from '../components/Weather';

it('expect to render Weather component', () => {
	expect(shallow(<Weather />)).toMatchSnapshot();
})