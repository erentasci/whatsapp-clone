import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WELCOME_IMAGE = Image.resolveAssetSource(
  require("@/assets/images/welcome.png")
).uri;

const Page = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={{ uri: WELCOME_IMAGE }} style={styles.image} />
        <Text style={styles.heading}>Welcome to Whatsapp Clone</Text>
        <Text style={styles.description}>
          Read our <Text style={styles.link}>Privacy Policy. </Text>
          Tap "Agree & Continue" to accept the{" "}
          <Text style={styles.link}>Terms of service.</Text>
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/otp")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    color: Colors.gray,
    textAlign: "center",
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 26,
    color: Colors.primary,
    marginTop: 60,
  },
});

export default Page;
