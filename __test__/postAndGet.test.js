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
      }; //new user details to be created
      });
    
    afterEach(function () {
      console.log("User is created with ID : ", userID)
    });

	  it("Create user data", async done => {

        return request.request.post(`api/users`) //post() of supertest
                //.set('Authorization', `Token $  {request.token}`) //Authorization token
                .send(userDetails) //Request header
                .expect(201) //response to be 201
                .then((res) => {
                    expect(res.body).toBeDefined(); //test if response body is defined
                    //expect(res.body.status).toBe("success")
                    userID = res.body.id;
                    let jsonContent = JSON.stringify({userId: res.body.id}); // create a json
                    fs.writeFile("data.json", jsonContent, 'utf8', function (err) //write user id into global json file to be used 
                    {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("POST response body : ", res.body)
                    done();
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

      test("GET user output", async done =>{
        await request.request.get(`api/users`) //get() of supertest
                                //.set('Authorization', `Token ${request.token}`) 
                                .expect(200).then((response) =>{
                                console.log("GET RESPONSE : ", response.body);
                                done();
                    })
      })
    }
  catch(err){
    console.log("Exception : ", err)
    }
});

