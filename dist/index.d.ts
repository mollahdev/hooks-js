import CreateHook from '@/createHook';
declare const hooks: CreateHook;
declare const addAction: (hookName: string, callback: Function, priority?: number | undefined) => {
    [key: string]: import("./types").HookObject[];
};
declare const doAction: (hookName: string, data: unknown) => {
    [key: string]: import("./types").HookObject[];
};
declare const removeAction: (hookName: string, callback: Function) => {
    [key: string]: import("./types").HookObject[];
};
declare const addFilter: (hookName: string, callback: Function, priority?: number | undefined) => {
    [key: string]: import("./types").HookObject[];
};
declare const applyFilters: <T>(hookName: string, content: T) => T;
declare const removeFilter: (hookName: string, callback: Function) => {
    [key: string]: import("./types").HookObject[];
};
export { addAction, doAction, removeAction, addFilter, applyFilters, removeFilter, };
export default hooks;
