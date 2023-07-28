import { it, expect } from 'vitest';
import STORE from '@/store';
import { addHook } from '@/store';

it('STORE -> should have actions and filters properties', () => {
    expect(STORE).toEqual({
        filters: {},
        actions: {},
    });
});

it('addHook function should register the hook into the STORE', () => {
    /**
     * test multiple callback under same hook name
     */
    const hookCallback = () => {};
    const hookCallback2 = () => {};
    const priority = 10;
    const priority2 = 11;
    const context = null;
    const context2 = {
        test: 'add action context two',
    };
    const hookName = 'add_action_hook_name';

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

    /**
     * test with a different hook name
     */
    const priority3 = 20;
    const context3 = {
        test: null,
    };
    const hookName2 = 'add_action_hook_name_2';

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
