import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        total: req.body.total,
        pedido: req.body.pedidos,
      },
    });
    res.status(200).json(orden)
  }
}
