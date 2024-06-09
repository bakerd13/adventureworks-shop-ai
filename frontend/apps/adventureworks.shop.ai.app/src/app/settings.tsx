import { View} from "react-native";
import { SettingsPanel } from "@adventureworks/copilot";

const Library = () => {

  return (
    <View>
      <SettingsPanel onClose={() => console.log('HERE')}/>
    </View>
  )
}

export default Library;
