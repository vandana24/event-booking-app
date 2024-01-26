const initialState = {
    slotData:[]
};

const rootReducer = (state = initialState, action) => {
    // Handle actions and update the state accordingly
    switch (action.type) {
      case 'GET_SLOT_DATA':
        return {
          ...state,
          slotData: action.payload
        };  
      default:
        return state;
    }
  };
  
  export default rootReducer;