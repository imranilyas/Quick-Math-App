import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import { incrementRound, resetRound } from "../redux/settingsSlice";

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

	const round = useSelector((state) => state.settings.roundProgress);
	const endRound = useSelector((state) => state.settings.rounds);

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const endGameHandler = () => {
		console.log(round);
		if (round < endRound) {
			console.log("Nobody move");
			dispatch(incrementRound());
		} else {
			dispatch(resetRound());
			navigation.navigate("EndGameScreen");
		}
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
