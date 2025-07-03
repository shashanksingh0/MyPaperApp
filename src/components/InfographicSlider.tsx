import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const cardData = [
  {
    id: '1',
    title: 'Infographic 1',
    image: 'https://cdn.pixabay.com/photo/2020/04/16/06/09/infographic-5041331_1280.png',
  },
  {
    id: '2',
    title: 'Infographic 2',
    image: 'https://cdn.pixabay.com/photo/2017/01/31/21/22/infographic-2028566_1280.png',
  },
  {
    id: '3',
    title: 'Infographic 3',
    image: 'https://cdn.pixabay.com/photo/2017/01/31/21/22/infographic-2028570_1280.png',
  },
];

const InfographicSlider = () => {
  const theme = useTheme();

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={styles.title}>Infographics</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {cardData.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Cover source={{ uri: item.image }} style={styles.image} />
            <Card.Title title={item.title} titleStyle={{ fontSize: 14 }} />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
  card: {
    width: 250,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    height: 140,
  },
});

export default InfographicSlider;
