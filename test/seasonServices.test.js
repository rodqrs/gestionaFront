// Importamos las funciones necesarias de vitest y nuestro servicio a probar
import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as seasonServices from '../src/services/seasonServices'

// Grupo principal de pruebas para los servicios de temporadas
describe('Servicios de Temporadas', () => {
    // Datos de prueba comunes
    const mockData = {
        seasons: [
            { 
                id: '1', 
                nombre: 'Temporada 1', 
                duracion: '30 días',
                fecha_inicio: '2024-01-01',
                fecha_fin: '2024-01-31'
            }
        ],
        cropSeasons: [
            {
                id: 'season-1',
                nombre: 'Temporada 1',
                duracion: '30 días',
                fecha_inicio: '2024-01-01',
                fecha_fin: '2024-01-31',
                id_cultivo: 'crop-123'
            }
        ]
    }

    // Se ejecuta antes de cada prueba para limpiar los mocks anteriores
    beforeEach(() => {
        vi.clearAllMocks()
    })

    // Prueba para obtener todas las temporadas
    it('fetchSeasons debe obtener todas las temporadas', async () => {
        global.fetch = vi.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve(mockData.seasons)
            })
        )

        const result = await seasonServices.fetchSeasons()
        // Crear snapshot del resultado
        expect(result).toMatchSnapshot()
    })

    // Prueba para obtener temporadas por cultivo específico
    it('fetchCropSeasons debe obtener temporadas por cultivo', async () => {
        const cropId = 'crop-123'
        global.fetch = vi.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve(mockData.cropSeasons)
            })
        )

        const result = await seasonServices.fetchCropSeasons(cropId)
        // Crear snapshot de la transformación
        expect(result).toMatchSnapshot()
    })

    // Prueba para crear una nueva temporada
    it('createSeason debe crear una nueva temporada', async () => {
        const newSeason = {
            nombre: 'Nueva Temporada',
            duracion: '30 días',
            fecha_inicio: '2024-01-01',
            fecha_fin: '2024-01-31'
        }

        global.fetch = vi.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve({ id: '1', ...newSeason })
            })
        )

        const result = await seasonServices.createSeason(newSeason)
        // Crear snapshot del resultado de creación
        expect(result).toMatchSnapshot()
    })

    // Prueba para actualizar una temporada existente
    it('editSeason debe actualizar una temporada existente', async () => {
        const seasonId = 'season-123'
        const updateData = { nombre: 'Temporada Actualizada' }

        global.fetch = vi.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve({ id: seasonId, ...updateData })
            })
        )

        const result = await seasonServices.editSeason(seasonId, updateData)
        // Crear snapshot de la actualización
        expect(result).toMatchSnapshot()
        expect(fetch).toHaveBeenCalled()
    })

    // Prueba para eliminar una temporada
    it('deleteSeason debe eliminar una temporada', async () => {
        const seasonId = 'season-123'
        const mockResponse = { success: true }

        global.fetch = vi.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve(mockResponse)
            })
        )

        const result = await seasonServices.deleteSeason(seasonId)
        // Crear snapshot de la respuesta de eliminación
        expect(result).toMatchSnapshot()
        expect(fetch).toHaveBeenCalled()
    })
})