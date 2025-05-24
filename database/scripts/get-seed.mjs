/* eslint-disable no-undef */
export const GetSeeds = () => {
  if (!process.env.SEEDS) {
    return [];
  }
  return process.env.SEEDS.split(',').map((seed) => seed.trim());
};
