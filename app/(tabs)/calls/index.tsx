import calls from "@/assets/data/calls.json";
import { SegmentedControl } from "@/components/SegmentedControl";
import SwipeableRow from "@/components/SwipeableRow";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const transition = CurvedTransition.delay(100);

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOption, setSelectedOption] = useState("All");
  const editing = useSharedValue(-30);

  const onEdit = () => {
    const newEdit = !isEditing;
    editing.value = newEdit ? 0 : -30;
    setIsEditing(newEdit);
  };

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  }, [selectedOption]);

  const removeCall = (call: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems((prev) => prev.filter((item) => item.id !== call.id));
  };

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={(option) => setSelectedOption(option)}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 18,
                }}
              >
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Animated.View style={defaultStyles.block} layout={transition}>
        <Animated.FlatList
          skipEnteringExitingAnimations
          data={items}
          scrollEnabled={false}
          itemLayoutAnimation={transition}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={defaultStyles.separator} />
          )}
          renderItem={({ item, index }) => (
            <SwipeableRow onDelete={() => removeCall(item)}>
              <Animated.View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                entering={FadeInUp.delay(index * 10)}
                exiting={FadeOutUp}
              >
                <AnimatedTouchableOpacity
                  onPress={() => removeCall(item)}
                  style={[animatedRowStyles, { paddingLeft: 8 }]}
                >
                  <Ionicons name="remove-circle" size={24} color={Colors.red} />
                </AnimatedTouchableOpacity>
                <Animated.View style={[defaultStyles.item, animatedRowStyles]}>
                  <Image
                    source={{
                      uri: item.img,
                    }}
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: item.missed ? Colors.red : "#000",
                      }}
                    >
                      {item.name}
                    </Text>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <Ionicons
                        name={item.video ? "videocam" : "call"}
                        size={16}
                        color={Colors.gray}
                      />
                      <Text style={{ color: Colors.gray, flex: 1 }}>
                        {item.incoming ? "Incoming" : "Outgoing"}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: Colors.gray }}>
                      {format(item.date, "MM.dd.yy")}
                    </Text>
                    <Ionicons
                      name="information-circle-outline"
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </Animated.View>
              </Animated.View>
            </SwipeableRow>
          )}
        />
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Page;
