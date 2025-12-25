import { prisma } from '@repo/database';
import { Result, ShieldaError } from '@repo/types';

export class DemocracyService {
  /**
   * Casts a vote from one agent to another within a team
   */
  static async castVote(voterId: string, candidateId: string, teamId: string): Promise<Result<boolean>> {
    try {
      // 1. Ensure both voter and candidate belong to the team
      const team = await prisma.agentTeam.findUnique({
        where: { id: teamId },
        include: { members: true }
      });

      if (!team) return { ok: false, error: this.err('TEAM_NOT_FOUND', 'Team does not exist') };

      const memberIds = team.members.map(m => m.id);
      if (!memberIds.includes(voterId) || !memberIds.includes(candidateId)) {
        return { ok: false, error: this.err('INVALID_MEMBER', 'Voter or Candidate not in team') };
      }

      // 2. Clear previous vote by this voter for this team
      await prisma.vote.deleteMany({ where: { voterId, teamId } });

      // 3. Cast new vote
      await prisma.vote.create({
        data: { voterId, candidateId, teamId }
      });

      // 4. Tally and potentially update Lead
      await this.tallyVotes(teamId);

      return { ok: true, value: true };
    } catch (err: any) {
      return { ok: false, error: this.err('VOTING_FAILED', err.message) };
    }
  }

  /**
   * Tallies votes and elects the Lead (highest vote count)
   */
  private static async tallyVotes(teamId: string) {
    const votes = await prisma.vote.findMany({ where: { teamId } });
    
    const counts: Record<string, number> = {};
    votes.forEach(v => {
      counts[v.candidateId] = (counts[v.candidateId] || 0) + 1;
    });

    let newLeadId = '';
    let maxVotes = 0;

    for (const [id, count] of Object.entries(counts)) {
      if (count > maxVotes) {
        maxVotes = count;
        newLeadId = id;
      }
    }

    if (newLeadId) {
      await prisma.agentTeam.update({
        where: { id: teamId },
        data: { leadId: newLeadId }
      });
      
      // Update member flags
      await prisma.agentMember.updateMany({
        where: { teamId },
        data: { isLead: false }
      });
      await prisma.agentMember.update({
        where: { id: newLeadId },
        data: { isLead: true }
      });
    }
  }

  private static err(code: string, message: string): ShieldaError {
    return { code, message, severity: 'MEDIUM' };
  }
}
