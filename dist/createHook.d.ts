import { StoreType } from "@/types";
import { HOOK } from "@/types/enums";
export default class CreateHook {
    addAction(hookName: string, callback: Function, priority?: number): StoreType[HOOK.ACTIONS];
    doAction(hookName: string, data: unknown): StoreType[HOOK.ACTIONS];
    removeAction(hookName: string, callback: Function): StoreType[HOOK.ACTIONS];
    applyFilters<T>(hookName: string, content: T): T;
    addFilter(hookName: string, callback: Function, priority?: number): StoreType[HOOK.FILTERS];
    removeFilter(hookName: string, callback: Function): StoreType[HOOK.FILTERS];
}
