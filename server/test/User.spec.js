let User = require('../models/Users');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
    let userData = {
        login: "123456",
        password: "123456",
        firstName: "firstName",
        lastName: "lastName",
        middleName: "middleName"
    };


    it(' /api/user sing up user and get users data use JWT', (done) => {
        User.findOneAndDelete({login: userData.login}, () => {

            chai.request(server)
                .post('/api/user')
                .send(userData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    res.body.should.have.property("success");
                    res.body.should.have.property("success").be.a("boolean");
                    res.body.should.have.property("success").eql(true);

                    res.body.should.have.property("token");
                    res.body.should.have.property("token").be.a("string");
                    res.body.should.have.property("token").contain("Bearer");


                    chai.request(server)
                        .get("/api/user")
                        .set("Authorization", res.body.token)
                        .end(((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object");

                            res.body.should.have.property("login");
                            res.body.should.have.property("login").be.a("string");

                            res.body.should.have.property("login").eql(userData.login);

                            res.body.should.have.property("firstName");
                            res.body.should.have.property("firstName").be.a("string");
                            res.body.should.have.property("firstName").eql(userData.firstName);

                            res.body.should.have.property("lastName");
                            res.body.should.have.property("lastName").be.a("string");
                            res.body.should.have.property("lastName").eql(userData.lastName);

                            res.body.should.have.property("middleName");
                            res.body.should.have.property("middleName").be.a("string");
                            res.body.should.have.property("middleName").eql(userData.middleName);
                            done();
                        }))
                })
        });
    });

    it('/api/user log in', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                login: userData.login,
                password: userData.password
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                res.body.should.have.property("success");
                res.body.should.have.property("success").be.a("boolean");
                res.body.should.have.property("success").eql(true);

                res.body.should.have.property("token");
                res.body.should.have.property("token").be.a("string");
                res.body.should.have.property("token").contain("Bearer");


                chai.request(server)
                    .get("/api/user")
                    .set("Authorization", res.body.token)
                    .end(((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");

                        res.body.should.have.property("login");
                        res.body.should.have.property("login").be.a("string");
                        res.body.should.have.property("login").eql(userData.login);

                        res.body.should.have.property("firstName");
                        res.body.should.have.property("firstName").be.a("string");
                        res.body.should.have.property("firstName").eql(userData.firstName);

                        res.body.should.have.property("lastName");
                        res.body.should.have.property("lastName").be.a("string");
                        res.body.should.have.property("lastName").eql(userData.lastName);

                        res.body.should.have.property("middleName");
                        res.body.should.have.property("middleName").be.a("string");
                        res.body.should.have.property("middleName").eql(userData.middleName);
                        done();
                    }))
            })
    });

});
