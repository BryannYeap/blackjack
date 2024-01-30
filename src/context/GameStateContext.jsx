import { createContext, useMemo, useState } from "react";
import { GET_SHUFFLED_DECK } from "../utils/constants";

export const GameStateContext = createContext({});

// eslint-disable-next-line react/prop-types
const GameStateContextProvider = ({ children }) => {
  const [isRoundStarted, setIsRoundStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [deck, setDeck] = useState(GET_SHUFFLED_DECK());

  const handleStartRound = () => {
    setIsRoundStarted(true);
    setIsDisabled(true);
    handlePlayerHit();
    setTimeout(() => handleDealerHit(), 1000);
    setTimeout(() => handlePlayerHit(), 2000);
    setTimeout(() => {
      handleDealerHit(true);
      setIsDisabled(false);
    }, 3000);
  };

  const handleDealerWins = (points) => {
    setDealerPoints(dealerPoints + points);
  };

  const handlePlayerWins = (points) => {
    setPlayerPoints(playerPoints + points);
  };

  const handlePlayerHit = () => {
    setDeck((prevDeck) => {
      const newCard = prevDeck[0];
      setPlayerCards((prev) => [...prev, newCard]);
      return [...prevDeck.slice(1)];
    });
  };

  const handleDealerHit = (isFaceDown) => {
    setDeck((prevDeck) => {
      const newCard = prevDeck[0];
      setDealerCards((prev) => [...prev, { ...newCard, isFaceDown }]);
      return [...prevDeck.slice(1)];
    });
  };

  const value = useMemo(
    () => ({
      isRoundStarted,
      isDisabled,
      deck,
      dealerCards,
      playerCards,
      dealerPoints,
      playerPoints,
      handleStartRound,
      handleDealerWins,
      handlePlayerWins,
      handlePlayerHit,
      handleDealerHit,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deck, dealerCards, playerCards, dealerPoints, playerPoints]
  );

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
