import { describe, expect, test, beforeAll, vi, beforeEach } from 'vitest';
import * as cropService from '../src/services/cropService';

describe('fetchCrops service', () => {
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
   projectId: 123,
   nombre: 'Juan Pérez',
   email: 'd@d.com',
   projectsByUser: [
    {
     id: 1,
     nombre: 'Proyecto 1',
     crops: [],
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
 test('fetchCrops should return a list of crops', async () => {
  // Mock the fetch function
  const mockCropsResponse = {
   crops: [
    {
     id: 1,
     nombre: 'Maíz',
     tipo_siembra: 'Directo',
     fecha_inicio: '2023-01-01',
     area_terreno: 100,
     unit: {
      unidad: 'kg',
      nombre: 'Kilogramos',
     },
    },
   ],
  };
  global.fetch = vi.fn(() =>
   Promise.resolve({
    json: () => Promise.resolve(mockCropsResponse),
   })
  );
  const crops = await cropService.fetchCrops();

  expect(crops).toBeDefined();
  expect(crops.length).toBeGreaterThan(0);
  expect(crops).toStrictEqual([
   {
    id: 1,
    nombre: 'Maíz',
    tipo_siembra: 'Directo',
    fecha_inicio: '2023-01-01',
    area_terreno: 100,
    unidad: 'kg',
    descripcion: 'Kilogramos',
   },
  ]);
 });
});
