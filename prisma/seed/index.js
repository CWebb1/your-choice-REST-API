import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
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

  // Seed Races
  const races = await Promise.all([
    prisma.race.create({
      data: {
        name: "Human",
        desc: "Humans are the most adaptable and ambitious people among the common races.",
        playable: true,
        speed: 30,
        darkvision: false,
        size: "MEDIUM"
      }
    }),
    prisma.race.create({
      data: {
        name: "Elf",
        desc: "Elves are a magical people of otherworldly grace.",
        playable: true,
        speed: 30,
        darkvision: true,
        size: "MEDIUM"
      }
    }),
    // Add more races as needed
  ]);

  // Seed Classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        name: "Fighter",
        desc: "A master of martial combat, skilled with a variety of weapons and armor.",
        hitDie: 10,
        primaryAbility: "STRENGTH",
        savingThrows: ["STRENGTH", "CONSTITUTION"],
        spellcasting: false,
        subclasses: {
          create: [
            {
              name: "Champion",
              desc: "A master of martial combat and physical improvement."
            }
          ]
        }
      }
    }),
    prisma.class.create({
      data: {
        name: "Wizard",
        desc: "A scholarly magic-user capable of manipulating the structures of reality.",
        hitDie: 6,
        primaryAbility: "INTELLIGENCE",
        savingThrows: ["INTELLIGENCE", "WISDOM"],
        spellcasting: true,
        subclasses: {
          create: [
            {
              name: "School of Evocation",
              desc: "A specialist in spells that create powerful elemental effects."
            }
          ]
        }
      }
    }),
    // Add more classes as needed
  ]);

  // Seed Spells
  const spells = await Promise.all([
    prisma.spell.create({
      data: {
        name: "Fireball",
        desc: "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.",
        level: 3,
        school: "EVOCATION",
        castingTime: "1 action",
        range: "150 feet",
        components: ["V", "S", "M"],
        duration: "Instantaneous",
        concentration: false
      }
    }),
    // Add more spells as needed
  ]);

  // Seed Weapons
  const weapons = await Promise.all([
    prisma.weapon.create({
      data: {
        name: "Longsword",
        desc: "A versatile blade favored by knights and warriors.",
        type: "LONGSWORD",
        damage: "1d8",
        twohanded: false,
        versatile: true,
        architype: "MARTIAL"
      }
    }),
    // Add more weapons as needed
  ]);

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
