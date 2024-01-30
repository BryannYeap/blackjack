import { shuffleArray } from "./array";

export const SUITS = {
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
  SPADES: "spades",
  CLUBS: "clubs",
};

export const VALUES = {
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  TEN: "10",
  JACK: "J",
  QUEEN: "Q",
  KING: "K",
  ACE: "A",
};

export const GET_SHUFFLED_DECK = () => {
  const suits = Object.values(SUITS);
  const values = Object.values(VALUES);
  const deck = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value });
    });
  });

  shuffleArray(deck);

  return deck;
};
