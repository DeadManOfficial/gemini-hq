const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:C:/Users/Administrator/Gemini_HQ/packages/database/prisma/dev.db',
    },
  },
});

async function main() {
  try {
    const teams = await prisma.agentTeam.findMany({
      include: {
        members: {
          where: { isLead: true }
        }
      }
    });
    console.log('Current Leads:', JSON.stringify(teams, null, 2));
    
    const allMembers = await prisma.agentMember.findMany();
    console.log('All Personas:', JSON.stringify(allMembers, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
