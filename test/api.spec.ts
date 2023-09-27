import request from "supertest"

import app from "../src/app"

describe("GET /", () => {
  it("should return 200 OK", () => {
    return request(app).get("/").expect(200)
  })
})

describe("GET /api", () => {
  it("should return 404 NOT FOUND", () => {
    return request(app).get("/api").expect(404)
  })
})
