import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MissionService } from './mission.service';
import { prisma } from '@repo/database';

vi.mock('@repo/database', () => ({
  prisma: {
    mission: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
  }
}));

describe('MissionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllMissions', () => {
    it('should return all missions successfully', async () => {
      const mockMissions = [{ id: '1', codeName: 'TEST' }];
      (prisma.mission.findMany as any).mockResolvedValue(mockMissions);

      const result = await MissionService.getAllMissions();

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual(mockMissions);
      }
    });

    it('should return an error result if database fails', async () => {
      (prisma.mission.findMany as any).mockRejectedValue(new Error('Connection failed'));
      const result = await MissionService.getAllMissions();
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('DB_FETCH_ERROR');
      }
    });
  });

  describe('getMissionById', () => {
    it('should return a mission by id', async () => {
      const mockMission = { id: '1', codeName: 'TEST' };
      (prisma.mission.findUnique as any).mockResolvedValue(mockMission);
      const result = await MissionService.getMissionById('1');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual(mockMission);
      }
    });

    it('should return NOT_FOUND if mission does not exist', async () => {
      (prisma.mission.findUnique as any).mockResolvedValue(null);
      const result = await MissionService.getMissionById('999');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NOT_FOUND');
      }
    });
  });

  describe('executeMission', () => {
    it('should transition mission to ACTIVE', async () => {
      const mockMission = { id: '1', status: 'PENDING', progress: 0 };
      (prisma.mission.findUnique as any).mockResolvedValue(mockMission);
      (prisma.mission.update as any).mockResolvedValue({ ...mockMission, status: 'ACTIVE', progress: 10 });
      
      const result = await MissionService.executeMission('1');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.status).toBe('ACTIVE');
        expect(result.value.progress).toBe(10);
      }
    });

    it('should return error if mission is already COMPLETED', async () => {
      const mockMission = { id: '1', status: 'COMPLETED' };
      (prisma.mission.findUnique as any).mockResolvedValue(mockMission);
      
      const result = await MissionService.executeMission('1');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('INVALID_STATE');
      }
    });
  });
});