import express from "express";
import { prisma } from "../server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertDates } from "../middleware/convertDates";

export const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const taskList = await prisma.task.findMany();
    return res.status(200).json(taskList);
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task = await prisma.task.findUniqueOrThrow({ where: { taskId: id }, include: { comments: true } });
    return res.status(200).json(task);
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === "P2025") {
      return res
        .status(404)
        .json({
          success: false,
          error: "Não encontramos nenhuma tarefa com esse ID.",
        });
    }
    return res
      .status(500)
      .json({ success: false, error: "Ocorreu um erro interno no servidor." });
  }
});

route.post("/", convertDates, async ({ body }, res) => {
  try {
    if (body.comments) {
      const newTask = {
        ...body,
        comments: {
          create: { ...body.comments },
        },
      };
      const response = await prisma.task.create({ data: newTask });
      return res.status(201).json({ success: true, data: response });
    }

    const response = await prisma.task.create({ data: body });
    return res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await prisma.task.delete({ where: { taskId: id } });
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === "P2025") {
      return res
        .status(404)
        .json({
          success: false,
          error: "Não encontramos nenhuma tarefa com esse ID.",
        });
    }
    return res
      .status(500)
      .json({ success: false, error: "Ocorreu um erro interno no servidor." });
  }
});
