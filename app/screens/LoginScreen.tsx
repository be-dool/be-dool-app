import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import { TextInput, TextStyle, View, ViewStyle } from "react-native";
import { Button, Text, TextField } from "../components";
import { useStores } from "../models";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle";

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(
  _props
) {
  const authPasswordInput = useRef<TextInput>();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setAuthToken,
      validationError,
    },
  } = useStores();

  const error = isSubmitted ? validationError : "";

  function login() {
    setIsSubmitted(true);
    setAttemptsCount(attemptsCount + 1);

    // if (validationError) return;

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false);
    setAuthEmail("");

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()));
  }

  useEffect(() => {
    return () => {
      setAuthEmail("");
    };
  }, []);

  const $topContainerInsets = useSafeAreaInsetsStyle(["top"]);
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <View style={$container}>
      <View style={[$topContainer, $topContainerInsets]}>
        <Text
          testID="login-heading"
          tx="authPhoneScreen.authPhone"
          preset="heading"
          style={$signIn}
        />
        <TextField
          value={authEmail}
          inputWrapperStyle={$innerTextField}
          style={$originTextField}
          placeholderTextColor={colors.palette.main}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          placeholderTx="authPhoneScreen.phoneFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
          editable={true}
        />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button
          testID="login-button"
          tx="authPhoneScreen.tapToSendCode"
          style={$tapButton}
          preset="reversed"
          onPress={login}
        />
      </View>
    </View>
  );
});

const $signIn: TextStyle = {
  marginBottom: spacing.small,
};

const $textField: ViewStyle = {
  marginBottom: spacing.large,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
};

const $innerTextField: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  height: 60,
  width: 330,
  borderColor: colors.palette.main,
  borderRadius: 10,
};

const $originTextField: TextStyle = { height: 45, fontSize: 20 };

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
  backgroundColor: colors.palette.main,
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
};

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "50%",
  justifyContent: "space-between",
  paddingHorizontal: spacing.large,
  marginTop: 50,
};

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "50%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "flex-end",
  marginBottom: 50,
};

// @demo remove-file
