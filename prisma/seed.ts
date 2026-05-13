import { prisma } from "../lib/prisma.js";


async function main() {
  await prisma.usuarios.create({
    data: {
      email: 'admin@exemplo.com',
      nome: 'Admin',
      senha: 'admin',
      perfil: 'ADMINISTRADOR'
    },
  });
  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
