// src/middlewares/validationMiddleware.ts
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AvaliadorModel } from "../models/avaliadoresModel";
import { EquipeModel } from "../models/equipesModel";

// Middleware de validação para avaliadores
const validateAvaliador = [
  check("nome").isString().notEmpty().custom(async (nome, { req }) => {
    const avaliador = await AvaliadorModel.findByNome(nome);
    if (avaliador) {
      throw new Error("Nome já está em uso");
    }
  }),
  check("login").isString().notEmpty().custom(async (login, { req }) => {
    const avaliador = await AvaliadorModel.findByLogin(login);
    if (avaliador) {
      throw new Error("Login já está em uso");
    }
  }),
   check("senha").isLength({ min: 8 }),
   (req: Request, res: Response, next: NextFunction) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     next();
   },
];

// Middleware de validação para equipes
const validateEquipe = [
  check('nome').isString().notEmpty().custom(async (nome: string) => {
    // Verificar se já existe uma equipe com o mesmo nome
    const existingEquipe = await EquipeModel.findOne(nome);
    if (existingEquipe) {
      throw new Error('Nome de equipe já está em uso');
    }
    return true; // Retorna true se o nome for único
  }),

  // Middleware para lidar com os resultados da validação
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware de validação para avaliações
const validateAvaliacao = [
  check("avaliador_id").isInt(),
  check("equipe_id").isInt(),
  check("notas").isObject().notEmpty(), // Validando notas como um objeto não vazio
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateAvaliador, validateEquipe, validateAvaliacao };
