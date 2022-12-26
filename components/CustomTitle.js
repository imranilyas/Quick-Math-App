import { View, Text, StyleSheet } from "react-native";

const CustomTitle = ({ children }) => {
	return (
		<View>
			<Text>Title: {children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default CustomTitle;
