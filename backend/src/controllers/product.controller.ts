import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service.js';

const service = new ProductService();

export const listProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.list();
    res.json(items);
  } catch (err) { next(err); }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await service.delete(id);
    res.status(204).send();
  } catch (err) { next(err); }
};
