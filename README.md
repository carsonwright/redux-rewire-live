# redux-rewire-live

## Basic Use
```
const {createStore} = require('./redux');
const {rewire} = require('redux-rewire-live')

const reducer = (state, action)=>({
  currentUser: 0,
  users: [
    {
      firstName: 'John',
      lastName: 'Doe'
    },
    {
      firstName: 'Jane'
      lastName: 'Doe'
    } 
  ]
})

const store = createStore(reducer)


const currentUser = (state)=>({
  ...state
  currentUser: {
    ...state.users[state.currentUser]
  }
})

const rewiredStore = rewire(store, currentUser)

rewiredStore.getState().currentUser
// {firstName: 'John', lastName: 'Doe'}
```

## Testing
```
yarn test
```
