import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { WrapperTest } from './WrapperTest';
import Profile from '../src/views/Profile';

describe('utils', () => {
 test('should be true', () => {
  const { container } = render(
   <WrapperTest>
    <Profile />
   </WrapperTest>
  );

  const title = screen.getByLabelText('content-profile');

  expect(title).toBeInTheDocument();
  expect(container).toMatchSnapshot();
 });
});
