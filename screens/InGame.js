import { View, StyleSheet, FlatList, Animated } from "react-native";
import { useEffect, useLayoutEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { incrementRound, addExpression } from "../redux/settingsSlice";

import { useNavigation, useRoute } from "@react-navigation/native";

import AnswerButton from "../components/AnswerButton";
import GameSelectButton from "../components/GameSelectButton";
import MathExpression from "../components/MathExpression";
import {
	additionArray,
	subtractionArray,
	multiplicationArray,
	divisionArray,
} from "../randomArray";

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
			setExpress(`${x}\n- ${y}`);
			return x - y;
		},
		"*": function (x, y) {
			setAnswer(x * y);
			setExpress(`${x}\nx ${y}`);
			return x * y;
		},
		"/": function (x, y) {
			let num1 = x,
				num2 = y;
			if (y > x) {
				x = num2;
				y = num1;
			}
			console.log(x + "  /  " + y);
			let remainder = x % y;
			if (remainder > 0) remainder = y - remainder;
			x += remainder;
			console.log(remainder);
			console.log(x + "  /  " + y);
			setAnswer(x / y);
			setExpress(`${x}\n÷ ${y}`);
			return x / y;
		},
	};

	const randomizeAnswers = (val) => {
		if (gameType === "+") {
			setQuestionArr(additionArray(val));
		} else if (gameType === "-") {
			setQuestionArr(subtractionArray(val));
		} else if (gameType === "*") {
			setQuestionArr(multiplicationArray(val));
		} else {
			setQuestionArr(divisionArray(val));
		}
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

	const buttonPress = (element) => {
		setDisable(true);
		console.log(element);
		const arr = express.split(`\n`);
		const str = arr[0] + " " + arr[1] + " = " + element;
		console.log(element === ans);
		dispatch(addExpression({ expression: str, choice: element === ans }));
		Animated.timing(shrinkValue).reset();
	};

	const endGameHandler = () => {
		if (round < endRound) {
			setQuestionArr([]);
			dispatch(incrementRound());
		} else {
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

	useEffect(() => {
		shrinkAnimation();
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
					onComplete={buttonPress.bind(this, "?")}
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
			<MathExpression
				expression={express}
				answer={ans}
				disable={disable}
			/>

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

			<GameSelectButton
				onPress={endGameHandler}
				disable={!disable}
				outerStyle={[
					styles.buttonContainer,
					!disable && { opacity: 0.2 },
				]}
				innerStyle={styles.buttonInnerContainer}
				textStyle={styles.buttonText}
			>
				Next Problem
			</GameSelectButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 15,
		flex: 1,
	},

	timerContainer: {
		alignSelf: "flex-end",
	},

	timer: {
		fontSize: 24,
		textAlign: "center",
		fontFamily: "Lora-Regular",
	},

	listContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},

	// Next Question Button Styling
	buttonContainer: {
		marginVertical: 15,
		marginHorizontal: "3%",
	},

	buttonInnerContainer: {
		backgroundColor: "#cccccc",
		borderRadius: "8%",
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
		shadowOpacity: 0.5,
	},

	buttonText: {
		padding: 10,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default InGame;
