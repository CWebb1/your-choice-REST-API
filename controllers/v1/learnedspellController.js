import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const getCharacterSpells = async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const learnedSpells = await prisma.characterSpell.findMany({
      where: {
        characterId: characterId
      },
      include: {
        spell: true
      }
    });

    res.status(200).json(learnedSpells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const learnSpell = async (req, res) => {
  try {
    const { characterId, spellId } = req.body;

    // Check if character already knows this spell
    const existingSpell = await prisma.characterSpell.findFirst({
      where: {
        characterId: characterId,
        spellId: spellId
      }
    });

    if (existingSpell) {
      return res.status(400).json({ error: 'Character already knows this spell' });
    }

    // Verify character and spell exist before creating relationship
    const [character, spell] = await Promise.all([
      prisma.character.findUnique({ where: { id: characterId } }),
      prisma.spell.findUnique({ where: { id: spellId } })
    ]);

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    if (!spell) {
      return res.status(404).json({ error: 'Spell not found' });
    }

    const characterSpell = await prisma.characterSpell.create({
      data: {
        characterId: characterId,
        spellId: spellId
      },
      include: {
        spell: true,
        character: true
      }
    });

    res.status(201).json(characterSpell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgetSpell = async (req, res) => {
  try {
    const { characterId, spellId } = req.params;

    const characterSpell = await prisma.characterSpell.findFirst({
      where: {
        characterId: characterId,
        spellId: spellId
      }
    });

    if (!characterSpell) {
      return res.status(404).json({ error: 'Character has not learned this spell' });
    }

    await prisma.characterSpell.delete({
      where: {
        id: characterSpell.id
      }
    });

    res.status(200).json({ message: 'Spell forgotten successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSpellsByCharacter = async (req, res) => {
  try {
    const { characterId } = req.params;
    
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        learnedSpells: {
          include: {
            spell: true
          }
        }
      }
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.status(200).json(character.learnedSpells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getCharacterSpells,
  learnSpell,
  forgetSpell,
  getSpellsByCharacter
};