import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

const AnswerButton = ({
	children,
	onPress,
	style,
	disable,
	outerStyle,
	innerStyle,
	textStyle,
	specificPress,
	bgc,
}) => {
	const [press, setPress] = useState(specificPress);

	const buttonHandler = () => {
		setPress(true);
		onPress();
	};

	return (
		<View style={outerStyle}>
			<Pressable
				onPress={buttonHandler}
				style={({ pressed }) => pressed && styles.pressed}
				disabled={disable}
			>
				<View style={disable && press && bgc}>
					<Text style={[textStyle, style]}>{children}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.5,
	},
});

export default AnswerButton;
