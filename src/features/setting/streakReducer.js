const initialState = {
  currentStreak: 0,
  longestStreak: 0,
  lastStreakDate: null,
};

function streakReducer(state, action) {
  switch (action.type) {
    case "UPDATE_STREAK": {
      const today = new Date().toDateString();

      if (state.lastStreakDate === today) return state;

      let current = 1;

      if (state.lastStreakDate) {
        const last = new Date(state.lastStreakDate);

        const diff = Math.floor(
          (new Date(today) - last) / (1000 * 60 * 60 * 24),
        );

        if (diff === 1) {
          current = state.currentStreak + 1;
        }
      }

      return {
        ...state,
        currentStreak: current,
        longestStreak: Math.max(current, state.longestStreak),
        lastStreakDate: today,
      };
    }

    default:
      return state;
  }
}

export { streakReducer, initialState };
