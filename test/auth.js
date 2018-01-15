process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const User = require("../models/User");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHttp);

describe("Auth", () => {
  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });

  describe("POST to login an inexiting user", () => {
    it("should try to login", done => {
      const credentials = {
        email: "goislimat@gmail.com",
        password: "12345678"
      };

      chai
        .request(server)
        .post("/api/login")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.user.should.be.false;
          res.body.info.message.should.equal(
            "Invalid email/password combination"
          );
          done();
        });
    });
  });

  describe("Create an User", () => {
    it("should reject empty email", done => {
      const credentials = {
        email: "",
        password: "12345678"
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.user.should.be.false;
          res.body.info.message.should.equal("E-mail/Password cant't be blank");
          done();
        });
    });

    it("should reject empty password", done => {
      const credentials = {
        email: "goislimat@gmail.com",
        password: ""
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.user.should.be.false;
          res.body.info.message.should.equal("E-mail/Password cant't be blank");
          done();
        });
    });

    it("should reject invalid email", done => {
      const credentials = {
        email: "goislimat",
        password: "12345678"
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.user.should.be.false;
          res.body.info.message.should.equal("This is not a valid e-mail");
          done();
        });
    });

    it("should reject password with less than 8 characters", done => {
      const credentials = {
        email: "goislimat@gmail.com",
        password: "1234567"
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.user.should.be.false;
          res.body.info.message.should.equal(
            "Password should have at least 8 characters"
          );
          done();
        });
    });
  });
});
