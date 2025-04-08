import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { WrapperTest } from './WrapperTest';
import Home from '../src/views/home';

describe('utils', () => {
 test('should be true', () => {
  const { container } = render(
   <WrapperTest>
    <Home />
   </WrapperTest>
  );

  expect(screen.getByText('Cambiar Proyecto')).toBeInTheDocument();
  expect(screen.getByText('GESTIÓN CULTIVOS')).toBeInTheDocument();
  expect(container.querySelector('.card')).toBeInTheDocument();

  expect(container).toMatchSnapshot();
 });
});
