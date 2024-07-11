import test from '../lib/index.js';
import { strict as assert } from 'assert';

assert.strictEqual(test(), 'Hello from lib');
console.info('lib tests passed');
