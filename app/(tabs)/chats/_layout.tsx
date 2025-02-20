import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
const Layout = () => {
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
            <TouchableOpacity style={{ flexDirection: "row", gap: 30 }}>
              <Ionicons
                name="camera-outline"
                size={30}
                color={Colors.primary}
              />
              <Ionicons name="add-circle" size={30} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
export default Layout;
