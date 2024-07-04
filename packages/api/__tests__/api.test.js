import api from '../src/api.js';
import { strict as assert } from 'assert';

assert.strictEqual(api(), 'Hello from api');
console.info('api tests passed');
