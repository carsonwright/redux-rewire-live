const {rewire} = require('./index');
var assert = require('assert');
const {createStore} = require('redux');

describe('rewire', function() {
  const defaultState = {
    firstName: "Carson",
    lastName: "Wright"
  }

  const store = createStore((state = defaultState, action)=>{
    switch(action.type){
      case 'SET_FIRST_NAME':
        return {
          ...state,
          firstName: action.payload
        }
      case 'SET_LAST_NAME':
        return {
          ...state,
          lastName: action.payload
        }
    }
    return state
  })


  describe('#getState()', function() {
    it('should return a rewired state based on the store and rewiring passed in', function() {
      const rewiredStore = rewire(store, (state)=>({
          ...state,
          fullName: `${state.firstName} ${state.lastName}`,
      }))

      assert.equal((
        rewiredStore.getState().fullName
      ), 'Carson Wright');
    });
  });
  describe('#subscribe()', function() {
    it('should trigger subscriptions', function(done) { 
      const rewiredStore = rewire(store, (state)=>({
          ...state,
          fullName: `${state.firstName} ${state.lastName}`,
      }))

      rewiredStore.subscribe(()=>{
        assert.equal((
          rewiredStore.getState().fullName
        ), 'John Wright');
        done()
      })

      rewiredStore.dispatch({
        type: 'SET_FIRST_NAME',
        payload: 'John'
      })
    });
  });
  describe('#dispatch()', function() {
    it('should trigger subscriptions', function(done) { 
      const mockStore = {
        dispatch: (action)=>{
          assert(action.type === 'SET_LAST_NAME')
          done()
        }
      }

      const rewiredStore = rewire(mockStore, (state)=>({
          ...state,
          fullName: `${state.firstName} ${state.lastName}`,
      }))

      rewiredStore.dispatch({
        type: 'SET_LAST_NAME',
        payload: 'Doe'
      })
    });
  });
  describe('#replaceReducer()', function() {
    it('should trigger replaceReducer', function(done) { 
      const mockStore = {
        replaceReducer: (cb)=>{
          assert(typeof cb === 'function')
          done()
        }
      }

      const rewiredStore = rewire(mockStore, (state)=>({
          ...state,
          fullName: `${state.firstName} ${state.lastName}`,
      }))

      rewiredStore.replaceReducer(()=>{
        
      })
    });
  });
});