import React from 'react';
import renderer from 'react-test-renderer';

import AccountScreen from '../AccountScreen';

interface Props {
  type: string,
  navigation: any
}

describe('<AccountScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<AccountScreen  />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});