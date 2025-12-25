import { prisma } from '@repo/database';

async function seed() {
  const teams = [
    { name: 'Automaker Core', domain: 'ENGINEERING', members: ['Builder_Agent', 'Dependency_Resolver', 'Git_Ops'] },
    { name: 'ShadCN Stylists', domain: 'FRONTEND', members: ['UI_Agent', 'Theme_Generator', 'Component_Validator'] },
    { name: 'SuperGemini Governance', domain: 'GOVERNANCE', members: ['Architect_Persona', 'Security_Auditor', 'Refactorer_Persona'] },
    { name: 'Tmux Operations', domain: 'OPS', members: ['Process_Monitor', 'Log_Streamer', 'Session_Manager'] },
  ];

  for (const t of teams) {
    const createdTeam = await prisma.agentTeam.upsert({
      where: { name: t.name },
      update: {},
      create: {
        name: t.name,
        domain: t.domain,
      }
    });

    for (const m of t.members) {
      await prisma.agentMember.upsert({
        where: { name: m },
        update: { teamId: createdTeam.id },
        create: {
          name: m,
          domain: t.domain,
          capabilities: 'SHIELDA, DDD, Advanced_Prompting',
          teamId: createdTeam.id
        }
      });
    }
  }
  console.log('Democracy Seeded.');
}

seed();
