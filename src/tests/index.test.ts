import { test, expectTypeOf } from 'vitest';
import { addAction } from '../index';

test('Is function', () => {
    expectTypeOf(addAction).toBeFunction();
});
