# redux-rewire-live

## Basic Use
To use 
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


const tweets = (state)=>({
  ...state
  currentUser: {
    ...state.users[state.currentUser]
  }
})


rewire(store, tweets)

store.getState().currentUser
// {firstName: 'John', lastName: 'Doe'}
```

## Testing
```
yarn test
```
