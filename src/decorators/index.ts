import CreateHook from "@/createHook";
import STORE from "@/store";
import { HOOK } from "@/types/enums";

type HookActionsName = keyof InstanceType<typeof CreateHook>
type ValidateDecoratorType<T extends string> = {
    [key in T]: ( ...arg: any ) => void
}

const ValidateDecorator: ValidateDecoratorType<HookActionsName> = {
    addAction(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function( hookName: string, callback: Function, priority = 10 ) {
            if( 'string' === typeof hookName && 'function' === typeof callback ) {
                return method.apply(this, [hookName, callback, parseInt(String(priority))]);
            }
        }
    },

    doAction(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function( hookName: string, data: unknown ) {
            if( 'string' === typeof hookName && Object.hasOwn( STORE[HOOK.ACTIONS], hookName ) ) {
                return method.apply( this, [hookName, data] )
            }
        }
    },

    removeAction(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function( hookName: string, callback: Function ) {
            if( 'string' === typeof hookName && 'function' === typeof callback && Object.hasOwn(STORE[HOOK.ACTIONS], hookName) ) {
                return method.apply( this, [hookName, callback] )
            }
        }
    },

    applyFilters( _target: any, _propertyKey: string, descriptor: PropertyDescriptor ) {
        const method = descriptor.value;
        descriptor.value = function( hookName: string, content: unknown ) {
            if( 'string' === typeof hookName ) {
                return method.apply(this, [hookName, content]);
            }
        }
    },

    addFilter( _target: any, _propertyKey: string, descriptor: PropertyDescriptor ) {
        const method = descriptor.value;
        descriptor.value = function( hookName: string, callback: Function, priority = 10 ) {
            if( 'string' === typeof hookName && 'function' === typeof callback ) {
                return method.apply(this, [hookName, callback, parseInt(String(priority))]);
            }
        }
    },

    removeFilter(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function( hookName: string, callback: Function ) {
            if( 'string' === typeof hookName && 'function' === typeof callback && Object.hasOwn(STORE[HOOK.FILTERS], hookName) ) {
                return method.apply( this, [hookName, callback] )
            }
        }
    }
}

export function Validate(type: HookActionsName) {
    return ValidateDecorator[type];
}