import { StoreType, HookObject, HookType } from "@/types";
declare const STORE: StoreType;
export declare const hookInsertSort: <T extends HookObject[]>(hooks: T) => T;
export declare const addHook: <T extends string>(type: HookType, hookName: T, callback: Function, priority: number, context: unknown) => void;
export declare const removeHook: <T extends string>(type: HookType, hookName: T, callback: Function, context: unknown) => void;
export default STORE;
