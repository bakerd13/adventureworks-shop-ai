import { View } from 'react-native';
import { styles } from './home.styles';
import InpsirationBlock from './blocks/inspirationBlock';

const Home = () => {

  return (
    <View style={styles.container}>
      <InpsirationBlock />
    </View>
  );
};

export default Home;
