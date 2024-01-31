import { createContext, useEffect, useMemo, useState } from "react";
import { GET_SHUFFLED_DECK, VALUES } from "../utils/constants";

export const GameStateContext = createContext({});

// eslint-disable-next-line react/prop-types
const GameStateContextProvider = ({ children }) => {
  const [isRoundStarted, setIsRoundStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDealersTurn, setisDealersTurn] = useState(false);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [deck, setDeck] = useState(GET_SHUFFLED_DECK());
  const [playerHandValue, setPlayerHandValue] = useState(0);
  const [dealerhandValue, setDealerhandValue] = useState(0);

  // Updates Hand Values
  useEffect(() => {
    const calculateHandValue = (cards) => {
      let handValue = 0;
      let hasAce = false;

      cards.forEach((card) => {
        const { value } = card;

        switch (value) {
          case VALUES.JACK:
          case VALUES.QUEEN:
          case VALUES.KING:
            handValue += 10;
            break;
          case "A":
            hasAce = true;
            handValue += 11;
            break;
          default:
            handValue += parseInt(value, 10);
            break;
        }
      });

      if (hasAce && handValue > 21) {
        handValue -= 10;
      }

      return handValue;
    };

    setPlayerHandValue(calculateHandValue(playerCards));
    setDealerhandValue(calculateHandValue(dealerCards));

    if (isRoundStarted && playerHandValue > 21) {
      handleDealersTurn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCards, dealerCards, playerHandValue, isRoundStarted]);

  // Handles Dealer's Turn
  useEffect(() => {
    if (isRoundStarted && isDealersTurn) {
      if (playerHandValue > 21 || dealerhandValue >= 17) {
        handleEndRound();
      } else if (dealerhandValue < 17) {
        setTimeout(() => {
          handleDealerHit(false);
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDealersTurn, dealerhandValue, isRoundStarted]);

  const handleStartRound = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerHandValue(0);
    setDealerhandValue(0);
    setIsRoundStarted(true);
    setIsDisabled(true);
    setisDealersTurn(false);

    // Initial Deal
    handlePlayerHit();
    setTimeout(() => handleDealerHit(false), 1000);
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

  const handleDealersTurn = () => {
    setIsDisabled(true);
    setisDealersTurn(true);

    setDealerCards((prev) => [
      ...prev.map((card) => ({ ...card, isFaceDown: false })),
    ]);
  };

  const handleEndRound = () => {
    setIsRoundStarted(false);
    setIsDisabled(false);

    if (playerHandValue > 21) {
      // Player Busts
      handleDealerWins(10);
    } else {
      if (dealerhandValue == playerHandValue) {
        // PUSH: DO NOTHING
      } else if (dealerhandValue > 21 || playerHandValue > dealerhandValue) {
        // Dealer Loses
        if (playerHandValue === 21 && playerCards.length === 2) {
          handlePlayerWins(15);
        } else {
          handlePlayerWins(10);
        }
      } else {
        // Dealer Wins
        if (dealerhandValue === 21 && dealerCards.length === 2) {
          handleDealerWins(15);
        } else {
          handleDealerWins(10);
        }
      }
    }
  };

  const value = useMemo(
    () => ({
      isRoundStarted,
      isDisabled,
      isDealersTurn,
      deck,
      dealerCards,
      playerCards,
      dealerPoints,
      playerPoints,
      playerHandValue,
      dealerhandValue,
      handleStartRound,
      handlePlayerHit,
      handleDealerHit,
      handleDealersTurn,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      deck,
      dealerCards,
      playerCards,
      dealerPoints,
      playerPoints,
      playerHandValue,
      dealerhandValue,
    ]
  );

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
