import { Router } from 'express';
import type { Model } from 'mongoose';
import { getApiBaseUrl } from '../config.js';

type ResourceResponse = {
  resource: string;
  baseUrl: string;
  items: unknown[];
};

export function createResourceRouter<T>(resource: string, model: Model<T>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const items = await model.find().lean();
      const payload: ResourceResponse = {
        resource,
        baseUrl: getApiBaseUrl(),
        items,
      };

      response.json(payload);
    } catch (error) {
      next(error);
    }
  });

  return router;
}