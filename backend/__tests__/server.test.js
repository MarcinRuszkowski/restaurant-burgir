import request from "supertest";
import app from "../server.js";



describe("GET /api/server", () => {
  it("should return 200 and message ready", async () => {
    const res = await request(app).get("/api/server");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Server ready" });
  });
});
