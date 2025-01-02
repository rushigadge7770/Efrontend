
const backendDomain = "http://localhost:8080"

const allApi = {
signup :{
    url : `${backendDomain}/api/signup`,
    method : 'POST'
},

login : {
    url : `${backendDomain}/api/login`,
    method : 'POST'
},
currentuser: {
  url : `${backendDomain}/api/user_details`,
  method : 'GET'
},
UpdateRole : {
    url : `${backendDomain}/api/login`,
    method : 'POST'
},

}

export default allApi 