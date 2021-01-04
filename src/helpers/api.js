const token =  localStorage.getItem('api_token') ? localStorage.getItem('api_token') : " "

 const getGQL = (url, headers = {Authorization: `Bearer ${token}`}) =>
(query = "", variables = {}) =>
fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...headers
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())

export default getGQL;
