import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GameScreen = () => {
  const [cards, setCards] = useState([]); // State to store the game cards
  const [flippedCards, setFlippedCards] = useState([]); // State to track flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // State to store matched cards
  const [incorrectCards, setIncorrectCards] = useState([]); // Added state for incorrect cards

  const words = {
    // Object containing word pairs for the game
    door: "darvaajo",
    window: "bari",
    milk: "dood",
    spoon: "chumcho",
    hat: "topi",
    pan: "sufforio",
    clean: "saaf",
    old: "buddo",
  };

  useEffect(() => {
    initializeGame(); // Initialize the game when the component mounts
  }, []);

  const initializeGame = () => {
    // Function to initialize the game
    const initialCards = Object.keys(words)
      .flatMap((word) => [word, words[word]])
      .sort(() => 0.5 - Math.random()); // Shuffle and create initial cards
    setCards(initialCards); // Set the cards in the state
    setFlippedCards([]); // Reset flipped cards
    setMatchedCards([]); // Reset matched cards
    setIncorrectCards([]); // Reset incorrect cards
  };

  const flipCard = (index) => {
    // Function to flip a card
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      setFlippedCards([...flippedCards, index]); // Flip the card and update state
      checkMatch(index); // Check if the flipped cards match
    }
  };

  const checkMatch = (currentIndex) => {
    // Function to check if flipped cards match
    if (flippedCards.length === 1) {
      const flippedIndex = flippedCards[0];
      const flippedWord = cards[flippedIndex];
      const currentWord = cards[currentIndex];
      let flippedMeaning;
      let currentMeaning;

      if (
        Object.keys(words)[Object.values(words).indexOf(flippedWord)] ===
        undefined
      ) {
        flippedMeaning = flippedWord;
      } else {
        flippedMeaning =
          Object.keys(words)[Object.values(words).indexOf(flippedWord)];
      }
      if (
        Object.keys(words)[Object.values(words).indexOf(currentWord)] ===
        undefined
      ) {
        currentMeaning = currentWord;
      } else {
        currentMeaning =
          Object.keys(words)[Object.values(words).indexOf(currentWord)];
      }

      if (flippedMeaning === currentMeaning) {
        setMatchedCards([...matchedCards, flippedIndex, currentIndex]); // If cards match, update matched cards
        resetFlippedCards(); // Reset flipped cards
      } else {
        setIncorrectCards([flippedIndex, currentIndex]); // Set incorrect cards
        setTimeout(() => {
          resetFlippedCards();
          setIncorrectCards([]); // Reset incorrect cards after a delay
        }, 1000);
      }
    }
  };

  const resetFlippedCards = () => {
    // Function to reset flipped cards
    setFlippedCards([]);
  };

  const renderCard = (index) => {
    // Function to render individual cards
    const isFlipped = flippedCards.includes(index); // Check if the card is flipped
    const isMatched = matchedCards.includes(index); // Check if the card is matched
    const isIncorrect = incorrectCards.includes(index); // Check if the card is incorrect

    if (isMatched) {
      // Render matched card
      return (
        <View style={[styles.card, styles.cardMatched]}>
          <Text style={styles.cardText}>{cards[index]}</Text>
        </View>
      );
    }

    return (
      // Render unflipped or incorrect card with event handler
      <TouchableOpacity
        style={[
          styles.card,
          isFlipped ? styles.cardFlipped : null,
          isIncorrect ? styles.cardIncorrect : null,
        ]}
        onPress={() => flipCard(index)}
        disabled={isFlipped || isMatched}
      >
        <Text style={styles.cardText}>{cards[index]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Render the game board */}
      <View style={styles.cardsContainer}>
        {cards.map((_, index) => (
          <View key={index} style={styles.cardWrapper}>
            {renderCard(index)}
          </View>
        ))}
      </View>
      {/* Button to restart the game */}
      <TouchableOpacity style={styles.restartButton} onPress={initializeGame}>
        <Text style={styles.restartButtonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the game components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cardWrapper: {
    width: 80,
    height: 80,
    margin: 10,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#61dafb",
    borderRadius: 5,
  },
  cardFlipped: {
    backgroundColor: "#f1c40f",
  },
  cardMatched: {
    backgroundColor: "#2ecc71",
  },
  cardIncorrect: {
    backgroundColor: "red",
  },
  cardText: {
    fontSize: 18,
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#34495e",
    borderRadius: 5,
  },
  restartButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default GameScreen;
