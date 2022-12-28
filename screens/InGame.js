import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

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

	return (
		<View>
			<Text>
				In-Game Screen, {expression[gameType](first, second)} and this:{" "}
				{answer}
			</Text>
			<View></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default InGame;
