import React from 'react';
import renderer from 'react-test-renderer';

import AccountScreen from '../AccountScreen';

interface Props {
  type: string
}

describe('<AccountScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<AccountScreen type="bold"/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});