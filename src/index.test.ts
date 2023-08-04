import { it, expect, describe } from 'vitest';
import {
    addAction,
    applyFilters,
    doAction,
    addFilter,
    removeAction,
    removeFilter,
} from '@/index';
import { clearStore } from '@/store';
/**
 * clear sotre
 */
clearStore();

describe('addAction() and doAction()', () => {
    it('single addAction should recieve doAction data', () => {
        let initData = '';
        addAction('plugin/init', (data: string) => {
            initData = data;
        });

        doAction('plugin/init', 'plugin init');
        expect(initData).toEqual('plugin init');
    });

    it('multiple addAction under same namespace should receive same data', () => {
        let one, two;
        let demoData = {
            user: 'jhone',
            email: 'example@gmail.com',
        };

        addAction('plugin/multiple', (data: any) => {
            one = data;
        });

        addAction('plugin/multiple', (data: any) => {
            two = data;
        });

        doAction('plugin/multiple', demoData);
        expect(one).toEqual(demoData);
        expect(two).toEqual(demoData);
    });

    // clear the store
    clearStore();

    it('addActions should be executed based on priority', () => {
        const data: unknown[] = [];
        const param = 'jhone';

        // should run third
        addAction(
            'hello',
            () => {
                data.push(`${param}_20`);
            },
            20
        );

        // should run first
        addAction(
            'hello',
            () => {
                data.push(`${param}_5`);
            },
            5
        );

        // should run second
        addAction(
            'hello',
            () => {
                data.push(`${param}_10`);
            },
            10
        );

        doAction('hello', param);
        expect(data).toEqual(['jhone_5', 'jhone_10', 'jhone_20']);
    });
});

describe('removeAction()', () => {
    it('should remove a specific action', () => {
        let one, two;
        let demoData = {
            user: 'jhone',
            email: 'example@gmail.com',
        };

        addAction(
            'plugin/remove_one',
            (data: any) => {
                one = data;
            },
            20
        );

        const callback = (data: any) => {
            two = data;
        };

        addAction('plugin/remove_one', callback, 20);
        // remove by callback
        removeAction('plugin/remove_one', callback);
        // execute
        doAction('plugin/remove_one', demoData);

        expect(one).toEqual(demoData);
        expect(two).toBeUndefined;
    });
});

// clear the store
clearStore();
describe('addFilter() and applyFilters()', () => {
    it('single applyFilter data should be modifier by addFilter data', () => {
        const demoData = {
            name: 'wordpress plugin',
            isPro: false,
        };

        addFilter('plugin/pro_data', (data: any) => {
            return {
                ...data,
                isPro: true,
            };
        });

        const filteredData = applyFilters('plugin/pro_data', demoData);

        expect(filteredData).toEqual({
            name: 'wordpress plugin',
            isPro: true,
        });
    });

    it('addFilter should be executed based on priority', () => {
        addFilter(
            'metadata',
            (data: any) => {
                data.push(20);
                return data;
            },
            20
        );

        addFilter(
            'metadata',
            (data: any) => {
                data.push(5);
                return data;
            },
            5
        );

        addFilter(
            'metadata',
            (data: any) => {
                data.push(10);
                return data;
            },
            10
        );

        const filteredData = applyFilters('metadata', []);
        expect(filteredData).toEqual([5, 10, 20]);
    });
});

describe('removeFilter()', () => {
    it('should remove a specific filter', () => {
        addFilter(
            'info',
            (data: any) => {
                data.push(20);
                return data;
            },
            20
        );

        const callback_5 = (data: any) => {
            data.push(5);
            return data;
        };

        addFilter('info', callback_5, 5);

        const callback_10 = (data: any) => {
            data.push(10);
            return data;
        };

        addFilter('info', callback_10, 10);

        // remove filter
        removeFilter('info', callback_5);
        removeFilter('info', callback_10);

        // apply filter
        const filteredData = applyFilters('info', []);
        expect(filteredData).toEqual([20]);
    });
});
