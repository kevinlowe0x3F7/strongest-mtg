export const getRandomCard: (total: number, notThisOne?: number) => number = (
  total,
  notThisOne
) => {
  const randomId = Math.floor(Math.random() * total) + 1;

  if (randomId !== notThisOne) {
    return randomId;
  }

  return getRandomCard(total, notThisOne);
};

export const getOptionsForVote = (total: number) => {
  const firstId = getRandomCard(total);
  const secondId = getRandomCard(total, firstId);

  return { firstId, secondId };
};
