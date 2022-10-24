export default {
  recipes(state) {
    return state.recipes;
  },
  hasRecipes(state) {
    // will use this to check for recipes later.
    return state.recipes && state.recipes.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      // IF there is no timestamp, we should update.
      return true;
    }
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60; // We subtract the current time from the lastFetch time, divide it by 1000 for milliseconds and see if it's been longer than 60 seconds.
  },
};
