import { View, ViewStyle } from "react-native";
import { Card } from "./Card";
import React from "react";
import { colors } from "../theme";

export const ChatItem = ({ isMy = false }: { isMy?: boolean }) => {
  return (
    <>
      {!isMy ? (
        <View style={$chatItemContainer}>
          <View style={$profileImgContainer} />
          <Card style={$chatItem} content="123123" />
        </View>
      ) : (
        <View style={$chatMyItemContainer}>
          <Card
            style={$chatMyItem}
            content="123123123123123123123123123123123"
          />
        </View>
      )}
    </>
  );
};

const $chatItemContainer: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  padding: 16,
};

const $chatMyItemContainer: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  padding: 16,
  alignSelf: "flex-end",
  justifyContent: "flex-end",
};

const $chatItem: ViewStyle = {
  padding: 16,
  width: "60%",
  shadowOpacity: 0.03,
};

const $chatMyItem: ViewStyle = {
  padding: 16,
  minWidth: "60%",
  shadowOpacity: 0.03,
};

const $profileImgContainer: ViewStyle = {
  width: 50,
  height: 50,
  backgroundColor: colors.palette.neutral500,
  marginTop: 10,
  marginRight: 15,
  borderRadius: 50,
};
