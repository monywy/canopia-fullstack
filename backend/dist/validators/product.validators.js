import { z } from 'zod';
export const productSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().max(5000).optional().or(z.literal('').transform(() => undefined)),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    category_id: z.number().int().positive().optional()
});
export const validateProduct = (req, _res, next) => {
    const data = req.body;
    const parsed = productSchema.safeParse({
        ...data,
        price: typeof data.price === 'string' ? Number(data.price) : data.price,
        stock: typeof data.stock === 'string' ? Number(data.stock) : data.stock,
        category_id: data.category_id === '' || data.category_id === null ? undefined :
            (typeof data.category_id === 'string' ? Number(data.category_id) : data.category_id)
    });
    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => ({ path: i.path.join('.'), message: i.message }));
        return next({ status: 400, message: 'Validation error', details: issues });
    }
    req.body = parsed.data;
    next();
};
