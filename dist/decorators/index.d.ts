import CreateHook from "@/createHook";
type HookActionsName = keyof InstanceType<typeof CreateHook>;
export declare function Validate(type: HookActionsName): (...arg: any) => void;
export {};
