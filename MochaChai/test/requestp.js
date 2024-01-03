const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const { expect } = chai;
var id;
chai.use(chaiHttp);

describe("resource",()=>{

    it("GET /resource",(done)=>{
        chai.request("https://reqres.in/api")
        .get("/users")
        .query({
            page:1,
            per_page: 5
        })
        .set("content-type","application/json")
        .end((err,res)=>{
            console.log("---------------------");
            // console.log(res.body);
            console.log("---------------------");
            done();
        })
    });

    it("POST /register user",(done)=>{
        const data={
            username: "Test2",
            email: "Tes2t@gmail.com",
            password: "string2123"  
        }
        chai.request("https://reqres.in/api")
        .post("register")
        .set("content-type","application/json")
        .send(data)
        .end((err,res)=>{
            console.log(res.status,err);
            done();
        })
    })

    it("POST /Create user",(done)=>{
        const data={
            name:`Allasani${Math.floor(Math.random()*9)} Peddana`, 
            email:`allasani21.peddana@${Math.floor(Math.random()*999)}ce.com`,
            gender:"male",
            status:"active"
        }
        chai.request("https://gorest.co.in/public/v2/")
        .post("users")
        .set("Authorization","Bearer f26d728a884a58204ba3033d5e1b17ec0fd60c3bc9adf09628c8e3503741f1ad")
        .set("Content-Type","application/json")
        .send(data)
        .end((err,res)=>{
            console.log("---------------------");
            // console.log(res.body);
            id=res.body.id;
            console.log("---------------------",id);
            expect(res.body).to.deep.include(data);
            done();
        })
    });

   it("PUT /users/:id",(done)=>{
    const data={
        name:`zoro${Math.floor(Math.random()*9)}`, 
        email:`roronova.zoro@${Math.floor(Math.random()*999)}ce.com`,
        gender:"male",
        status:"active"
    }
    
    chai.request("https://gorest.co.in/public/v2/")
    .put(`users/${id}`)
    .set("Authorization","Bearer f26d728a884a58204ba3033d5e1b17ec0fd60c3bc9adf09628c8e3503741f1ad")
    .set("Content-Type","application/json")
    .send(data)
    .end((err,res)=>{
        id=res.body.id;
        console.log("-------****--------");
        // console.log(res.body);
        console.log("-------****--------",id);
        expect(res.body).to.deep.include(data);
        done();
    })
   });

   it("DELETE /users/:id", (done)=>{
    const data={};
    chai.request("https://gorest.co.in/public/v2/")
    .delete(`users/${id}`)
    .set("Authorization","Bearer f26d728a884a58204ba3033d5e1b17ec0fd60c3bc9adf09628c8e3503741f1ad")
    .end((err,res)=>{
        console.log(res.statusCode);
        expect(res.statusCode).to.be.eq(204)
        done();
    })
   })

})