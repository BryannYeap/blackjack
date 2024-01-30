import useGameState from "../hooks/useGameState";
import Card from "./Card";

function Deck() {
  const { deck } = useGameState();
  return (
    <div>
      <h2>Deck</h2>
      <Card isFaceDown={true} />
      <h3>{`No. of cards in deck: ${deck.length}`}</h3>
    </div>
  );
}

export default Deck;
