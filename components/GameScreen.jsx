import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameScreen = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
  
    const words = {
      door: 'darvaajo',
      window: 'bari',
      milk: 'dood',
      spoon: 'chumcho',
      hat: 'topi',
      pan: 'sufforio',
      clean: 'saaf',
      old: 'buddo',
    };
  
    useEffect(() => {
      initializeGame();
    }, []);
  
    const initializeGame = () => {
      const initialCards = Object.keys(words)
        .flatMap((word) => [word, words[word]])
        .sort(() => 0.5 - Math.random());
      setCards(initialCards);
      setFlippedCards([]);
      setMatchedCards([]);
    };
  
    const flipCard = (index) => {
      if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
        setFlippedCards([...flippedCards, index]);
        checkMatch(index);
      }
    };
  
    const checkMatch = (currentIndex) => {
      if (flippedCards.length === 1) {
        const flippedIndex = flippedCards[0];
        const flippedWord = cards[flippedIndex];
        const currentWord = cards[currentIndex];
        let flippedMeaning
        let currentMeaning

        if (Object.keys(words)[Object.values(words).indexOf(flippedWord)] === undefined){
            flippedMeaning = flippedWord
        }else {
            flippedMeaning = Object.keys(words)[Object.values(words).indexOf(flippedWord)]
        }
        if (Object.keys(words)[Object.values(words).indexOf(currentWord)] === undefined){
            currentMeaning = currentWord
        }else {
            currentMeaning = Object.keys(words)[Object.values(words).indexOf(currentWord)]
        }

        if (flippedMeaning === currentMeaning) {
          setMatchedCards([...matchedCards, flippedIndex, currentIndex]);
          resetFlippedCards();
        } else {
          setTimeout(() => {
            resetFlippedCards();
          }, 1000);
        }
      }
    };
  
    const resetFlippedCards = () => {
      setFlippedCards([]);
    };
  
    const renderCard = (index) => {
      const isFlipped = flippedCards.includes(index);
      const isMatched = matchedCards.includes(index);
  
      if (isMatched) {
        return (
          <View style={[styles.card, styles.cardMatched]}>
            <Text style={styles.cardText}>{cards[index]}</Text>
          </View>
        );
      }
  
      return (
        <TouchableOpacity
          style={[styles.card, isFlipped ? styles.cardFlipped : null]}
          onPress={() => flipCard(index)}
          disabled={isFlipped || isMatched}
        >
          <Text style={styles.cardText}>{cards[index]}</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {cards.map((_, index) => (
            <View key={index} style={styles.cardWrapper}>
              {renderCard(index)}
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={initializeGame}>
          <Text style={styles.restartButtonText}>Restart Game</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    cardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    cardWrapper: {
      width: 80,
      height: 80,
      margin: 10,
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#61dafb',
      borderRadius: 5,
    },
    cardFlipped: {
      backgroundColor: '#f1c40f',
    },
    cardMatched: {
      backgroundColor: '#2ecc71',
    },
    cardText: {
      fontSize: 18,
    },
    restartButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#34495e',
      borderRadius: 5,
    },
    restartButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });

export default GameScreen;