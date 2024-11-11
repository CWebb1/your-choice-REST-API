import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const expect = chai.expect;
chai.use(chaiHttp);

describe('Race API Tests', () => {
  let testRaceId;

  // Clean up database before tests
  before(async () => {
    await prisma.race.deleteMany();
  });

  // Test GET all races
  describe('GET /api/v1/races', () => {
    it('should get all races', async () => {
      const res = await chai.request(app).get('/api/v1/races');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('array');
    });
  });

  // Test POST race
  describe('POST /api/v1/races', () => {
    it('should create a new race with valid data', async () => {
      const raceData = {
        name: "Test Race",
        desc: "Test Description",
        playable: true,
        speed: 30,
        darkvision: false,
        size: "MEDIUM"
      };

      const res = await chai.request(app)
        .post('/api/v1/races')
        .send(raceData);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.equal(raceData.name);
      testRaceId = res.body.id;
    });

    it('should fail to create race without required fields', async () => {
      const res = await chai.request(app)
        .post('/api/v1/races')
        .send({});

      expect(res).to.have.status(400);
    });

    it('should fail to create race with invalid size', async () => {
      const raceData = {
        name: "Invalid Race",
        desc: "Test Description",
        size: "INVALID_SIZE"
      };

      const res = await chai.request(app)
        .post('/api/v1/races')
        .send(raceData);

      expect(res).to.have.status(400);
    });

    it('should fail to create race with invalid speed', async () => {
      const raceData = {
        name: "Invalid Race",
        desc: "Test Description",
        speed: 101
      };

      const res = await chai.request(app)
        .post('/api/v1/races')
        .send(raceData);

      expect(res).to.have.status(400);
    });
  });

  // Test GET one race
  describe('GET /api/v1/races/:id', () => {
    it('should get race by id', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/races/${testRaceId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(testRaceId);
    });

    it('should return 404 for non-existent race', async () => {
      const res = await chai.request(app)
        .get('/api/v1/races/12345678-1234-1234-1234-123456789012');

      expect(res).to.have.status(404);
    });
  });

  // Test PUT race
  describe('PUT /api/v1/races/:id', () => {
    it('should update race with valid data', async () => {
      const updateData = {
        name: "Updated Race",
        desc: "Updated Description",
        speed: 25
      };

      const res = await chai.request(app)
        .put(`/api/v1/races/${testRaceId}`)
        .send(updateData);

      expect(res).to.have.status(200);
      expect(res.body.name).to.equal(updateData.name);
    });

    it('should fail to update with invalid speed', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/races/${testRaceId}`)
        .send({ speed: -5 });

      expect(res).to.have.status(400);
    });

    it('should fail to update with invalid size', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/races/${testRaceId}`)
        .send({ size: "WRONG_SIZE" });

      expect(res).to.have.status(400);
    });

    it('should return 404 for updating non-existent race', async () => {
      const res = await chai.request(app)
        .put('/api/v1/races/12345678-1234-1234-1234-123456789012')
        .send({ name: "Test" });

      expect(res).to.have.status(404);
    });
  });

  // Test DELETE race
  describe('DELETE /api/v1/races/:id', () => {
    it('should delete existing race', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/races/${testRaceId}`);

      expect(res).to.have.status(200);
    });

    it('should return 404 for deleting non-existent race', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/races/12345678-1234-1234-1234-123456789012');

      expect(res).to.have.status(404);
    });
  });

  // Test non-existent route
  describe('Non-existent Route', () => {
    it('should return 404 for non-existent route', async () => {
      const res = await chai.request(app)
        .get('/api/v1/nonexistent');

      expect(res).to.have.status(404);
    });
  });
});
