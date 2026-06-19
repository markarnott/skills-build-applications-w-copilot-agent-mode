import { Router } from 'express';
import { getApiBaseUrl } from '../server.js';

const router = Router();

router.get('/', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    baseUrl: getApiBaseUrl(),
  });
});

export default router;
