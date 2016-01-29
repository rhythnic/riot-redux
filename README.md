# Riot Redux Mixin #
This repo is for demonstrating one possible architecture for using Riot and Redux together.


## Thoughts behind the architecture ##

I've been using Redux with React for a couple of months, and while I love the flow of data
that Redux provides, I find a couple of practices suggested in the documentation a little
verbose on large projects, mainly storing event names as variables and importing action
creators into components.  React too can seem a bit wordy, which is what got me looking into Riot.


## Example folder ##

The example folder contains all the files that you can run with a local web-server.
It doesn't use ES6 or modules, but it is meant to be easy to download and run.
The example folder contains a file 'riot-redux.js' which is the mixin that may become
a published library after I receive community input regarding the API.  I know other
Riot-Redux mixins exist, but I wanted to provide an alternate take on the architecture
and API, and if the other mixin maintainers are up for it, we could merge the
mixins or just maintain them separately.


## Architecture ##

* Dispatch is only used to directly change state.
* Events are used to trigger async actions and actions with dependencies
* Instead of a select function, specify a mapping of store paths to local properties

The mixin wraps a Redux store in a riot observable and makes it available on the
tag.  The tag specifies which parts of the store it wants through a mapping.
The mixin subscribes to the store, and uses the mapping to construct a new state
on each store change.  If any of the values have changed, the mixin updates the
tag with the new values.  The store values are available in the tag on the 'state'
property.  This is a React thing, and I think it helps separate state from other
properties on the tag object.


## API ##

### Tag API ###

```
this.mixin('redux')

// specify store mapping
this.use({prop: 'store.prop.path'})

// use in template
<p>{state.prop}</p>

// dispatch to store
this.dispatch('type_string' [, actionData])
// or
this.store.dispatch({type: 'type_string', data: data})
```

'this.store' is the redux store wrapped in a riot observable, so it has those APIs
available.


## Contributing ##

All Riot community input and contributions are welcome.  There's no formal
structure, just typical github flow.  I would love more opinions about how to
improve the API or general architectural improvements.  (Note: not the example
app architecture, just the mixin.)
