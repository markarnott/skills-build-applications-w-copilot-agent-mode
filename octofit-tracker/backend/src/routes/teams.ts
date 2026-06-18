import { Team } from '../models/team.js';
import { createResourceRouter } from './resource-route.js';

export default createResourceRouter('teams', Team);