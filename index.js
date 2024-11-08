// Create the Store function which takes a reducer and initializes the state management functions
function createStore(reducer) {
    let state; // Holds the current state
    let listeners = []; // Array to hold subscriber functions
  
    // Get the current state
    const getState = () => {
      return state;
    };
  
    // Dispatch an action to update the state and notify subscribers
    const dispatch = (action) => {
      state = reducer(state, action); // Update state based on the reducer
  
      listeners.forEach(listener => listener()); // Notify all subscribers
    };
  
    // Subscribe a listener function to state changes
    const subscribe = (listener) => {
      listeners.push(listener); // Add the listener to the list
  
      // Return an unsubscribe function to remove the listener
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
  
    // Initialize the state by dispatching a dummy action
    dispatch({}); 
  
    // Return the store functions
    return { getState, dispatch, subscribe };
  }
  
  // Define the reducer function to handle actions and update the state
  function tallyReducer(state = { count: 0 }, action) {
    console.log('Reducer called with state:', state, 'and action:', action);
    
    switch (action.type) {
      case 'ADD':
        return { count: state.count + 1 };
      case 'SUBTRACT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        return state;
    }
  }
  
  // Create the store with the tallyReducer
  const store = createStore(tallyReducer);
  
  // Subscribe to the store to log the state whenever it changes
  store.subscribe(() => {
    console.log('State has changed! Current State:', store.getState());
  });
  

  