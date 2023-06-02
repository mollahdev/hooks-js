import { StoreType } from "@/types"
import { Validate } from "@/decorators";
import STORE, { addHook, removeHook } from "@/store";
import { HOOK } from "@/types/enums";

export default class CreateHook {

    @Validate( 'addAction' )
    addAction( hookName: string, callback: Function, priority?: number ): StoreType[HOOK.ACTIONS]
    {
        addHook( HOOK.ACTIONS, hookName, callback, priority || 10, null );
        return STORE[HOOK.ACTIONS];
    }

    @Validate( 'doAction' )
    doAction(hookName: string, data: unknown): StoreType[HOOK.ACTIONS] {
        const hooks = STORE[HOOK.ACTIONS][hookName];
        ( hooks || [] ).forEach( item => item.callback(data) )

        return STORE[HOOK.ACTIONS]
    }

    @Validate( 'removeAction' )
    removeAction( hookName: string, callback: Function ): StoreType[HOOK.ACTIONS] {
        removeHook( HOOK.ACTIONS, hookName, callback, null );
		return STORE[HOOK.ACTIONS];
	}

    @Validate( 'applyFilters' )
    applyFilters<T>( hookName: string, content: T ): T {
        const hooks = STORE[HOOK.FILTERS][hookName];
        if( (hooks || []).length > 0 ) {
            (hooks || []).forEach( item => {
                item.context = content
                content = item.callback( content )
            } )
        } 

        return content;
    }

    @Validate("addFilter")
    addFilter( hookName: string, callback: Function, priority?: number ): StoreType[HOOK.FILTERS] {
        addHook( HOOK.FILTERS, hookName, callback, priority || 10, null );
        return STORE[HOOK.FILTERS]
    }

    @Validate('removeFilter')
    removeFilter( hookName: string, callback:Function ): StoreType[HOOK.FILTERS] {
		removeHook( HOOK.FILTERS, hookName, callback, null );
		return STORE[HOOK.FILTERS];
	}
}
