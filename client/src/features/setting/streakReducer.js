const initialState = {
  currentStreak: 0,
  longestStreak: 0,
  lastStreakDate: null,
};

function streakReducer(state, action) {
  switch (action.type) {
    case "SET_STREAK": {
      return {
        ...state,
        currentStreak: action.payload.currentStreak,
        longestStreak: action.payload.longestStreak,
        lastStreakDate: action.payload.lastStreakDate,
      };
    }

    default:
      return state;
  }
}

export { streakReducer, initialState };
