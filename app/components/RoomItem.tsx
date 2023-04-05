import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { colors, spacing } from "../theme";

export const RoomItem = ({ go }: { go: () => void }) => {
  return (
    <TouchableOpacity onPress={go} style={$chatRoomItemContainer}>
      <View style={$userImageContainer}>
        <View style={$userImage} />
      </View>
      <View style={$rightSectionChatRoom}>
        <View style={$topSectionChatRoom}>
          <View style={$userInfoSection}>
            <Text style={$nickNameText}>캐처스</Text>
            <Text style={$ageGenText}>20/남</Text>
          </View>

          <View style={$chatDateSection}>
            <Text>2020-03-20</Text>
          </View>
        </View>
        <View>
          <Text>안녕하세요~</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const $chatRoomItemContainer: ViewStyle = {
  flexDirection: "row",
  paddingRight: 20,
  paddingLeft: 20,
  paddingTop: 10,
  paddingBottom: 10,
  borderBottomWidth: 1,
  borderColor: colors.palette.gray200,
};

const $userImageContainer: ViewStyle = {
  marginRight: 15,
};

const $userImage: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 50,
  backgroundColor: colors.palette.gray300,
};

const $rightSectionChatRoom: ViewStyle = {
  flex: 1,
};

const $topSectionChatRoom: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing.extraSmall,
  justifyContent: "space-between",
};

const $userInfoSection: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

const $chatDateSection: ViewStyle = {
  alignItems: "flex-end",
};

const $nickNameText: TextStyle = {
  fontWeight: "bold",
  marginRight: 4,
};
const $ageGenText: TextStyle = {
  fontSize: 12,
};
