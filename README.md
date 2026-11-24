
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { supabase } from "./src/supabase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("Имэйл болон нууц үгээ оруулна уу.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (!data.session) {
          setMessage("Бүртгэл үүслээ! Имэйлээ шалгаж баталгаажуулна уу.");
        }
      }
    } catch (error: any) {
      setMessage(error.message || "Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMessage("");
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>NOVA</Text>
        <Text style={styles.subtitle}>SOCIAL WORLD</Text>
        <Text style={styles.welcome}>Тавтай морил!</Text>
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Гарах</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>NOVA</Text>
      <Text style={styles.subtitle}>YOUR WORLD. YOUR PEOPLE.</Text>

      <Text style={styles.heading}>
        {isLogin ? "Тавтай морил" : "NOVA-д нэгдээрэй"}
      </Text>

      <Text style={styles.description}>
        {isLogin
          ? "Аккаунтаараа нэвтэрнэ үү."
          : "Өөрийн шинэ ертөнцийг эхлүүлээрэй."}
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
        placeholder="Нууц үг (8-аас дээш тэмдэгт)"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>
            {isLogin ? "НЭВТРЭХ" : "БҮРТГҮҮЛЭХ"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setIsLogin(!isLogin);
        setMessage("");
      }}>
        <Text style={styles.switchText}>
          {isLogin
            ? "Аккаунт байхгүй юу? Бүртгүүлэх"
            : "Аккаунттай юу? Нэвтрэх"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>NOVA WORLD © 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#080A12",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 9,
  },
  subtitle: {
    color: "#A78BFA",
    fontSize: 11,
    letterSpacing: 4,
    marginTop: 8,
    marginBottom: 55,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#999",
    fontSize: 14,
    marginBottom: 30,
  },
  welcome: {
    color: "#FFFFFF",
    fontSize: 26,
    marginTop: 45,
    marginBottom: 12,
  },
  email: {
    color: "#A78BFA",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#171A27",
    color: "#FFFFFF",
    padding: 17,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#303348",
  },
  button: {
    width: "100%",
    backgroundColor: "#C4B5FD",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#080A12",
    fontWeight: "900",
    letterSpacing: 2,
  },
  switchText: {
    color: "#C4B5FD",
    marginTop: 25,
    fontSize: 14,
  },
  message: {
    color: "#FCA5A5",
    marginVertical: 12,
    textAlign: "center",
  },
  footer: {
    color: "#555",
    fontSize: 11,
    marginTop: 55,
    letterSpacing: 2,
  },
});
