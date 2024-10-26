import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getLatestGames } from "C:/Users/laelm/OneDrive/Escritorio/Expo/TestBlanco/metacritic.js";

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  const handleOutsideClick = () => {
    setSelectedGame(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.slug}
              style={[styles.gameContainer, selectedGame === game.slug && styles.selectedGameContainer]}
              onPress={(e) => {
                e.stopPropagation();
                setSelectedGame(selectedGame === game.slug ? null : game.slug);
              }}
            >
              <Image style={styles.image} source={{ uri: game.image }} />
              <Text style={styles.title}>{game.title}</Text>
              {selectedGame === game.slug && (
                <Text style={styles.description}>
                   {game.description}.
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  gameContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedGameContainer: {
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
