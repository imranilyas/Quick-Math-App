import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AnswerButton from "../components/AnswerButton";
import GameSelectButton from "../components/GameSelectButton";
import { incrementRound, resetRound } from "../redux/settingsSlice";

const InGame = () => {
	const gameType = useRoute().params.gameType;

	const [btn, setBtn] = useState(false);
	const [express, setExpress] = useState("");
	const [ans, setAnswer] = useState(0);
	const [questionArr, setQuestionArr] = useState([]);
	const [disable, setDisable] = useState(false);

	const expression = {
		"+": function (x, y) {
			setAnswer(x + y);
			setExpress(`${x} + ${y}`);
			return `${x} + ${y}`;
		},
		"-": function (x, y) {
			setAnswer(x - y);
			setExpress(`${x} - ${y}`);
			return `${x} - ${y}`;
		},
		"*": function (x, y) {
			setAnswer(x * y);
			setExpress(`${x} x ${y}`);
			return `${x} x ${y}`;
		},
		"/": function (x, y) {
			setAnswer(x / y);
			setExpress(`${x} ÷ ${y}`);
			return `${x} / ${y}`;
		},
	};

	const round = useSelector((state) => state.settings.roundProgress);
	const endRound = useSelector((state) => state.settings.rounds);

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const buttonPress = () => {
		console.log("Button Pressed");
		setBtn(true);
		setDisable(true);
	};

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

	useEffect(() => {
		console.log("Inside the useEffect: " + round);
		setBtn(false);
		setDisable(false);
		expression[gameType](
			Math.floor(Math.random() * 10) + 1,
			Math.floor(Math.random() * 10) + 1
		);
	}, [round]);

	return (
		<View>
			<Text>
				In-Game Screen:
				{" " + express}
			</Text>
			<View>
				<AnswerButton
					onPress={buttonPress}
					style={btn && { color: "green" }}
					disable={disable}
				>
					{ans}
				</AnswerButton>
				<AnswerButton onPress={buttonPress} disable={disable}>
					{909}
				</AnswerButton>
				<AnswerButton onPress={buttonPress} disable={disable}>
					{908}
				</AnswerButton>
				<AnswerButton onPress={buttonPress} disable={disable}>
					{907}
				</AnswerButton>
			</View>
			{btn && (
				<GameSelectButton onPress={endGameHandler}>
					End
				</GameSelectButton>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},

	red: {
		color: "red",
	},

	green: {
		color: "green",
	},
});

export default InGame;
