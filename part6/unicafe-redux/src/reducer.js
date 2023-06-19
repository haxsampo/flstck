const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newObj = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return newObj
    case 'OK':
      const newObj1 = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      return newObj1
    case 'BAD':
      const newObj2 = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      return newObj2
    case 'ZERO':
      const zer = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zer
    default: return state
  }

}

export default counterReducer
