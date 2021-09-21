/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
const supertest = require("supertest");

describe("LivreController", function () {
  describe("getAllBooks", function () {
    it("should response status 200 with all books", function (done) {
      supertest(sails.hooks.http.app)
        .get("/books")
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("getAccessToken", function () {
    let user = {
      username: "nvh1999",
      password: "123",
    };
    it("should return the access token", function (done) {
      supertest(sails.hooks.http.app)
        .post("/auth")
        .send(user)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          sails.config.globals.accessToken = res.body.data.accessToken;
          done();
        });
    });
    it("should not return the access token with invalid username", function (done) {
      const cloneUser = _.cloneDeep(user);
      cloneUser.username = "aaa";
      supertest(sails.hooks.http.app)
        .post("/auth")
        .send(cloneUser)
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not return the access token with invalid password", function (done) {
      const cloneUser = _.cloneDeep(user);
      cloneUser.password = "1111";
      supertest(sails.hooks.http.app)
        .post("/auth")
        .send(cloneUser)
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("addBook", function () {
    let payload = {
      title: "Angular",
      numOfPages: 120,
      author: "NVH",
      isAvailable: true,
      chapters: [
        { title: "What's Angular?", page: 1 },
        { title: "Features", page: 50 },
        { title: "Model", page: 100 },
      ],
    };
    it("should create successful new book", function (done) {
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(payload)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          sails.config.globals.bookId = res.body.data.id;
          done();
        });
    });

    it("should not create a book without title", function (done) {
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({
          "x-access-token": sails.config.globals.accessToken,
        })
        .send(_.omit(payload, "title"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not create a book without number of pages", function (done) {
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(_.omit(payload, "numOfPages"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not create a book without author", function (done) {
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(_.omit(payload, "author"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not create a book without isAvailable", function (done) {
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(_.omit(payload, "isAvailable"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not create a book with title is not a string", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.title = 1;
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not create a book with numOfPages is not a number", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.numOfPages = "a";
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not create a book with author is not a string", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.author = 2;
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not create a book with isAvailable is not a boolean", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.isAvailable = "a";
      supertest(sails.hooks.http.app)
        .post("/books")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("getBook", function () {
    it("api should response status 200 with a book", function (done) {
      supertest(sails.hooks.http.app)
        .get("/books/" + sails.config.globals.bookId)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it("api should response status 400 with message: 'Invalid book'", function (done) {
      const id = "1";
      supertest(sails.hooks.http.app)
        .get("/books/" + id)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("getAllChapters", function () {
    it("should response status 200 with all chapters", function (done) {
      supertest(sails.hooks.http.app)
        .get("/books/" + sails.config.globals.bookId + "/chapters")
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("addChapter", function () {
    let payload = {
      title: "end",
      page: 190,
    };
    it("should create successful new chapter", function (done) {
      supertest(sails.hooks.http.app)
        .post("/books/" + sails.config.globals.bookId + "/chapters")
        .set({ "x-access-token": sails.config.globals.accessToken })
        .send(payload)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          sails.config.globals.number = res.body.data.number;
          done();
        });
    });
  });

  describe("updateChapter", function () {
    let payload = {
      title: "end",
      page: 195,
    };
    it("api should response status 200 with updated chapter", function (done) {
      supertest(sails.hooks.http.app)
        .put(
          "/books/" +
            sails.config.globals.bookId +
            "/chapters/" +
            sails.config.globals.number
        )
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(payload)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("api should response status 400 with invalid chapter", function (done) {
      const num = "a";
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId + "/chapters/" + num)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(payload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("deleteChapter", function () {
    it("should delete successful a chapter", function (done) {
      supertest(sails.hooks.http.app)
        .delete(
          "/books/" +
            sails.config.globals.bookId +
            "/chapters/" +
            sails.config.globals.number
        )
        .set({ "x-access-token": sails.config.globals.accessToken })

        .expect(204)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should response status 400 with message: 'Invalid chapter'", function (done) {
      const num = 0.1;
      supertest(sails.hooks.http.app)
        .delete("/books/" + sails.config.globals.bookId + "/chapters/" + num)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  describe("updateBook", function () {
    let payload = {
      title: "Sails",
      numOfPages: 1000,
      author: "NVH",
      isAvailable: true,
      chapters: [],
    };
    it("api should response status 200 with updated book", function (done) {
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(payload)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should response status 400 with message: 'Invalid book'", function (done) {
      const id = "1";
      supertest(sails.hooks.http.app)
        .put("/books/" + id)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(_.omit(payload, "title"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book without title", function (done) {
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(_.omit(payload, "title"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book without number of pages", function (done) {
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(_.omit(payload, "numOfPages"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book without author", function (done) {
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(_.omit(payload, "author"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book without isAvailable", function (done) {
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(_.omit(payload, "isAvailable"))
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book with title is not a string", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.title = 1;
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book with numOfPages is not a number", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.numOfPages = "a";
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book with author is not a string", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.author = 2;
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should not update a book with isAvailable is not a boolean", function (done) {
      const newPayload = _.cloneDeep(payload);
      newPayload.isAvailable = "a";
      supertest(sails.hooks.http.app)
        .put("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .send(newPayload)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("deleteBook", function () {
    it("should delete successful a book", function (done) {
      supertest(sails.hooks.http.app)
        .delete("/books/" + sails.config.globals.bookId)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .expect(204)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should response status 400 with message: 'Invalid book'", function (done) {
      const id = "1";
      supertest(sails.hooks.http.app)
        .delete("/books/" + id)
        .set({ "x-access-token": sails.config.globals.accessToken })

        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
