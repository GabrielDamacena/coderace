// src/controllers/avaliacaoController.ts

import { Request, Response } from "express";
import avaliacaoService from "../services/avaliacoesService";
import { Avaliacao } from "../models/avaliacoesModel";

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoData: Avaliacao = req.body;
      const avaliacao = await avaliacaoService.createAvaliacao(avaliacaoData);
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: "Error creating avaliacao" });
    }
  }

  async getAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoService.getAllAvaliacoes();
      if (avaliacoes) {
        return res.status(200).json(avaliacoes);
      }
      return res.status(404).json({ error: "Avaliacoes not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching avaliacoes" });
    }
  }

  async getAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      const avaliacao = await avaliacaoService.getAvaliacaoById(avaliacaoId);
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      }
      return res.status(404).json({ error: "Avaliacao not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching avaliacao" });
    }
  }

  async updateAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      const updateData: Partial<Avaliacao> = req.body;
      const avaliacao = await avaliacaoService.updateAvaliacao(avaliacaoId, updateData);
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      }
      return res.status(404).json({ error: "Avaliacao not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error updating avaliacao" });
    }
  }

  async deleteAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      await avaliacaoService.deleteAvaliacao(avaliacaoId);
      return res.status(200).json({ message: "Avaliacao deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting avaliacao" });
    }
  }
}

export default new AvaliacaoController();
