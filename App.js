import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GameScreen from "./components/GameScreen";
import LearnScreen from "./components/LearnScreen";
import SettingsScreen from "./components/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Learn") {
              iconName = focused ? "book" : "book";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings";
            } else if (route.name === "Game") {
              iconName = focused ? "game-controller" : "game-controller";
            }
            return <Ionicons name={iconName} size={20} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Learn"
          component={LearnScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  one: { flex: 1, backgroundColor: "blue" },
  two: { flex: 1, backgroundColor: "red" },
  container: { flex: 1, flexDirection: "row" },
});

{
  /* <View style={styles.container}>
<View style={styles.one}></View>
<View style={styles.two}></View>
<StatusBar style="hidden" />
</View> */
}
