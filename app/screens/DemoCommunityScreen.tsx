import React, { FC } from "react";
import { Screen } from "../components";
import { DemoTabScreenProps } from "../navigators/DemoNavigator";
import { View } from "react-native";
import { colors } from "../theme";
import { RoomItem } from "../components/RoomItem";

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const { navigation } = _props;

    function goNext() {
      navigation.navigate("ChatRoomScreen");
    }
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]}>
        <View style={{ height: 60, backgroundColor: colors.palette.gray400 }} />
        <RoomItem go={goNext} />
      </Screen>
    );
  };

// @demo remove-file
