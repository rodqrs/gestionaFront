import { render, screen, waitFor, act } from "@testing-library/react";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import Season from '../src/views/season';
import { WrapperTest } from "./WrapperTest";
import * as seasonServices from '../src/services/seasonServices';

// Silenciamos errores de consola durante las pruebas
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (msg) => {
    // Ignoramos errores específicos que sabemos que ocurrirán durante las pruebas
    if (msg.includes("Error fetching crops data") || 
        msg.includes("Cannot read properties of undefined")) {
      return;
    }
    originalConsoleError(msg);
  };
});

afterAll(() => {
  // Restauramos console.error
  console.error = originalConsoleError;
});

// Mock de los servicios
vi.mock("../src/services/seasonServices", () => ({
    fetchCrops: vi.fn(),
    fetchNews: vi.fn(),
    fetchCropSeasons: vi.fn()
}));

describe("Season view", () => {
    beforeAll(() => {
        //Polyfill to simulate the sessionStorage in the test environment
        const storageMock = (() => {
            let store = {};
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

        Object.defineProperty(global, "sessionStorage", {
            value: storageMock,
        });
    });

    beforeEach(() => {
        // Configuramos datos de usuario simulados
        const mockUserData = JSON.stringify({
            id: 123,
            nombre: "John Doe",
            email: "john.doe@cor.com",
            projectsByUser: [
                {
                    id: 1,
                    nombre: "Proyecto 1",
                    crops: [
                        { 
                            id: "test-crop-id", 
                            nombre: "Test Crop",
                            seasons: []
                        }
                    ],
                },
            ],
        });

        // Mock del sessionStorage
        vi.spyOn(sessionStorage, "getItem").mockImplementation((key) => {
            if (key === "user_data") {
                return mockUserData;
            }
            return null;
        });
    });

    afterEach(() => {
        vi.resetAllMocks(); //restore all mocks to their original implementation
    });

    it("Renderiza el título de la vista de temporadas", async () => {
        // Mock vacío para simular que no hay datos inicialmente
        seasonServices.fetchCrops.mockResolvedValue([]);
        seasonServices.fetchNews.mockResolvedValue([]);
        seasonServices.fetchCropSeasons.mockResolvedValue([]);
        
        await act(async () => {
            render(
                <WrapperTest>
                    <Season />
                </WrapperTest>
            );
        });

        // Verificamos el título principal
        expect(screen.getByText("TEMPORADA")).toBeInTheDocument();
    });

    it("Renderiza la tabla con nombre de temporada", async () => {
        // Datos de prueba para cultivos y temporadas
        const mockCrops = [
            { id: "test-crop-id", nombre: "Test Crop" }
        ];

        const mockSeasons = [{ 
            id: "test-season-id",
            nombre: "Test Season",
            duracion: "30 días",
            fecha_inicio: "2024-01-01",
            fecha_fin: "2024-01-31",
            id_cultivo: "test-crop-id"
        }];

        // Configurar mocks
        seasonServices.fetchCrops.mockResolvedValue(mockCrops);
        seasonServices.fetchNews.mockResolvedValue([]);
        seasonServices.fetchCropSeasons.mockResolvedValue(mockSeasons);

        // Renderizar componente
        const { container } = render(
            <WrapperTest>
                <Season />
            </WrapperTest>
        );

        // Esperar y verificar el título
        await waitFor(() => {
            expect(screen.getByText("TEMPORADA")).toBeInTheDocument();
        });

        // Esperar y verificar los datos de la temporada
        await waitFor(() => {
            expect(screen.getByText("Test Season")).toBeInTheDocument();
        }, { timeout: 3000 });

        // Verificar el snapshot final
        expect(container).toMatchSnapshot();
    });
}); 

it("Coincide con el snapshot de la vista Season", async () => {
    seasonServices.fetchCrops.mockResolvedValue([]);
    seasonServices.fetchNews.mockResolvedValue([]);
    seasonServices.fetchCropSeasons.mockResolvedValue([]);
    
    let container;
    await act(async () => {
      const renderResult = render(
        <WrapperTest>
          <Season />
        </WrapperTest>
      );
      container = renderResult.container;
    });
  
    expect(container).toMatchSnapshot();
  });
