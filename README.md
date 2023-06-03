# Hooks JS

#### Available as an [NPM Package](https://www.npmjs.com/package/@mollahdev/hooks-js).

**Install with NPM:**

```sh
npm i @mollahdev/hooks-js
```

> A simple and efficient event manager for JavaScript for frontend.
> This package assumes that your code will run in an ES2015+ environment.

### API Usage

-   addAction( 'hookName', callback, priority )
-   doAction( 'hookName', data )
-   removeAction( 'hookName', callback )
-   addFilter( 'hookName', callback, priority )
-   applyFilters( 'hookName', data )
-   removeFilter( 'hookName', callback )

#### addAction Hook

addAction is the hook that the hooks-js execute when you call the doAction. The callback function of addAction expect some data that will be passed from doAction. The data can be optional.

```jsx
import { addAction } from '@mollahdev/hooks-js';
// or
import hooks from '@mollahdev/hooks-js';

const callback = function (data) {
    // do something with the data
};
// You can use any hook name you want but that must be a string type
addAction('core/ready', callback);
// or
/*
 * The last parameter is optional, it's default value is 10 (must be number type).
 * It helps you to set priority
 **/
hooks.addAction('core/ready', callback, 50);
```

#### doAction Hook

doAction is the hook that the hooks-js use to run all the addActions you used in your application. You can pass any typeof of data you want.

```jsx
import { doAction } from '@mollahdev/hooks-js';
// or
import hooks from '@mollahdev/hooks-js';

// Use the same hook name that you used for addAction
doAction('core/ready', { user: 'Jhone Doe' });
// or
hooks.doAction('core/ready');
```

#### addFilter Hook

addFilter hook allows you to modify the data that has been passed through applyFilters hook. addFilter hooks should be declared before applyFilters. The callback of addFilter receives the data used in applyFilters, the callback must return the data, You can modify the data before returning.

```jsx
import { addFilter } from '@mollahdev/hooks-js';
// or
import hooks from '@mollahdev/hooks-js';

const callback = (user) => {
    user.hasAccess = false;
    return user;
};
addFilter('namespace/current-user', callback);
// or
hooks.addFilter('namespace.user', callback, 90);
```

#### applyFilters Hook

This hook invokes all the callback attached to addFilter hook. From the addFilter hook you can modify the data passing throw applyFilters.

```jsx
import { applyFilters } from '@mollahdev/hooks-js';
// or
import hooks from '@mollahdev/hooks-js';

const user = applyFilters('namespace/current-user', {
    _id: 'something',
    name: 'Jhone Doe',
});

console.log(user); // { _id: 'something', name: 'Jhone Doe', hasAccess: false }
// or

const anotherUser = hooks.applyFilters('namespace.user', {
    role: 'editor',
});

console.log(anotherUser); // {role: 'editor', hasAccess: false}
```

#### removeAction/removeFilter Hook

Remove any added addAction/addFilter with given hook name and same callback

```jsx
import { removeAction, removeFilter } from '@mollahdev/hooks-js';
// or
import hooks from '@mollahdev/hooks-js';

// Use the same hook name and callback that you used for addAction/addFilter
removeAction('your-hook-name', callback);
removeFilter('your-hook-name', callback);
// or
hooks.removeAction('core/hook-name', callback);
hooks.removeFilter('core/hook-name', callback);
```
