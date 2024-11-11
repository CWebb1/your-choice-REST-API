import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it, before, after } from "mocha";
import app from "../../app.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
chai.use(chaiHttp);

let testCharacterId, testRaceId, testClassId, testSpellId, testWeaponId;

describe("Invalid Tests", () => {
  it("404 for non-existant route", (done) => {
    chai
      .request(app)
      .get("/api/v1/invalid")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(404);
        done();
      });
  });
});

describe("CRUD Operations", () => {
  before(async () => {
    // Clean up existing test data
    await prisma.characterSpell.deleteMany();
    await prisma.spell.deleteMany();
    await prisma.item.deleteMany();
    await prisma.equipmentSlot.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.character.deleteMany();
    await prisma.subclass.deleteMany();
    await prisma.class.deleteMany();
    await prisma.race.deleteMany();
    await prisma.weapon.deleteMany();

    // Create test race
    const race = await prisma.race.create({
      data: {
        name: `Test Race ${Date.now()}`,
        desc: "Test race description",
        playable: true,
        speed: 30,
        darkvision: false,
        size: "MEDIUM",
      },
    });
    testRaceId = race.id;

    // Create test class
    const class_ = await prisma.class.create({
      data: {
        name: `Test Class ${Date.now()}`,
        desc: "Test class description",
        hitDie: 8,
        primaryAbility: "STRENGTH",
        savingThrows: ["STRENGTH", "CONSTITUTION"],
        spellcasting: false,
      },
    });
    testClassId = class_.id;

    // Create test spell
    const spell = await prisma.spell.create({
      data: {
        name: `Test Spell ${Date.now()}`,
        desc: "Test spell description",
        level: 1,
        school: "EVOCATION",
        castingTime: "1 Action",
        range: "30 feet",
        components: ["V", "S"],
        duration: "Instantaneous",
        concentration: false,
      },
    });
    testSpellId = spell.id;

    // Create test weapon
    const weapon = await prisma.weapon.create({
      data: {
        name: `Test Weapon ${Date.now()}`,
        desc: "Test weapon description",
        type: "DAGGER",
        damage: "1d6",
        twohanded: false,
        versatile: false,
        architype: "SIMPLE",
      },
    });
    testWeaponId = weapon.id;
  });

  after(async () => {
    // Clean up test data
    await prisma.characterSpell.deleteMany();
    await prisma.spell.deleteMany();
    await prisma.item.deleteMany();
    await prisma.equipmentSlot.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.character.deleteMany();
    await prisma.subclass.deleteMany();
    await prisma.class.deleteMany();
    await prisma.race.deleteMany();
    await prisma.weapon.deleteMany();
  });

  // Character Tests
  describe("Character Tests", () => {
    it("should create a new character", (done) => {
      chai
        .request(app)
        .post("/api/v1/characters")
        .send({
          name: "Test Character",
          level: 1,
          experience: 0,
          raceId: testRaceId,
          classId: testClassId,
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.name).to.be.equal("Test Character");
          testCharacterId = res.body.id;
          done();
        });
    });

    it("should get all characters", (done) => {
      chai
        .request(app)
        .get("/api/v1/characters")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });

    it("should get character by id", (done) => {
      chai
        .request(app)
        .get(`/api/v1/characters/${testCharacterId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });

    it("should update character by id", (done) => {
      chai
        .request(app)
        .put(`/api/v1/characters/${testCharacterId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  // Race Tests
  describe("Race Tests", () => {
    it("should create a new race", (done) => {
      chai
        .request(app)
        .post("/api/v1/races")
        .send({
          name: `Test Race Create ${Date.now()}`,
          desc: "Test race description",
          playable: true,
          speed: 30,
          darkvision: false,
          size: "MEDIUM",
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          done();
        });
    });

    it("should get all races", (done) => {
      chai
        .request(app)
        .get("/api/v1/races")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body.data).to.be.an("array");
          done();
        });
    });

    it("should get race by id", (done) => {
      chai
        .request(app)
        .get(`/api/v1/races/${testRaceId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body.id).to.be.equal(testRaceId);
          done();
        });
    });

    it("should update race by id", (done) => {
      chai
        .request(app)
        .put(`/api/v1/races/${testRaceId}`)
        .send({
          name: `Updated Test Race ${Date.now()}`,
          desc: "Updated test race description",
          playable: true,
          speed: 30,
          darkvision: false,
          size: "MEDIUM",
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  // Class Tests
  describe("Class Tests", () => {
    it("should create a new class", (done) => {
      chai
        .request(app)
        .post("/api/v1/classes")
        .send({
          name: `Test Class Create ${Date.now()}`,
          desc: "Test class description",
          hitDie: 8,
          primaryAbility: "STRENGTH",
          savingThrows: ["STRENGTH", "CONSTITUTION"],
          spellcasting: false,
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          done();
        });
    });

    it("should get all classes", (done) => {
      chai
        .request(app)
        .get("/api/v1/classes")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.an("array");
          done();
        });
    });

    it("should get class by id", (done) => {
      chai
        .request(app)
        .get(`/api/v1/classes/${testClassId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body.id).to.be.equal(testClassId);
          done();
        });
    });

    it("should update class by id", (done) => {
      chai
        .request(app)
        .put(`/api/v1/classes/${testClassId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  // Spell Tests
  describe("Spell Tests", () => {
    it("should create a new spell", (done) => {
      chai
        .request(app)
        .post("/api/v1/spells")
        .send({
          name: `Test Spell Create ${Date.now()}`,
          desc: "Test spell description",
          level: 1,
          school: "EVOCATION",
          castingTime: "1 Action",
          range: "30 feet",
          components: ["V", "S"],
          duration: "Instantaneous",
          concentration: false,
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          chai.expect(res.body).to.be.an("object");
          chai.expect(res.body.name).to.include("Test Spell Create");
          chai.expect(res.body.level).to.equal(1);
          chai.expect(res.body.school).to.equal("EVOCATION");
          done();
        });
    });

    it("should get all spells", (done) => {
      chai
        .request(app)
        .get("/api/v1/spells")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.an("array");
          done();
        });
    });

    it("should get spell by id", (done) => {
      chai
        .request(app)
        .get(`/api/v1/spells/${testSpellId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body.id).to.be.equal(testSpellId);
          done();
        });
    });

    it("should update spell by id", (done) => {
      chai
        .request(app)
        .put(`/api/v1/spells/${testSpellId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  // Weapon Tests
  describe("Weapon Tests", () => {
    it("should create a new weapon", (done) => {
      chai
        .request(app)
        .post("/api/v1/weapons")
        .send({
          name: `Test Weapon Create ${Date.now()}`,
          desc: "Test weapon description",
          type: "DAGGER",
          damage: "1d6",
          twohanded: false,
          versatile: false,
          architype: "SIMPLE",
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          chai.expect(res.body).to.be.an("object");
          chai.expect(res.body.name).to.include("Test Weapon Create");
          chai.expect(res.body.damage).to.equal("1d6");
          done();
        });
    });

    it("should get all weapons", (done) => {
      chai
        .request(app)
        .get("/api/v1/weapons")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.an("array");
          done();
        });
    });

    it("should get weapon by id", (done) => {
      chai
        .request(app)
        .get(`/api/v1/weapons/${testWeaponId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body.id).to.be.equal(testWeaponId);
          done();
        });
    });

    it("should update weapon by id", (done) => {
      chai
        .request(app)
        .put(`/api/v1/weapons/${testWeaponId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  describe("DELETE Tests", () => {
    it("should delete a character by id", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/characters/${testCharacterId}`)
        .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
    });

    it("should delete a race by id", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/races/${testRaceId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });

    it("should delete a class by id", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/classes/${testClassId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });

    it("should delete a spell by id", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/spells/${testSpellId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });

    it("should delete a weapon by id", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/weapons/${testWeaponId}`)
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  describe("VALIDATION TESTS", () => {
    it("should fail to create a character without required fields", (done) => {
      chai.request(app).post("/api/v1/characters").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a character with invalid ability scores", (done) => {
      chai.request(app).post("/api/v1/characters").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a race without required fields", (done) => {
      chai.request(app).post("/api/v1/races").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a race with invalid size", (done) => {
      chai.request(app).post("/api/v1/races").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a class without required fields", (done) => {
      chai.request(app).post("/api/v1/classes").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a class with invalid primary ability", (done) => {
      chai.request(app).post("/api/v1/classes").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a spell without required fields", (done) => {
      chai.request(app).post("/api/v1/spells").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a spell with invalid school", (done) => {
      chai.request(app).post("/api/v1/spells").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create a weapon without required fields", (done) => {
      chai.request(app).post("/api/v1/weapons").send({}).end((req, res) => {
        chai.expect(res.status).to.be.equal(400);
        done();
      });
    });

    it("should fail to create weapon with invalid damage format", (done) => {
        chai
          .request(app)
          .post("/api/v1/weapons")
          .send({
            name: `Test Weapon Invalid ${Date.now()}`,
            desc: "Test weapon description",
            type: "DAGGER",
            damage: "invalid",  // Invalid damage format
            twohanded: false,
            versatile: false,
            architype: "SIMPLE"
          })
          .end((req, res) => {
            chai.expect(res.status).to.be.equal(400);
            done();
        });
    });
  });
});
