import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { SectionList, View, ViewStyle } from "react-native";
import { DrawerLayout } from "react-native-gesture-handler";
import { Button, Screen } from "../../components";
import {
  DemoTabParamList,
  DemoTabScreenProps,
} from "../../navigators/DemoNavigator";
import { colors, spacing } from "../../theme";
import * as Demos from "./demos";

export interface Demo {
  name: string;
  description: string;
  data: ReactElement[];
}

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
    const [open, setOpen] = useState(false);
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const drawerRef = useRef<DrawerLayout>();
    const listRef = useRef<SectionList>();

    const route = useRoute<RouteProp<DemoTabParamList, "DemoShowroom">>();
    const params = route.params;

    // handle Web links
    React.useEffect(() => {
      if (route.params) {
        const demoValues = Object.values(Demos);
        const findSectionIndex = demoValues.findIndex(
          x => x.name.toLowerCase() === params.queryIndex
        );
        let findItemIndex = 0;
        if (params.itemIndex) {
          try {
            findItemIndex =
              demoValues[findSectionIndex].data.findIndex(
                u => slugify(u.props.name) === params.itemIndex
              ) + 1;
          } catch (err) {
            console.error(err);
          }
        }
        handleScroll(findSectionIndex, findItemIndex);
      }
    }, [route]);

    const toggleDrawer = () => {
      if (!open) {
        setOpen(true);
        drawerRef.current?.openDrawer({ speed: 2 });
      } else {
        setOpen(false);
        drawerRef.current?.closeDrawer({ speed: 2 });
      }
    };

    const handleScroll = (sectionIndex: number, itemIndex = 0) => {
      listRef.current.scrollToLocation({
        animated: true,
        itemIndex,
        sectionIndex,
      });
      toggleDrawer();
    };

    useEffect(() => {
      return () => timeout.current && clearTimeout(timeout.current);
    }, []);

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$screenContainer}
      >
        <View
          style={{ height: 60, backgroundColor: colors.palette.neutral300 }}
        />
        <View style={$container}>
          <View style={$topContainer}></View>
          <View style={$bottomContainer}>
            <Button
              testID="login-button"
              tx="signUpScreen.start"
              style={$tapButton}
              preset="reversed"
            />
          </View>
        </View>
      </Screen>
    );
  };

const $screenContainer: ViewStyle = {
  flex: 1,
};

// @demo remove-file

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
};

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
  backgroundColor: colors.palette.main,
  borderRadius: 10,
};
