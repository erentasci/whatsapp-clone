import Colors from "@/constants/Colors";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
  const [loading, setLoading] = React.useState(false);
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  const sendOTP = async () => {
    console.log("sendOTP", phoneNumber);
    setLoading(true);
    try {
      await signUp!.create({
        phoneNumber,
      });
      console.log("TESafter createT: ", signUp!.createdSessionId);

      signUp!.preparePhoneNumberVerification();

      console.log("after prepare: ");
      router.push(`/verify/${phoneNumber}`);
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === "form_identifier_exists") {
          // User signed up before
          console.log("User signed up before");
          trySignIn();
        } else {
          Alert.alert("Error", err.errors[0].message);
        }
      }
      setLoading(false);
    }
  };

  const trySignIn = async () => {
    console.log("trySignIn", phoneNumber);

    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
      return factor.strategy === "phone_code";
    });

    if (!firstPhoneFactor) {
      throw new Error("No phone factor found");
    }

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: "phone_code",
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
      behavior="padding"
    >
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
        </View>
      )}

      <View style={styles.container}>
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Turkey</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />

          <MaskInput
            value={phoneNumber}
            keyboardType="phone-pad"
            autoFocus
            placeholder="+90 your phone number"
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={TR_MASK}
            style={styles.input}
          />
        </View>

        <Text style={styles.legal}>
          You must be <Text style={styles.link}>at least 16 years old</Text> to
          register. Learn how WhatsApp works with the{" "}
          <Text style={styles.link}>Meta Companies</Text>.
        </Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            styles.button,
            phoneNumber !== "" ? styles.enabled : null,
            { marginBottom: 20 },
          ]}
          onPress={sendOTP}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== "" ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  legal: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  buttonText: {
    color: Colors.lightGray,
    fontSize: 22,
    fontWeight: "500",
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },

  loading: {
    zIndex: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
