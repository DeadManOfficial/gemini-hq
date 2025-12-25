import { Router } from 'express';
import {
  getMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission,
  executeMission
} from '../modules/missions/controllers/mission.controller';

const router = Router();

router.get('/', getMissions);
router.get('/:id', getMissionById);
router.post('/', createMission);
router.put('/:id', updateMission);
router.delete('/:id', deleteMission);
router.post('/:id/execute', executeMission);

export default router;
