// On second thought, these are actually static (unless we are hot-swapping plugins)
// so should probably not be part of the state.
// They could be placed in their own menuItems file and be added to by a
// addMenuItem plugin endpoint.
const initialState = {
  menuItems: [
    { id: 'my-data', name: 'My Data', requiresLogin: true },
    { id: 'collection', name: 'Collections' },
    { id: 'user', name: 'Users' },
    { id: 'group', name: 'Groups' },
    { id: 'folder', name: 'Folders' },
    { id: 'item', name: 'Items' },
    { id: 'admin-console', name: 'Admin Console', requiresAdmin: true },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export const retrieveMenuItems = state => {
  return state.main.menuItems.filter(item => {
    return (state.user.id || !item.requiresLogin) && (state.user.admin || !item.requiresAdmin); // <-- todo: this should be "dumb" and use a selector implemented alongside reducers in main module
  });
};
