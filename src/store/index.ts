import { StoreType, HookObject, HookType } from "@/types"

const STORE: StoreType = {
    actions: {},
    filters: {}
}

export const hookInsertSort = <T extends HookObject[]>( hooks: T ): T => {
    let 
        hook: HookObject, 
        forwardIndex: number,
        backwordIndex: number,
        prevHook: HookObject;
    
    for ( forwardIndex = 1; forwardIndex < hooks.length; forwardIndex++ ) {
        hook = hooks[ forwardIndex ] as HookObject;
        backwordIndex = forwardIndex;

        while ( 
            ( prevHook = hooks[ backwordIndex - 1 ] as HookObject ) 
            && prevHook.priority > hook.priority 
        ) {
            hooks[ backwordIndex ] = hooks[ backwordIndex - 1 ] as HookObject;
            --backwordIndex;
        }
        hooks[ backwordIndex ] = hook;
    }

    return hooks;
}

export const addHook = <T extends string>( type: HookType, hookName: T, callback: Function, priority: number, context: unknown ) => {
    const hookObject: HookObject = {
        callback,
        priority,
        context,
    };

    let hooks = STORE[ type ][ hookName ];
    if ( hooks ) {
        
        let hasSameCallback = false;
        hooks.forEach(function(hook) {
            if ( hook.callback === callback ) {
                hasSameCallback = true;
                return false;
            }
        })

        if ( hasSameCallback ) {
            return;
        }

        hooks.push( hookObject );
        hooks = hookInsertSort( hooks );
    } else {
        hooks = [ hookObject ];
    }

    STORE[ type ][ hookName ] = hooks;
}

export const removeHook = <T extends string>( type: HookType, hookName:T, callback: Function, context: unknown ) => {
    let handlers, handler, i;

    if ( ! STORE[ type ][ hookName ] ) {
        return;
    }
    if ( ! callback ) {
        STORE[ type ][ hookName ] = [];
    } else {
        handlers = STORE[ type ][ hookName ] as HookObject[];
        if ( ! context ) {
            for ( i = handlers.length; i--; ) {
                if ( handlers[ i ] &&  (handlers[ i ] as HookObject).callback === callback ) {
                    handlers.splice( i, 1 );
                }
            }
        } else {
            for ( i = handlers.length; i--; ) {
                handler = handlers[ i ];
                if ( (handler as HookObject).callback === callback && (handler as HookObject).context === context ) {
                    handlers.splice( i, 1 );
                }
            }
        }
    }
}

export default STORE;