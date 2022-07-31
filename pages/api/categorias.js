// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prima = new PrismaClient();
  const _productos = await prima.categoria.findMany({
    include: {
      productos: true,
    },
  });

  res.status(200).json(_productos);
}
