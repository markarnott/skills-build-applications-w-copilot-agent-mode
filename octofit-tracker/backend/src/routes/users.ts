import { User } from '../models/user.js';
import { createResourceRouter } from './resource-route.js';

export default createResourceRouter('users', User);