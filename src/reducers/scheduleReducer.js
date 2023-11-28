export const scheduleReducer = (state, action) => {
    const removeFromArray = (arr, index) => {
      return arr.filter((item, i) => i !== index);
    };
  
    switch (action.type) {
      case 'mon':
        return { ...state, mon: [...state.mon, action.payload] };
      case 'tue':
        return { ...state, tue: [...state.tue, action.payload] };
      case 'wed':
        return { ...state, wed: [...state.wed, action.payload] };
      case 'thu':
        return { ...state, thu: [...state.thu, action.payload] };
      case 'fri':
        return { ...state, fri: [...state.fri, action.payload] };
      case 'sat':
        return { ...state, sat: [...state.sat, action.payload] };
      case 'sun':
        return { ...state, sun: [...state.sun, action.payload] };
      case 'rmMon':
        return { ...state, mon: [...removeFromArray(state.mon, action.payload)] };
      case 'rmTue':
        return { ...state, tue: [...removeFromArray(state.tue, action.payload)] };
      case 'rmWed':
        return { ...state, wed: [...removeFromArray(state.wed, action.payload)] };
      case 'rmThu':
        return { ...state, thu: [...removeFromArray(state.thu, action.payload)] };
      case 'rmFri':
        return { ...state, fri: [...removeFromArray(state.fri, action.payload)] };
      case 'rmSat':
        return { ...state, sat: [...removeFromArray(state.sat, action.payload)] };
      case 'rmSun':
        return { ...state, sun: [...removeFromArray(state.sun, action.payload)] };
      case 'all':
        let { mon, tue, wed, thu, fri, sat, sun } = action.payload;
        return { mon, tue, wed, thu, fri, sat, sun };
      default:
        return state;
    }
  };
  