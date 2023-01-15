import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

const AnswerButton = ({ children, onPress, disable, specificPress, bgc }) => {
	const [press, setPress] = useState(specificPress);

	const buttonHandler = () => {
		setPress(true);
		onPress();
	};

	return (
		<View style={styles.outerStyle}>
			<Pressable
				onPress={buttonHandler}
				style={({ pressed }) => pressed && styles.pressed}
				disabled={disable}
			>
				<View style={[styles.innerStyle, disable && press && bgc]}>
					<Text style={styles.textStyle}>{children}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.5,
	},

	outerStyle: {
		flex: 1,
		// marginHorizontal: "1.5%",
		margin: "3%",
	},

	innerStyle: {
		height: 125,
		padding: 10,
		borderWidth: 2,
		justifyContent: "center",
		borderRadius: "8%",
		backgroundColor: "#cccccc",
	},

	textStyle: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default AnswerButton;
