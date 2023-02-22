import type { Prisma} from ".prisma/client";
import { PrismaClient } from ".prisma/client";
import * as Scry from "scryfall-sdk";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE Card`;

  const cardsEmitter = Scry.Cards.search("r>=r f:modern lang:english")
  const allCards = await cardsEmitter.waitForAll();

  await prisma.card.createMany({
    data: allCards.map(card => {
      if (card.image_uris?.art_crop == null || card.image_uris?.normal == null) {
        return undefined;
      }
      return {
        card_id: card.oracle_id,
        name: card.name,
        art_image_url: card.image_uris.art_crop,
        image_url: card.image_uris.normal,
      };
    }).filter((cardModel): cardModel is Prisma.CardCreateInput => cardModel != null),
  })
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
