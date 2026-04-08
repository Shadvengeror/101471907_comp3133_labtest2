export interface Character {
  id: string;
  name: string;
  species: string;
  house: string;
  wizard: boolean;
  ancestry: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  actor: string;
  image: string;
}