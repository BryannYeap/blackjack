# BLACKJACK

A simple game of Blackjack written in React

## Rules

- A loss results in a subtraction of **10 points**
- A win results in an addition of **15 points** for a Blackjack (21 with just 2 cards), or **10 points** for a normal win
- A draw results in no addition or subtraction of points
- Every round that isn't a draw will result in one player winning and one player losing points

### How to lose

- If the player's hand is greater than 21, the player loses instantly
- If the dealer's hand is greater than the player's hand without busting (going above 21), the player loses

### How to win

- If the player's initial draw is a Blackjack (21 with just 2 cards), and the dealer's initial draw is not a Blackjack, the player wins instantly
  - If both the player and the dealer's initial draw is a Blackjack, the round is a draw
- If the player's hand is greater than the dealer's hand without busting (going above 21), the player wins

### How to draw

- If the player's hand is equal to the dealer's hand, the round is a draw

### Misc

- Aces count as 1 or 11, whichever is more beneficial to the player
- When the deck has less than 15 cards remaining, the discarded cards are shuffled and added back into the deck
- The player is not allowed to draw more cards if their hand already adds up to 21 (or more)
