import getGQL from '../helpers/api'

function getSessions() {
  return  getGQL('http://localhost:4000/graphql')
(`query getSessions{
	getSessions{
    startTime id status masterId clientId
  }
}`)
}
function getActiveSessions() {
  return  getGQL('http://localhost:4000/graphql')
(`query getActiveSessions{
	getActiveSessions{
    startTime endTime id status masterId clientId
  }
}`)
}

function getSession(sessionId) {
  return  getGQL('http://localhost:4000/graphql')
(`query getSession($sessionId:String!) {
  getSession(id:$sessionId) {
  status masterId clientId
}
}
`,{  sessionId
    })
}


function createSessionByUser(masterId, clientId, startTime, endTime) {
  return  getGQL('http://localhost:4000/graphql')
(`mutation session(
  $masterId: ID!
  $clientId: ID!
  $startTime: String!
  $endTime: String!) {
    createSessionByUser(masterId:$masterId, clientId:$clientId, startTime:$startTime, endTime:$endTime){
       startTime endTime id status masterId clientId
    }
  }`,{
    masterId,
    clientId,
    startTime,
    endTime
    })
}
function updateSession(sessionId, startTime, endTime) {
  return  getGQL('http://localhost:4000/graphql')
(`mutation updateSession($sessionId: ID!, $startTime:String!, $endTime:String!) {
  updateSession(sessionId: $sessionId, startTime:$startTime, endTime:$endTime){
    startTime endTime id status masterId clientId
 }
}`,{
    sessionId,
    startTime,
    endTime
    })
}
function deleteSession(sessionId) {
  return  getGQL('http://localhost:4000/graphql')
(`mutation deleteSession($sessionId: ID!) {
  deleteSession(sessionId: $sessionId){
   id
 }
}`, { sessionId })
}


export {
  getSessions,
  getActiveSessions,
  createSessionByUser,
  deleteSession,
  updateSession,
  getSession
}
