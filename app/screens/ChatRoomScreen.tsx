import React, { FC } from "react";
import { ScrollView, Text, View, ViewStyle } from "react-native";
import { Button, Screen } from "../components";
import { colors, spacing } from "../theme";
import { AppStackScreenProps } from "../navigators";
import { observer } from "mobx-react-lite";
import { ChatItem } from "../components/ChatItem";
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle";

interface ChatRoomScreenProps extends AppStackScreenProps<"ChatRoomScreen"> {}

export const ChatRoomScreen: FC<ChatRoomScreenProps> = observer(
  function ChatRoomScreen(_props) {
    const $topContainerInsets = useSafeAreaInsetsStyle(["top"]);

    return (
      <Screen style={$topContainerInsets} contentContainerStyle={$container}>
        <View
          style={{
            height: 40,
            borderBottomColor: colors.palette.gray200,
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>매너온도</Text>
          </View>
        </View>
        <ScrollView style={$topContainer}>
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem isMy={true} />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem isMy={true} />
        </ScrollView>
        <View style={$bottomContainer}>
          <Button
            testID="login-button"
            tx="signUpScreen.start"
            style={$tapButton}
            preset="reversed"
          />
        </View>
      </Screen>
    );
  }
);

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
};

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "80%",
  overflow: "scroll",
  width: "100%",
};

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "10%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "flex-end",
  marginBottom: 50,
  paddingHorizontal: spacing.large,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
  backgroundColor: colors.palette.main,
  borderRadius: 10,
};
