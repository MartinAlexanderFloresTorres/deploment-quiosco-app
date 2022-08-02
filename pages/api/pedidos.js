import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  // GET
  if (req.method == "GET") {
    const pedidos = await prisma.orden.findMany();
    res.status(200).json(pedidos);
  }
  // PUT
  if (req.method == "PUT") {
    const pedidos = await prisma.orden.update({
      where: {
        id: req.body.id,
      },
      data: {
        entregado: true,
      },
    });
    res.status(200).json(pedidos);
  }
  // DELETE
  if (req.method == "DELETE") {
    const id = Number(req.query.id);
    const deleteUser = await prisma.orden.delete({
      where: { id },
    });
    res.status(200).json(deleteUser);
  }
}
