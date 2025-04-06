import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface WelcomeScreen {
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
}

const screens: WelcomeScreen[] = [
  {
    title: "Bienvenido a la App de Prevención del Cáncer de Mama",
    description:
      "Nuestra misión es proporcionarte las herramientas y el conocimiento para que tomes el control de tu salud. \n\nEl cáncer es una enfermedad en la que el paciente puede contribuir enormemente a ayudarse a sí mismo si puede mantener su moral y sus esperanzas (George Carman).",
    image: require("@/assets/images/dashboard1.png"),
    buttonLabel: "Siguiente",
  },
  {
    title: "La batalla me hizo más fuerte",
    description:
      "La prevención es una parte muy importante para resolver el problema del cáncer (Eva Vertes).",
    image: require("@/assets/images/dashboard2.png"),
    buttonLabel: "Siguiente",
  },
  {
    title: "¿Ya programaste tu mamografía?",
    description:
      "Las mamografías son la mejor forma de detectar el cáncer de mama a tiempo, cuando es más fácil de tratar. Programa la tuya hoy.",
    image: require("@/assets/images/dashboard3.png"),
    buttonLabel: "Finalizar",
  },
];

export default function DashboardScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const onNextPress = () => {
    if (currentIndex < screens.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Navega al Tab Navigator al presionar "Finish"
      router.push("/(tabs)");
    }
  };

  const renderItem = ({ item }: { item: WelcomeScreen }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={screens}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const pageIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(pageIndex);
        }}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          {screens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: currentIndex === index ? "#ff4081" : "#ccc",
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={onNextPress}>
          <Text style={styles.buttonText}>
            {screens[currentIndex].buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    width,
    alignItems: "center",
    paddingTop: 20,
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: "40%",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: "#555",
    paddingHorizontal:20,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#ff4081",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 50,
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
