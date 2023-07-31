import { it, expect } from 'vitest';
import STORE from '@/store';
import { addHook, removeHook } from '@/store';

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

it('STORE -> should have actions and filters properties', () => {
    expect(STORE).toEqual({
        filters: {},
        actions: {},
    });
});

it('addHook: should work when multiple callback with same hook name', () => {
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

it('addHook: should work when same callback with different hook name', () => {
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

it('removeHook: should work when remove a single hook of a hookname', () => {
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

it('removeHook: should remove all hooks callback when removed by hook name', () => {
    removeHook('actions', hookName);
    expect(STORE.actions[hookName]).empty;

    removeHook('actions', hookName2);
    expect(STORE.actions[hookName2]).empty;
});

it('removeHook: should return undefined with invalid params', () => {
    expect(removeHook('actions', 'random')).undefined;
    expect(removeHook('filters', 'random')).undefined;
});
