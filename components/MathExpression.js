import { View, Text, StyleSheet } from "react-native";

const MathExpression = ({ expression, answer, disable }) => {
	const arr = expression.split(/([^0-9.]+)/);

	return (
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
						disable ? { opacity: 1 } : { opacity: 0 },
					]}
				>
					{answer}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	expressionContainer: {
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
	},

	innerContainer: {
		padding: 20,
	},

	expression: {
		textAlign: "right",
		fontSize: 40,
		padding: 10,
		fontFamily: "Lora-Regular",
	},
});

export default MathExpression;
