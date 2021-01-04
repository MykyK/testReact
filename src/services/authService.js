import getGQL from '../helpers/api'

function myLogin(username, password) {
  return  getGQL('http://localhost:4000/graphql')
(`query login($username:String!, $password:String!){
  login(username:$username, password:$password)
}`,{  username,
      password
    })
}

function myRegistration(username, password, role) {
  return  getGQL('http://localhost:4000/graphql')
(`mutation register($username:String!,$password:String!,$role:String!, $id:ID){
	upsertUser(username:$username,password:$password,role: $role, id:$id){
    username id role
  }
}`,{  username,
      password,
      role
    })
}



  export  {
    myLogin,
    myRegistration
  };
