import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

async function main() {
  const card1 = await prisma.card.upsert({
    where: {
      int_id: 1
    },
    update: {},
    create: {
      card_id: "4ecde8d1-e4ec-4bd9-8a80-49885b032557",
      name: "The Royal Scions",
      image_url: "https://cards.scryfall.io/normal/front/6/a/6a7111f3-01a6-4311-bc08-036a1fba60f5.jpg?1572490808",
    }
  });

  const card2 = await prisma.card.upsert({
    where: {
      int_id: 2
    },
    update: {},
    create: {
      card_id: "b8b51a29-a2be-4b97-a73c-ea512d3d5622",
      name: "Norin the Wary",
      image_url: "https://cards.scryfall.io/normal/front/f/6/f61ea59a-1db0-4e6b-bcde-19787c76a49b.jpg?1562946915",
    }
  });

  const card3 = await prisma.card.upsert({
    where: {
      int_id: 3
    },
    update: {},
    create: {
      card_id: "a6f38908-aa4f-4f99-a28e-85d11dab52e4",
      name: "Ruinous Ultimatum",
      image_url: "https://cards.scryfall.io/normal/front/5/0/50c1d6ca-7789-46b5-bc89-85cc3915cb85.jpg?1591228208",
    }
  });

  console.log("added cards", card1, card2, card3);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
