import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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
			setExpress(`${x}\n+ ${y}`);
			return x + y;
		},
		"-": function (x, y) {
			setAnswer(x - y);
			setExpress(`${x} - ${y}`);
			return x - y;
		},
		"*": function (x, y) {
			setAnswer(x * y);
			setExpress(`${x} x ${y}`);
			return x * y;
		},
		"/": function (x, y) {
			setAnswer(x / y);
			setExpress(`${x} ÷ ${y}`);
			return x / y;
		},
	};

	const randomizeAnswers = (val) => {
		let x = Math.floor(Math.random() * 4);
		const arr = [];
		for (let i = 0; i < 4; i++) {
			if (i === x) {
				arr.push({ id: val, chosen: false });
			} else {
				let rng = Math.floor(Math.random() * val * 2);
				while (
					arr.some((question) => question["id"] === rng) ||
					rng === val
				) {
					rng = Math.floor(Math.random() * val * 2);
				}
				arr.push({ id: rng, chosen: false });
			}
		}
		setQuestionArr(arr);
	};

	const round = useSelector((state) => state.settings.roundProgress);
	const endRound = useSelector((state) => state.settings.rounds);

	const navigation = useNavigation();
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Round ${round} of ${endRound}`,
		});
	}, [round, endRound, navigation]);

	const buttonPress = () => {
		setBtn(true);
		setDisable(true);
	};

	const endGameHandler = () => {
		if (round < endRound) {
			setQuestionArr([]);
			dispatch(incrementRound());
		} else {
			dispatch(resetRound());
			navigation.navigate("EndGameScreen");
		}
	};

	useEffect(() => {
		if (round <= endRound) {
			setBtn(false);
			setDisable(false);
			const num = expression[gameType](
				Math.floor(Math.random() * 10) + 1,
				Math.floor(Math.random() * 10) + 1
			);
			randomizeAnswers(num);
		}
	}, [round]);

	return (
		<View style={styles.container}>
			<View style={styles.expressionContainer}>
				<View style={styles.innerContainer}>
					<Text style={styles.expression}>{express}</Text>
					<Text
						style={[
							styles.expression,
							{ textDecorationLine: "none" },
						]}
					>
						{btn ? ans : "?"}
					</Text>
				</View>
			</View>

			<View style={styles.listContainer}>
				<FlatList
					data={questionArr}
					renderItem={(question) => {
						return (
							<AnswerButton
								key={question.item.id}
								onPress={buttonPress}
								disable={disable}
								specificPress={false}
								bgc={
									question.item.id === ans
										? { backgroundColor: "blue" }
										: { backgroundColor: "red" }
								}
							>
								{question.item.id}
							</AnswerButton>
						);
					}}
					alwaysBounceVertical={false}
					numColumns={2}
				/>
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
	container: {
		margin: 15,
	},

	expressionContainer: {
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
		// height: "50%",
	},

	innerContainer: {
		// backgroundColor: "green",
		padding: 20,
	},

	expression: {
		textAlign: "right",
		fontSize: 40,
		padding: 10,
		// backgroundColor: "#cccccc",
		// margin: 40,
		textDecorationLine: "underline",
	},

	listContainer: {
		// height: "50%",
	},
});

export default InGame;
