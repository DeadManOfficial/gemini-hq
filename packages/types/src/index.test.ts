import { describe, it, expect } from 'vitest';
import { Mission } from './index';

describe('Mission Types', () => {
  it('should allow valid mission structure', () => {
    const mission: Mission = {
      id: '1',
      codeName: 'TEST',
      description: 'Test Mission',
      status: 'PENDING',
      priority: 'LOW',
      progress: 0,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01'
    };
    expect(mission.id).toBe('1');
    expect(mission.status).toBe('PENDING');
  });
});
