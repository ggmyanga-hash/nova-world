import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>NOVA <Text style={styles.purple}>WORLD</Text></Text>
        <Text style={styles.subtitle}>SOCIAL WORLD</Text>
      </View>

      <ScrollView>
        {tab === "home" && (
          <>
            <Text style={styles.welcome}>Дэлхийтэй холбогд ✨</Text>
            <Text style={styles.description}>
              Your world. Your language. Your people.
            </Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>🌍 Discover the world</Text>
              <Text style={styles.cardText}>
                Өөр өөр орны хүмүүстэй танилцаж, хэл сурч, найз нөхөдтэй болоорой.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>🇰🇷 Korean Learning</Text>
              <Text style={styles.cardText}>
                Солонгос хэлээ NOVA WORLD-той хамт хөгжүүлээрэй.
              </Text>
              <Text style={styles.purple}>Суралцаж эхлэх →</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>💜 Community</Text>
              <Text style={styles.cardText}>
                Найзуудынхаа нийтлэл, зураг, шинэ мэдээг үзээрэй.
              </Text>
            </View>
          </>
        )}

        {tab === "learn" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🇰🇷 Korean Learning</Text>
            <Text style={styles.cardText}>Үг цээжлэх · Дүрэм · Сонсох · TOPIK</Text>
          </View>
        )}

        {tab === "profile" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>My Profile</Text>
            <Text style={styles.cardText}>NOVA WORLD-д тавтай морил!</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setTab("home")}>
          <Text style={styles.navText}>⌂{"\n"}Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("learn")}>
          <Text style={styles.navText}>📚{"\n"}Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("profile")}>
          <Text style={styles.navText}>☺{"\n"}Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B14",
    padding: 20
  },
  header: {
    paddingVertical: 20
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 2
  },
  purple: {
    color: "#A78BFA"
  },
  subtitle: {
    color: "#888DA5",
    letterSpacing: 4,
    fontSize: 10
  },
  welcome: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 25
  },
  description: {
    color: "#A0A5B8",
    marginTop: 10,
    marginBottom: 25
  },
  card: {
    backgroundColor: "#171B2B",
    borderColor: "#292F45",
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 12
  },
  cardText: {
    color: "#AEB4C7",
    fontSize: 14,
    lineHeight: 23
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#292F45"
  },
  navText: {
    color: "#C4B5FD",
    textAlign: "center",
    fontSize: 13
  }
}); 
