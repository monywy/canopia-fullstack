import { Product } from '../entities/product.entity.js';
import { ProductRepository } from '../repositories/product.repository.js';

export class ProductService {
  constructor(private repo = new ProductRepository()) {}

  list(): Promise<Product[]> {
    return this.repo.findAll();
  }

  get(id: number): Promise<Product | null> {
    return this.repo.findById(id);
  }

  create(data: Product): Promise<Product> {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<Product>): Promise<Product> {
    return this.repo.update(id, data);
  }

  delete(id: number): Promise<void> {
    return this.repo.softDelete(id);
  }
}
