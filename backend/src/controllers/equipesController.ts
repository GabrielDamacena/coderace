// src/controllers/equipeController.ts

import { Request, Response } from "express";
import equipeService from "../services/equipesService";
import { Equipe } from "../models/equipesModel";

class EquipeController {
  async createEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeData: Equipe = req.body;
      const equipe = await equipeService.createEquipe(equipeData);
      return res.status(201).json(equipe);
    } catch (error) {
      return res.status(500).json({ error: "Error creating equipe" });
    }
  }

  async getEquipes(req: Request, res: Response): Promise<Response> {
    try {
      const equipes = await equipeService.getAllEquipes();
      if (equipes) {
        return res.status(200).json(equipes);
      }
      return res.status(404).json({ error: "Equipes not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching equipes" });
    }
  }

  async getEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeId = Number(req.params.id);
      const equipe = await equipeService.getEquipeById(equipeId);
      if (equipe) {
        return res.status(200).json(equipe);
      }
      return res.status(404).json({ error: "Equipe not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching equipe" });
    }
  }

  async updateEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeId = Number(req.params.id);
      const updateData: Partial<Equipe> = req.body;
      const equipe = await equipeService.updateEquipe(equipeId, updateData);
      if (equipe) {
        return res.status(200).json(equipe);
      }
      return res.status(404).json({ error: "Equipe not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error updating equipe" });
    }
  }

  async deleteEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeId = Number(req.params.id);
      await equipeService.deleteEquipe(equipeId);
      return res.status(200).json({ message: "Equipe deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting equipe" });
    }
  }
}

export default new EquipeController();
