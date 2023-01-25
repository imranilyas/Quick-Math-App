import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { useEffect, useLayoutEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { incrementRound, resetRound } from "../redux/settingsSlice";

import { useNavigation, useRoute } from "@react-navigation/native";

import AnswerButton from "../components/AnswerButton";
import GameSelectButton from "../components/GameSelectButton";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const InGame = () => {
	const gameType = useRoute().params.gameType;

	const [express, setExpress] = useState("");
	const [ans, setAnswer] = useState(0);
	const [questionArr, setQuestionArr] = useState([]);
	const [disable, setDisable] = useState(false);

	const shrinkValue = useRef(new Animated.Value(24)).current;

	const shrinkAnimation = () => {
		Animated.loop(
			Animated.timing(shrinkValue, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: false,
			})
		).start();
	};

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
		setDisable(true);
		Animated.timing(shrinkValue).reset();
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
			setDisable(false);
			const num = expression[gameType](
				Math.floor(Math.random() * 10) + 1,
				Math.floor(Math.random() * 10) + 1
			);
			randomizeAnswers(num);
		}
	}, [round]);

	const arr = express.split(/([^0-9.]+)/);

	useEffect(() => {
		shrinkAnimation();
		console.log("Shrink Animation");
	}, [shrinkValue, round]);

	return (
		<View style={styles.container}>
			<View style={styles.timerContainer}>
				<CountdownCircleTimer
					isPlaying={disable ? false : true}
					duration={10}
					colors={["#009e37", "#fff200", "#ff9900", "#ca0000"]}
					colorsTime={[10, 5, 3, 0]}
					size={80}
					onComplete={buttonPress}
					key={round}
				>
					{({ remainingTime }) => (
						<Animated.Text
							style={[styles.timer, { fontSize: shrinkValue }]}
						>
							{remainingTime}
						</Animated.Text>
					)}
				</CountdownCircleTimer>
			</View>

			{/* Math Problem and Answer Section */}
			<View style={styles.expressionContainer}>
				<View style={styles.innerContainer}>
					<Text style={styles.expression}>
						{arr[0]}
						<Text style={{ textDecorationLine: "underline" }}>
							{arr[1]}
							{arr[2]}
						</Text>
					</Text>
					<Text
						style={[
							styles.expression,
							{ textDecorationLine: "none" },
						]}
					>
						{disable ? ans : " "}
					</Text>
				</View>
			</View>

			<FlatList
				contentContainerStyle={styles.listContainer}
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
			<GameSelectButton onPress={endGameHandler}>
				{disable ? "End" : " "}
			</GameSelectButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 15,
		flex: 1,
		// justifyContent: "flex-end",
	},

	timerContainer: {
		alignSelf: "flex-end",
	},

	timer: {
		fontSize: 24,
		textAlign: "center",
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
	},

	listContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
});

export default InGame;
