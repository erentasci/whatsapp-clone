import BoxedIcon from "@/components/BoxedIcon";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Settings = () => {
  const devices = [
    {
      name: "Broadcast Lists",
      icon: "megaphone",
      backgroundColor: Colors.green,
    },
    {
      name: "Starred Messages",
      icon: "star",
      backgroundColor: Colors.yellow,
    },
    {
      name: "Linked Devices",
      icon: "laptop-outline",
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: "Account",
      icon: "key",
      backgroundColor: Colors.primary,
    },
    {
      name: "Privacy",
      icon: "lock-closed",
      backgroundColor: "#33A5D1",
    },
    {
      name: "Chats",
      icon: "logo-whatsapp",
      backgroundColor: Colors.green,
    },
    {
      name: "Notifications",
      icon: "notifications",
      backgroundColor: Colors.red,
    },
    {
      name: "Storage and Data",
      icon: "repeat",
      backgroundColor: Colors.green,
    },
  ];

  const support = [
    {
      name: "Help",
      icon: "information",
      backgroundColor: Colors.primary,
    },
    {
      name: "Tell a Friend",
      icon: "heart",
      backgroundColor: Colors.red,
    },
  ];

  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: Colors.background }}
      >
        <View style={defaultStyles.block}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>

        <TouchableOpacity onPress={() => signOut()}>
          <Text
            style={{
              fontSize: 18,
              color: Colors.primary,
              textAlign: "center",
              paddingVertical: 14,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;
