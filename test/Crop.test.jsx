import { test, describe, beforeAll, beforeEach, vi, expect } from 'vitest';
import { render } from '@testing-library/react';
import Crop from '../src/views/Crop';
import { WrapperTest } from './WrapperTest';
import * as cropServices from '../src/services/cropService';

vi.mock('../src/services/cropService', () => ({
 fetchCrops: vi.fn(),
}));

describe('Crop View', () => {
 beforeAll(() => {
  //polyfill para simular el sessionStorage
  const storageMock = (() => {
   let store = {}; // Simula el almacenamiento
   return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
     store[key] = String(value);
    },
    removeItem: (key) => {
     delete store[key];
    },
    clear: () => {
     store = {};
    },
   };
  })();

  Object.defineProperty(global, 'sessionStorage', {
   value: storageMock,
  });
 });
 beforeEach(() => {
  const mockUserData = JSON.stringify({
   id: 123,
   nombre: 'Juan Pérez',
   email: 'd@d.com',
   projectsByUser: [
    {
     id: 1,
     nombre: 'Proyecto 1',
     crops: [{ id: 1, nombre: 'Maíz', season: [] }],
    },
   ],
  });

  vi.spyOn(sessionStorage, 'getItem').mockImplementation((key) => {
   if (key === 'user_data') {
    return mockUserData;
   }
   return null;
  });
 });

 test('should render  Crop View', async () => {
  const mockCrops = [
   {
    id: 1,
    nombre: 'Maíz',
    tipo_siembra: 'Primavera',
    fecha_inicio: '2023-01-01',
    area_terreno: 100,
    unidad: 'hectárea',
    descripcion: 'Unidad de medida para área',
   },
   {
    id: 2,
    nombre: 'Trigo',
    tipo_siembra: 'Verano',
    fecha_inicio: '2023-02-01',
    area_terreno: 200,
    unidad: 'hectárea',
    descripcion: 'Unidad de medida para área',
   },
  ];

  cropServices.fetchCrops.mockResolvedValue(mockCrops);

  const { container } = render(
   <WrapperTest>
    <Crop />
   </WrapperTest>
  );

  expect(container).toMatchSnapshot();
  expect(container.querySelector('.crop__home-view')).toBeTruthy();
 });
});
