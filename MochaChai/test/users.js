import { expect } from "chai";
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/");
const chai=require('chai');


const TOKEN="cccfd4d59f22f9beb54f22b884fa26e77c1f9856080a086fe69289ea9695262d";

describe("Users",()=>{
it("GET /users",(done)=>{
    request
    .get(`users?access-token=${TOKEN}`)
    .end((err,res)=>{
       expect(res.body).to.not.be.empty;
       done();
    })
//    return request
//     .get(`users?access-token=${TOKEN}`)
//     .then((res)=>{
//        expect(res.body).to.not.be.empty;
//     })
}) 
it("GET /users/:id",()=>{
    return request.get(`users/5674478?access-token=${TOKEN}`).then((res)=>{
        // console.log(res.body);
        expect(res.body.id).to.be.eq(5674478);
    })
});

it("GET /users with querry params", ()=>{
    const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
    return request.get(url).then((res)=>{
    res.body.forEach(data => {
        expect(data.gender).to.eq("female");
        expect(data.status).to.eq("active");


    });
    })
});

it("POST/users",()=>{
    const data={
        email:`test-email${Math.floor(Math.random()*9999)}@email.com`,
        name:`Test name${Math.floor(Math.random()*99)}`,
        gender:"male",
        status:"Inactive"
    }
    return request.post('users')
    .set("Authorization",`Bearer ${TOKEN}`)
    .send(data)
    .then((err,res)=>{
    console.log(res);

    })
})

})