module.exports =  {
    rewire: (store, ...rewires)=>({
        dispatch: (action)=>(
            store.dispatch(action)
        ),
        getState: ()=>(
            rewires.reduce((acc, rewire)=>
                rewire(
                    acc
                )
            , store.getState())
        ),
        subscribe: (cb)=>(
            store.subscribe(cb)
        ),
        replaceReducer: (...options)=>(
            store.replaceReducer(...options)
        )
    })
}