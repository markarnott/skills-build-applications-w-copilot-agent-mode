import { Workout } from '../models/workout.js';
import { createResourceRouter } from './resource-route.js';
export default createResourceRouter('workouts', Workout);
