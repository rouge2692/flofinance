import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

function Home() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}
    >
      <Text>Home</Text>
    </View>
  );
}

export default Home;
