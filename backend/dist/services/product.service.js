import { ProductRepository } from '../repositories/product.repository.js';
export class ProductService {
    constructor(repo = new ProductRepository()) {
        this.repo = repo;
    }
    list() {
        return this.repo.findAll();
    }
    get(id) {
        return this.repo.findById(id);
    }
    create(data) {
        return this.repo.create(data);
    }
    update(id, data) {
        return this.repo.update(id, data);
    }
    delete(id) {
        return this.repo.softDelete(id);
    }
}
