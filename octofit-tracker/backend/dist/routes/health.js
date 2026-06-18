import { Router } from 'express';
import { getApiBaseUrl } from '../config.js';
const router = Router();
router.get('/', (_request, response) => {
    response.json({
        status: 'ok',
        service: 'octofit-tracker-api',
        baseUrl: getApiBaseUrl(),
    });
});
export default router;
