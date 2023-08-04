import { it, expect, describe } from 'vitest';
import STORE, {
    addHook,
    removeHook,
    clearStore,
    hookInsertSort,
} from '@/store';

/**
 * callbacks
 */
const hookCallback = () => {};
const hookCallback2 = () => {};
/**
 * priority
 */
const priority = 10;
const priority2 = 11;
const priority3 = 20;
/**
 *  context
 */
const context = null;
const context2 = {
    test: 'add action context two',
};
const context3 = {
    test: null,
};
// hook names
const hookName = 'add_action_hook_name';
const hookName2 = 'add_action_hook_name_2';

describe('STORE', () => {
    describe('clearStore()', () => {
        it('should clear the STORE', () => {
            clearStore();
        });

        it('should have empty actions and empty filters properties', () => {
            expect(STORE).toEqual({
                filters: {},
                actions: {},
            });
        });
    });
});

describe('hookInsertSort()', () => {
    it('should be a function', () => {
        expect(hookInsertSort).toBeTypeOf('function');
    });

    const hook = {
        priority: 1,
        callback() {},
        context: null,
    };

    const hook1 = {
        priority: 1,
        callback() {},
        context: null,
    };

    const hook2 = {
        priority: 2,
        callback() {},
        context: null,
    };

    const hook3 = {
        priority: 3,
        callback() {},
        context: null,
    };

    it('should sort the array of hook object based on priority', () => {
        expect(hookInsertSort([hook, hook3, hook1, hook2])).toEqual([
            hook,
            hook1,
            hook2,
            hook3,
        ]);
    });
});

describe('addHook()', () => {
    it('should work when register multiple callback under the same hook name', () => {
        addHook('actions', hookName, hookCallback, priority, context);
        addHook('actions', hookName, hookCallback2, priority2, context2);

        expect(STORE.actions[hookName]).toEqual(
            expect.arrayContaining([
                {
                    callback: hookCallback,
                    priority: priority,
                    context: context,
                },
                {
                    callback: hookCallback2,
                    priority: priority2,
                    context: context2,
                },
            ])
        );
    });

    it('should work when register same callback under different hook name', () => {
        addHook('actions', hookName2, hookCallback, priority3, context3);
        expect(STORE.actions[hookName2]).toEqual(
            expect.arrayContaining([
                {
                    callback: hookCallback,
                    priority: priority3,
                    context: context3,
                },
            ])
        );
    });
});

describe('removeHook()', () => {
    it('should remove one hook when remove a single hook using callback and context', () => {
        removeHook('actions', hookName, hookCallback, context);
        expect(STORE.actions[hookName]).not.toEqual(
            expect.arrayContaining([
                {
                    callback: hookCallback,
                    priority: priority,
                    context: context,
                },
                {
                    callback: hookCallback2,
                    priority: priority2,
                    context: context2,
                },
            ])
        );
    });

    it('should remove all hooks callback when removed by hook name', () => {
        removeHook('actions', hookName);
        expect(STORE.actions[hookName]).empty;

        removeHook('actions', hookName2);
        expect(STORE.actions[hookName2]).empty;
    });

    it('should return undefined with invalid params', () => {
        expect(removeHook('actions', 'random')).undefined;
        expect(removeHook('filters', 'random')).undefined;
    });
});
