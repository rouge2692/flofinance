import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// UI Components
import { View, Text } from 'react-native';

// Components
import SavingsHealthCard from '../components/test';

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
      <SavingsHealthCard />
    </View>
  );
}

export default Home;
