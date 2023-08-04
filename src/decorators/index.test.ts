import { it, expect, describe } from 'vitest';
import { Validate } from '@/decorators';

describe('validate()', () => {
    // test addAction and addFilter
    function test_addAction_addFilter(type: 'addAction' | 'addFilter') {
        describe(`Validate(${type})`, () => {
            it('should return a function', () => {
                expect(Validate(type)).toBeTypeOf('function');
            });

            it('should not execute when hookName and callback param does not exists', () => {
                let passed = true;
                class Hooks {
                    @Validate(type)
                    [type](...a: any[]) {
                        passed = false;
                    }
                }

                const hooks = new Hooks();
                // @ts-ignore
                hooks[type]('hook_name');
                expect(passed).toEqual(true);
            });

            it('should not execute when hookName is not string or callback is not function', () => {
                let passed = true;
                class Hooks {
                    @Validate(type)
                    [type](...a: any[]) {
                        passed = false;
                    }
                }

                const hooks = new Hooks();
                //@ts-ignore
                hooks[type]('hook_name', 10);
                //@ts-ignore
                hooks[type]('hook_name', {});
                //@ts-ignore
                hooks[type](null, () => {});
                expect(passed).toEqual(true);
            });

            it('should works when hookName is a string and callback is a function and default priority should be 10', () => {
                let passed = false;
                class Hooks {
                    @Validate(type)
                    [type](
                        _hookname: string,
                        _callback: Function,
                        priority?: any
                    ) {
                        if ('number' === typeof priority) {
                            passed = true;
                        }
                    }
                }

                const hooks = new Hooks();
                //@ts-ignore
                hooks[type]('hook_name', () => {});
                expect(passed).toEqual(true);
            });
        });
    }

    test_addAction_addFilter('addAction');
    test_addAction_addFilter('addFilter');
});
