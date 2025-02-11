import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaskInput from "react-native-mask-input";

const TR_MASK = [
  "+",
  "9",
  "0",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
];

const Page = () => {
  const [phone, setPhone] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        WhatsApp will need to verify your account. Carrier charges may apply.
      </Text>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 12,
          width: "100%",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Turkey</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />
          <MaskInput
            value={phone}
            style={{
              width: "100%",
              backgroundColor: Colors.white,
              padding: 6,
              fontSize: 16,
              marginTop: 10,
            }}
            placeholder="+90 Enter your phone number"
            onChangeText={(masked) => {
              setPhone(masked);
            }}
            mask={TR_MASK}
          />
        </View>
      </View>

      <Text style={styles.description}>
        You must be
        <Text style={styles.link}>at least 16 years old</Text> to register.
        Learn how WhatsApp works with the{" "}
        <Text style={styles.link}>Meta Companies.</Text>
      </Text>

      <View style={{ flex: 1 }} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
    gap: 20,
  },
  title: {
    fontSize: 14,
    color: Colors.gray,
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 8,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: Colors.primary,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    paddingHorizontal: 14,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  buttonText: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: "500",
  },
});

export default Page;
