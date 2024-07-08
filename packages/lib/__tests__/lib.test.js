import test from '../lib/lib.js';
import { strict as assert } from 'assert';

assert.strictEqual(test(), 'Hello from lib');
console.info('lib tests passed');
