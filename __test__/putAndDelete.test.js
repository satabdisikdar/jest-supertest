const request = require('../commonTests');
const fs = require('fs'); //file system
const data = require('../data.json'); //data.json containing the global variables

//Update user data
describe("PUT user details", () => {

    try{
        let newDetails;
        beforeEach(function () {
            console.log("Input updated user's details");
            newDetails = {
                "name": "morpheus",
                "job": "zion resident"
            }; // details to be updated
  
        });
        afterEach(function () {
            console.log("user details are updated");
        });
  
        test("Update user now", async done =>{

            console.log("User to be updated : ", data.userId)

            const response = await request.request.put(`api/users/${data.userId}`).send(newDetails) //call put() of supertest
                                //.set('Authorization', `Token ${request.token}`) 
                                        .expect(200)
            expect(response.body.updatedAt).toBeDefined();
            console.log("UPDATED RESPONSE : ", response.body);
            done();
    })
  }
    catch(err){
        console.log("ERROR : ", err)
    }
});

//DELETE the user
describe("DELETE user details", () =>{
    try{
        beforeAll(function (){
            console.log("To delete user : ", data.userId)
        });

        test("Delete request", async done =>{
            const response = await request.request.delete(`api/users/${data.userId}`) //invoke delete() of supertest
                                        .expect(204) 
            console.log("DELETE RESPONSE : ", response.body);
            done(); 
        });

        afterAll(function (){
            console.log("user is deleted!!")
            fs.unlinkSync('data.json'); //remove data.json after all tests are run
        });
    }

    catch(err){
        console.log("EXCEPTION : ", err);
    }
});
