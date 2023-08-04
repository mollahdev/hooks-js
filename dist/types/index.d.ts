import { HOOK } from '@/types/enums';
export interface HookObject {
    priority: number;
    callback: Function;
    context: unknown;
}
export type HookType = Lowercase<keyof typeof HOOK>;
export type StoreType = Record<HookType, {
    [key: string]: HookObject[];
}>;
