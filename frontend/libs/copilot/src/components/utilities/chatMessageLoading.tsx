import SkeletonLoading from 'expo-skeleton-loading'
import { View } from 'react-native';

export const ChatMessageLoading = () => {
  return (
      <SkeletonLoading background={'#adadad'} highlight={'#ffffff'}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <View
              style={{
                backgroundColor: '#adadad',
                width: '50%',
                height: 10,
                marginBottom: 3,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                backgroundColor: '#adadad',
                width: '20%',
                height: 8,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                backgroundColor: '#adadad',
                width: '15%',
                height: 8,
                borderRadius: 5,
                marginTop: 3,
              }}
            />
          </View>
        </View>
      </SkeletonLoading>
  );
};
