import { StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { resetRound } from "../redux/settingsSlice";

import SettingsButton from "../components/SettingsButton";
import GameSelectButton from "../components/GameSelectButton";

const choiceArr = [
	{ id: "Addition +", val: "+" },
	{ id: "Subtraction -", val: "-" },
	{ id: "Multiplication ×", val: "*" },
	{ id: "Division ÷", val: "/" },
];

const Home = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const settingsHandler = () => {
		navigation.navigate("SettingsScreen");
	};

	const gameHandler = (val) => {
		dispatch(resetRound());
		navigation.navigate("InGameScreen", { gameType: val });
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<SettingsButton onPress={settingsHandler} />

			<Text style={styles.title}>Quick Maths</Text>
			<Text
				style={[
					styles.title,
					{ fontSize: 30, marginTop: 40, marginVertical: 0 },
				]}
			>
				+ - x ÷
			</Text>
			<FlatList
				contentContainerStyle={{
					flex: 1,
					justifyContent: "flex-end",
					marginBottom: 20,
				}}
				data={choiceArr}
				renderItem={(choice) => {
					return (
						<GameSelectButton
							onPress={() => gameHandler(choice.item.val)}
							key={choice.item.val}
							outerStyle={styles.listContainer}
							innerStyle={styles.listInnerContainer}
							textStyle={styles.listText}
						>
							{choice.item.id}
						</GameSelectButton>
					);
				}}
				alwaysBounceVertical={false}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 48,
		textAlign: "center",
		fontFamily: "Lora-Regular",
		marginVertical: 40,
	},
	iconContainer: {
		// backgroundColor: "transparent",
		alignSelf: "center",
	},
	icon: {
		width: 150,
		height: 150,
	},
	// Flatlist styling
	listContainer: {
		marginVertical: 20,
		alignSelf: "center",
		width: "80%",
	},

	listInnerContainer: {
		backgroundColor: "#cccccc",
		borderRadius: 10,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
		shadowOpacity: 0.5,
	},

	listText: {
		padding: 12,
		fontSize: 22,
		textAlign: "center",
	},
});

export default Home;
