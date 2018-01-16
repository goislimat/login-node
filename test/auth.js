process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const User = require("../models/User");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHttp);

describe("Auth Tests", () => {
  describe("unsuccessful attempts", () => {
    beforeEach(done => {
      User.remove({}, err => {
        done();
      });
    });

    describe("creating an user", () => {
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
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.user.should.be.false;
            res.body.info.message.should.equal(
              "E-mail/Password cant't be blank"
            );
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
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.user.should.be.false;
            res.body.info.message.should.equal(
              "E-mail/Password cant't be blank"
            );
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
            res.should.have.status(400);
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
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.user.should.be.false;
            res.body.info.message.should.equal(
              "Password should have at least 8 characters"
            );
            done();
          });
      });
    });

    describe("login in an user", () => {
      it("should reject login with an inexisting user", done => {
        const credentials = {
          email: "goislimat@gmail.com",
          password: "12345678"
        };

        chai
          .request(server)
          .post("/api/login")
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.user.should.be.false;
            res.body.info.message.should.equal(
              "Invalid email/password combination"
            );
            done();
          });
      });

      it("should reject empty email", done => {
        const credentials = {
          email: "",
          password: "12345678"
        };

        chai
          .request(server)
          .post("/api/login")
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.user.should.be.false;
            res.body.info.message.should.equal(
              "E-mail/Password cant't be blank"
            );
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
          .post("/api/login")
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            res.body.user.should.be.false;
            res.body.info.message.should.equal(
              "E-mail/Password cant't be blank"
            );
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
          .post("/api/login")
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(400);
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
          .post("/api/login")
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(400);
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

  describe("successful attempts", () => {
    describe("creating an user", () => {
      beforeEach(done => {
        User.remove({}, err => {
          done();
        });
      });

      it("should accept valid credentials", done => {
        const credentials = {
          email: "goislimat@gmail.com",
          password: "12345678"
        };

        chai
          .request(server)
          .post("/api/signup")
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.user.should.include({ email: credentials.email });
            done();
          });
      });
    });

    describe("loging in an user", () => {
      const credentials = {
        email: "goislimat@gmail.com",
        password: "12345678"
      };

      it("should login the created user", done => {
        chai
          .request(server)
          .post("/api/login")
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.user.should.include({ email: credentials.email });
            done();
          });
      });

      it("should have exactly 1 user in database", done => {
        User.find({}, (err, users) => {
          users.length.should.equal(1);
          done();
        });
      });
    });
  });
});
