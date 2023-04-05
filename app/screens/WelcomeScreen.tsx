import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import {
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Button, Text, TextField } from "../components";
import { useStores } from "../models"; // @demo remove-current-line
import { AppStackScreenProps } from "../navigators"; // @demo remove-current-line
import { colors, spacing } from "../theme";
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle";

const makeYaerList = () => {
  const result = [];
  const min = 1970;
  const max = 2023;

  for (let i = min; i < max; i++) {
    result.push({ label: String(i), value: String(i) });
  }
  return result;
};

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(
  function WelcomeScreen(
    _props // @demo remove-current-line
  ) {
    // @demo remove-block-start
    const { navigation } = _props;

    function goNext() {
      navigation.navigate("Demo", { screen: "DemoShowroom" });
    }

    const authPasswordInput = useRef<TextInput>();
    const [yearOpen, setYearOpen] = useState(false);
    const [yearValue, setYearValue] = useState(null);
    const [years, setYears] = useState(makeYaerList());
    const [gender, setGender] = useState("M");

    const [monthOpen, setMonthOpen] = useState(false);
    const [month, setMonth] = useState([
      { label: "01", value: "01" },
      { label: "02", value: "02" },
      { label: "03", value: "03" },
      { label: "04", value: "04" },
      { label: "05", value: "05" },
      { label: "06", value: "06" },
      { label: "07", value: "07" },
      { label: "08", value: "08" },
      { label: "09", value: "09" },
      { label: "10", value: "10" },
      { label: "11", value: "11" },
      { label: "12", value: "12" },
    ]);
    const [monthValue, setMonthValue] = useState(null);

    const [regionOpen, setRegionOpen] = useState(false);
    const [region, setRegion] = useState([
      { label: "서울", value: "서울" },
      { label: "경기", value: "경기" },
      { label: "강원", value: "강원" },
    ]);
    const [regionValue, setRegionValue] = useState(null);

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

      if (validationError) return;

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

    const onRegionOpen = useCallback(() => {
      setYearOpen(false);
      setMonthOpen(false);
    }, []);

    const onYearOpen = useCallback(() => {
      setRegionOpen(false);
      setMonthOpen(false);
    }, []);

    const onMonthOpen = useCallback(() => {
      setRegionOpen(false);
      setYearOpen(false);
    }, []);

    const handlePressMan = () => {
      setGender("M");
    };

    const handlePressFemale = () => {
      setGender("F");
    };

    const $topContainerInsets = useSafeAreaInsetsStyle(["top"]);
    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"]);
    //
    return (
      <View style={$container}>
        <View style={[$topContainer, $topContainerInsets]}>
          <Text
            testID="login-heading"
            tx="signUpScreen.inputInfo"
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
            labelTx="signUpScreen.nickNameLabel"
            autoCorrect={false}
            keyboardType="number-pad"
            placeholderTx="signUpScreen.nickNamePlaceholder"
            helper={error}
            status={error ? "error" : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
            editable={true}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: spacing.large,
            }}
          >
            <View style={$yearSelectContainer}>
              <Text style={$fieldLabel}>생년/월</Text>
              <DropDownPicker
                style={{ borderColor: colors.palette.main }}
                textStyle={$selectBoxText}
                open={yearOpen}
                value={yearValue}
                onOpen={onYearOpen}
                items={years}
                setOpen={setYearOpen}
                setValue={setYearValue}
                setItems={setYears}
                placeholder="연도"
              />
            </View>
            <View style={$monthSelectContainer}>
              <Text style={$fieldLabel}></Text>
              <DropDownPicker
                style={{ borderColor: colors.palette.main }}
                textStyle={$selectBoxText}
                open={monthOpen}
                value={monthValue}
                onOpen={onMonthOpen}
                items={month}
                setOpen={setMonthOpen}
                setValue={setMonthValue}
                setItems={setMonth}
                placeholder="월"
              />
            </View>
          </View>
          <View style={$regionSelectContainer}>
            <Text style={$fieldLabel}>지역</Text>
            <DropDownPicker
              style={{ borderColor: colors.palette.main }}
              textStyle={$selectBoxText}
              open={regionOpen}
              value={regionValue}
              onOpen={onRegionOpen}
              items={region}
              setOpen={setRegionOpen}
              setValue={setRegionValue}
              setItems={setRegion}
              placeholder="지역"
            />
          </View>
          <View style={{ zIndex: -2 }}>
            <Text style={$fieldLabel}>성별</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 30,
                    borderRadius: 30,
                    borderColor: colors.palette.main,
                    backgroundColor: colors.palette.subMain,
                    borderWidth: 4,
                  }}
                  onPress={handlePressMan}
                />
                <Text>남자</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 30,
                    borderRadius: 30,
                    borderColor: colors.palette.main,
                    borderWidth: 2,
                  }}
                  onPress={handlePressFemale}
                />
                <Text>여자</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[$bottomContainer, $bottomContainerInsets]}>
          <Button
            testID="login-button"
            tx="signUpScreen.start"
            style={$tapButton}
            preset="reversed"
            onPress={goNext}
          />
        </View>
      </View>
    );
  }
);

const $signIn: TextStyle = {
  marginBottom: spacing.massive,
};

const $textField: ViewStyle = {
  marginBottom: spacing.large,
  backgroundColor: colors.palette.neutral100,
};

const $innerTextField: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  height: 50,
  borderColor: colors.palette.main,
  borderRadius: 10,
};

const $originTextField: TextStyle = {
  height: 35,
  fontSize: 16,
  color: colors.palette.neutral800,
};

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
  flexBasis: "80%",
  paddingHorizontal: spacing.large,
  marginTop: 50,
};

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "20%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "flex-end",
  marginBottom: 50,
};

const $yearSelectContainer: ViewStyle = {
  width: "55%",
};

const $monthSelectContainer: ViewStyle = {
  width: "40%",
};

const $selectBoxText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.main,
};

const $fieldLabel: TextStyle = {
  height: 35,
};

const $regionSelectContainer: ViewStyle = {
  marginBottom: spacing.large,
  zIndex: -1,
};
