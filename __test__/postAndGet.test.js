const request = require('../commonTests');
const fs = require('fs');
let userID;

//Create a new user
describe("POST request", () => {
  
  try{
    let userDetails;
    beforeEach(function () {  
        console.log("Input user details!")
        userDetails = {
          "name": "morpheus",
          "job": "leader"
      }; 
    });
    
    afterEach(function () {
      console.log("User is created with ID : ", userID)
    });

	  it("Create user data", async () => {

        return request.request.post(`api/users`)
                //.set('Authorization', `Token $  {request.token}`) //Authorization token
                .send(userDetails)
                .expect(201)
                .then((res) => {
                    expect(res.body).toBeDefined();
                    userID = res.body.id;
                    let jsonContent = JSON.stringify({userId: res.body.id});
                    fs.writeFile("data.json", jsonContent, 'utf8', function (err) //write user id into global json file to be used 
                    {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("POST response body : ", res.body);
                    });
                  })
                })
              }
              catch(err){
                console.log("Exception : ", err)
              }
        });

//GET all users      
describe("GET all user details", () => {
  
  try{
      beforeEach(function () {
        console.log("GET all users details ")
    });
          
      afterEach(function () {
        console.log("All users' details are retrieved")
    });

      test("GET user output", async () =>{
        await request.request.get(`api/users`)
                                .expect(200).then((response) =>{
                                console.log("GET RESPONSE : ", response.body);
                    })
      })
    }
  catch(err){
    console.log("Exception : ", err)
    }
});

