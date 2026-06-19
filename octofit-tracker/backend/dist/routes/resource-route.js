import { Router } from 'express';
import { getApiBaseUrl } from '../server.js';
export function createResourceRouter(resource, model) {
    const router = Router();
    router.get('/', async (_request, response, next) => {
        try {
            const items = await model.find().lean();
            const payload = {
                resource,
                baseUrl: getApiBaseUrl(),
                items,
            };
            response.json(payload);
        }
        catch (error) {
            next(error);
        }
    });
    return router;
}
