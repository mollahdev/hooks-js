import CreateHook from '@/createHook';

const hook = new CreateHook();
const addAction = hook.addAction.bind(hook);
const doAction = hook.doAction.bind(hook);
const removeAction = hook.removeAction.bind(hook);
const addFilter = hook.addFilter.bind(hook);
const applyFilters = hook.applyFilters.bind(hook);
const removeFilter = hook.removeFilter.bind(hook);

export {
    addAction,
    doAction,
    removeAction,
    addFilter,
    applyFilters,
    removeFilter,
};

export default hook;
