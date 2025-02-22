import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerLeft: () => (
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={30}
              color={Colors.primary}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <Link href="/(modals)/new-chat" asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="add-circle"
                    color={Colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  color={Colors.primary}
                  size={25}
                  style={{ right: 10, paddingRight: 10 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  right: 15,
                  alignItems: "center",
                  gap: 10,
                  paddingBottom: 4,
                }}
              >
                <Image
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg",
                  }}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Simon Grimm
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="videocam-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="call-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  );
};
export default Layout;
