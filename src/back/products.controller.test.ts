import { describe, expect, it, vi } from 'vitest';
import { ProductsController } from './products.controller';

describe('Given ProductsController', () => {
    const mockRepo = {
        read: vi.fn(),
        readById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    };

    const controller = new ProductsController(mockRepo);

    describe('When instantiate controller', () => {
        it('Then should exist', () => {
            expect(controller).toBeDefined();
        });

        it('Then should be instance of ProductsController', () => {
            expect(controller).toBeInstanceOf(ProductsController);
        });
    });
});