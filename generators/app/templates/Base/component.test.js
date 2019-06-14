import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import <%= name %> from './<%= lowercasename %>';

describe('<%= name %>', () => {
    it('should render correctly', () => {
        const comp = shallow(<<%= name %> />);
        expect(toJSON(comp)).toMatchSnapshot();
    });
});
