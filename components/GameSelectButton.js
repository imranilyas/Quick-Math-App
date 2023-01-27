import { Pressable, View, Text, StyleSheet } from "react-native";

const GameSelectButton = ({
	children,
	onPress,
	disable,
	outerStyle,
	innerStyle,
	textStyle,
}) => {
	return (
		<View style={outerStyle}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
				disabled={disable}
			>
				<View style={innerStyle}>
					<Text style={[textStyle, styles.fontFam]}>{children}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.5,
	},

	fontFam: {
		fontFamily: "Lora-Regular",
	},
});

export default GameSelectButton;
