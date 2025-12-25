import { Router } from 'express';
import { prisma } from '@repo/database';
import { DemocracyService } from '../services/democracy.service';

const router = Router();

// Get team status and elected leads
router.get('/status', async (req, res) => {
  const teams = await prisma.agentTeam.findMany({
    include: { members: true }
  });
  res.json({ success: true, teams });
});

// Cast a vote
router.post('/vote', async (req, res) => {
  const { voterId, candidateId, teamId } = req.body;
  const result = await DemocracyService.castVote(voterId, candidateId, teamId);
  res.status(result.ok ? 200 : 400).json(result);
});

export default router;
