// src/middlewares/validationMiddleware.ts
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Middleware de validação para avaliadores
const validateAvaliador = [
  check("nome").isString().notEmpty(),
  check("login").isString().notEmpty(),
  check("senha").isString().notEmpty(), // Validando senha como string e não vazio
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
  check("nome").isString().notEmpty(),
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
