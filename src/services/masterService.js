import getGQL from '../helpers/api'

function getMasters() {
  return  getGQL('http://localhost:4000/graphql')
(`query masters {
  getMasters {
  username role id
}
}`)
}


function getMaster(id) {
  return  getGQL('http://localhost:4000/graphql')
(`query master($id:String!) {
  getMaster(id:$id) {
  username role masterId id
}
}
`,{  id
    })
}
function getMasterBySession(masterId) {
  return  getGQL('http://localhost:4000/graphql')
(`query getMasterBySession($masterId:String!){
  getMasterBySession(masterId: $masterId){
    username role masterId id
  }
}
`,{  masterId
    })
}

function getMasterSessions(masterId) {
  return  getGQL('http://localhost:4000/graphql')
(`query getMasterSessions($masterId:String!){
  getMasterSessions(id: $masterId){
    startTime endTime id status masterId clientId
  }
}`,{
  masterId
})
}

export {
  getMasters,
  getMaster,
  getMasterSessions,
  getMasterBySession
}
