import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

const InGame = () => {
	const gameType = useRoute().params.gameType;

	const first = Math.floor(Math.random() * 10) + 1;
	const second = Math.floor(Math.random() * 10) + 1;
	let answer = 0;

	const expression = {
		"+": function (x, y) {
			answer = x + y;
			return `${x} + ${y}`;
		},
		"-": function (x, y) {
			answer = x - y;

			return `${x} - ${y}`;
		},
		"*": function (x, y) {
			answer = x * y;

			return `${x} x ${y}`;
		},
		"/": function (x, y) {
			answer = x / y;
			return `${x} / ${y}`;
		},
	};

	const navigation = useNavigation();
	const endGameHandler = () => {
		navigation.navigate("EndGameScreen");
	};

	return (
		<View>
			<Text>
				In-Game Screen, {expression[gameType](first, second)} and this:{" "}
				{answer}
			</Text>
			<CustomButton onPress={endGameHandler}>End</CustomButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default InGame;
