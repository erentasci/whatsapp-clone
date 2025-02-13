import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="calls"
        options={{
          title: "Calls",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="phone-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
