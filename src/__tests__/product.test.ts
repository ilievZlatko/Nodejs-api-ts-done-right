import supertest from 'supertest';
import { app } from '../app';

describe('product', () => {
	describe('get product route', () => {
		describe('given the product does not exist', () => {
			it('should return a 404', async () => {
				const productId = 'product_123';
				await supertest(app).get(`/api/products/${productId}`).expect(404);
			});
		});
	});
});
