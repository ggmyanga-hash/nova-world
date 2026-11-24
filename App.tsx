
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { supabase } from "./src/supabase";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);

  async function handleAuth() {
    setMessage("");
    setLoading(true);

    try {
      const result = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (result.error) throw result.error;

      setUser(result.data.user);

      if (!isLogin && !result.data.session) {
        setMessage("Бүртгэл амжилттай! Имэйлээ шалгаарай.");
      } else {
        setMessage("Амжилттай!");
      }
    } catch (error: any) {
      setMessage(error.message || "Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setMessage("");
  }

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>NOVA <Text style={styles.purple}>WORLD</Text></Text>
        <Text style={styles.welcome}>Тавтай морил! ✨</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>LOG OUT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.logo}>NOVA <Text style={styles.purple}>WORLD</Text></Text>
          <Text style={styles.subtitle}>SOCIAL WORLD</Text>

          <Text style={styles.heading}>
            {isLogin ? "Тавтай морил ✨" : "Нэгдээрэй 🌍"}
          </Text>
          <Text style={styles.description}>
            Дэлхийтэй холбогд. Хэл сур. Найз нөхөдтэй бол.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Имэйл хаяг"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Нууц үг (дор хаяж 6 тэмдэгт)"
            placeholderTextColor="#777"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {!!message && <Text style={styles.message}>{message}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#080A12" />
              : <Text style={styles.buttonText}>
                  {isLogin ? "НЭВТРЭХ" : "БҮРТГҮҮЛЭХ"}
                </Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}>
            <Text style={styles.switchText}>
              {isLogin
                ? "Шинэ хэрэглэгч үү? Бүртгүүлэх"
                : "Бүртгэлтэй юу? Нэвтрэх"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>YOUR WORLD. YOUR PEOPLE.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080A12",
    padding: 25,
    justifyContent: "center"
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 35
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 39,
    fontWeight: "900",
    letterSpacing: 5
  },
  purple: {
    color: "#A78BFA"
  },
  subtitle: {
    color: "#A78BFA",
    fontSize: 10,
    letterSpacing: 5,
    marginTop: 9,
    marginBottom: 65
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 10
  },
  description: {
    color: "#999",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 30
  },
  input: {
    width: "100%",
    backgroundColor: "#171A27",
    color: "#FFFFFF",
    padding: 17,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#303348"
  },
  button: {
    width: "100%",
    backgroundColor: "#C4B5FD",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12
  },
  buttonText: {
    color: "#080A12",
    fontWeight: "900",
    letterSpacing: 2
  },
  switchText: {
    color: "#C4B5FD",
    marginTop: 25,
    fontSize: 14
  },
  message: {
    color: "#FCA5A5",
    marginVertical: 12,
    textAlign: "center"
  },
  welcome: {
    color: "#FFFFFF",
    fontSize: 26,
    marginTop: 45,
    marginBottom: 12
  },
  email: {
    color: "#A78BFA",
    marginBottom: 30
  },
  footer: {
    color: "#555",
    fontSize: 11,
    marginTop: 55,
    letterSpacing: 2
  }
});
