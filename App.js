import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import InGame from "./screens/InGame";
import EndGame from "./screens/EndGame";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import { useCallback } from "react";

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		"Lora-Regular": require("./assets/fonts/Lora-Regular.ttf"),
	});

	// const onLayoutRootView = useCallback(async () => {
	// 	if (fontsLoaded) {
	// 		await SplashScreen.hideAsync();
	// 	}
	// }, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<StatusBar style="auto" />
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="HomeScreen"
						screenOptions={{
							headerTitleStyle: {
								fontFamily: "Lora-Regular",
							},
							headerStyle: {
								backgroundColor: "hsl(307, 100%, 82%)",
							},
							contentStyle: {
								fontFamily: "Lora-Regular",
								backgroundColor: "hsl(307, 100%, 88%)",
							},
						}}
					>
						<Stack.Screen
							name="SettingsScreen"
							component={Settings}
							options={{
								animation: "slide_from_bottom",
								presentation: "modal",
								title: "Settings",
							}}
						/>
						<Stack.Screen
							name="HomeScreen"
							component={Home}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="InGameScreen"
							component={InGame}
							options={{
								// title: `Round ${round} of ${endRound}`,
								headerBackVisible: false,
							}}
						/>
						<Stack.Screen
							name="EndGameScreen"
							component={EndGame}
							options={{
								// headerShown: false,
								headerBackVisible: false,
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
