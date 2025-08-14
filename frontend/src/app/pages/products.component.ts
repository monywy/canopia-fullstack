import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../shared/product.service';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3>Productos</h3>
        <button class="button-primary" (click)="openNew()">Nuevo</button>
      </div>

      <div style="overflow:auto;">
        <table style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align:left; padding:.5rem; border-bottom:1px solid #333">Nombre</th>
              <th style="text-align:left; padding:.5rem; border-bottom:1px solid #333">Descripción</th>
              <th style="text-align:right; padding:.5rem; border-bottom:1px solid #333">Precio</th>
              <th style="text-align:right; padding:.5rem; border-bottom:1px solid #333">Stock</th>
              <th style="padding:.5rem; border-bottom:1px solid #333"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td style="padding:.5rem;">{{p.name}}</td>
              <td style="padding:.5rem;">{{p.description}}</td>
              <td style="padding:.5rem; text-align:right;">{{p.price | number:'1.2-2'}}</td>
              <td style="padding:.5rem; text-align:right;">{{p.stock}}</td>
              <td style="padding:.5rem; text-align:right;">
                <button class="link" (click)="edit(p)">Editar</button>
                <button class="link" (click)="remove(p)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div *ngIf="dialog" class="card" style="max-width:520px;margin:1rem auto;">
      <h3 style="margin-bottom:.5rem;">{{ form.id ? 'Editar' : 'Nuevo' }} producto</h3>
      <form (ngSubmit)="save()" #f="ngForm">
        <label>Nombre</label>
        <input name="name" [(ngModel)]="form.name" required minlength="3"/>
        <div *ngIf="f.submitted && (!form.name || form.name.length<3)" style="color:#ff6b6b">Mínimo 3 caracteres</div>

        <label style="display:block;margin-top:.5rem;">Descripción</label>
        <input name="description" [(ngModel)]="form.description"/>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:.5rem; margin-top:.5rem;">
          <div>
            <label>Precio</label>
            <input name="price" [(ngModel)]="form.price" type="number" step="0.01" min="0.01" required/>
          </div>
          <div>
            <label>Stock</label>
            <input name="stock" [(ngModel)]="form.stock" type="number" min="0" required/>
          </div>
        </div>

        <div style="display:flex; gap:.5rem; margin-top:1rem;">
          <button class="button-primary" [disabled]="f.invalid">Guardar</button>
          <button class="link" type="button" (click)="dialog=false">Cancelar</button>
        </div>
      </form>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  dialog = false;
  form: any = { name: '', description: '', price: 0, stock: 0 };

  constructor(private api: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.list().subscribe(res => this.products = res);
  }

  openNew() {
    this.form = { name: '', description: '', price: 0, stock: 0 };
    this.dialog = true;
  }

  edit(p: Product) {
    this.form = { ...p };
    this.dialog = true;
  }

  save() {
    const payload = { ...this.form, price: Number(this.form.price), stock: Number(this.form.stock) };
    (this.form.id ? this.api.update(this.form.id, payload) : this.api.create(payload))
      .subscribe(() => { this.dialog = false; this.load(); });
  }

  remove(p: Product) {
    if (!confirm('¿Eliminar producto?')) return;
    this.api.delete(p.id!).subscribe(() => this.load());
  }
}
