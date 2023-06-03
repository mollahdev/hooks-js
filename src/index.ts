import CreateHook from '@/createHook';

const hooks = new CreateHook();
const addAction = hooks.addAction.bind(hooks);
const doAction = hooks.doAction.bind(hooks);
const removeAction = hooks.removeAction.bind(hooks);
const addFilter = hooks.addFilter.bind(hooks);
const applyFilters = hooks.applyFilters.bind(hooks);
const removeFilter = hooks.removeFilter.bind(hooks);

export {
    addAction,
    doAction,
    removeAction,
    addFilter,
    applyFilters,
    removeFilter,
};

export default hooks;
