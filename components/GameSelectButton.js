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
					<Text style={textStyle}>{children}</Text>
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

export default GameSelectButton;
