// src/appRouter.ts
import express from "express";
import avaliadorRoutes from "./avaliadoresRoutes";
import equipeRoutes from "./equipesRoutes";
import avaliacaoRoutes from "./avaliacoesRoutes";

const appRouter = express();

// Rota para manipular avaliadores
appRouter.use("/avaliadores", avaliadorRoutes);

// Rota para manipular equipes
appRouter.use("/equipes", equipeRoutes);

// Rota para manipular avaliações
appRouter.use("/avaliacoes", avaliacaoRoutes);

export default appRouter;
