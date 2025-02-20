import Colors from "@/constants/Colors";
import { format } from "date-fns";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ChatSwipeableRow from "./ChatSwipeableRow";

export interface ChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const ChatRow: FC<ChatRowProps> = ({
  id,
  from,
  date,
  img,
  msg,
  read,
  unreadCount,
}) => {
  return (
    <ChatSwipeableRow>
      <Link href="/" asChild>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            paddingLeft: 10,
            paddingVertical: 10,
          }}
        >
          <Image
            source={{
              uri: img,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {from}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.gray,
              }}
            >
              {msg.length > 38 ? `${msg.substring(0, 38)}...` : msg}
            </Text>
          </View>
          <Text
            style={{
              color: Colors.gray,
              paddingRight: 20,
              alignSelf: "flex-start",
            }}
          >
            {format(date, "MM.dd.yy")}
          </Text>
        </TouchableOpacity>
      </Link>
    </ChatSwipeableRow>
  );
};

export default ChatRow;
