import type { Request, Response, NextFunction } from 'express';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsController } from './products.controller';

describe('Given a instantiated Products Controller', () => {
    let controller: ProductsController;
    let repo: any;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    const mockProduct = {
        id: '1',
        name: 'Product 1',
        price: 10,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        repo = {};
        req = {} as Request;
        res = {
            status: vi.fn().mockReturnValue(res),
            json: vi.fn(),
            send: vi.fn(),
        } as unknown as Response;
        next = vi.fn() as NextFunction;
        controller = new ProductsController(repo);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('When we instantiate it', () => {
        test('Then it should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('Then it should be a instance of ProductsController', () => {
            expect(controller).toBeInstanceOf(ProductsController);
        });
    });

    describe('When method getAll is called', () => {
        describe('And repo return valid data', () => {
            test('Then it call json with a list of products', async () => {
                repo.read = vi.fn().mockResolvedValueOnce([mockProduct]);

                await controller.getAll(req, res, next);

                expect(repo.read).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith({
                    results: [mockProduct],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });

        describe('And repo throw an Error', () => {
            test('Then it call next', async () => {
                repo.read = vi.fn().mockRejectedValueOnce(new Error('Any message'));

                await controller.getAll(req, res, next);

                expect(next).toHaveBeenCalled();
            });
        });
    });
});