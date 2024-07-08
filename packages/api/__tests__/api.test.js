import test from '../src/api.js';
import { strict as assert } from 'assert';

assert.strictEqual(test(), 'Hello from api');
console.info('api tests passed');
