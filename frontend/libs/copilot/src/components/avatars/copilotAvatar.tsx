import React, { useMemo } from 'react';
import { View, Image, Text, Pressable, StyleProp, ImageStyle, TextStyle } from 'react-native';
import { styles } from './copilotAvatar.styles';
import { Author, UserDTO } from '../../types/messages';

export const AvatarColors = {
  defaultColor: '#b2b2b2',
  backgroundTransparent: 'transparent',
  defaultBlue: '#0084ff',
  leftBubbleBackground: '#faf6f4',
  black: '#000',
  white: '#fff',
  carrot: '#e67e22',
  emerald: '#2ecc71',
  peterRiver: '#3498db',
  wisteria: '#8e44ad',
  alizarin: '#e74c3c',
  turquoise: '#1abc9c',
  midnightBlue: '#2c3e50',
  optionTintColor: '#007AFF',
  timeTextColor: '#aaa',
  borderColor: '#d8d8d6',
}

const {
  carrot,
  emerald,
  peterRiver,
  wisteria,
  alizarin,
  turquoise,
  midnightBlue,
} = AvatarColors;

export interface CopilotAvatarProps {
  user?: UserDTO;
  avatarStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?(props: unknown): void;
  onLongPress?(props: unknown): void;
}

const CopilotAvatar: React.FC<CopilotAvatarProps> = ({
  user,
  avatarStyle,
  textStyle,
  onPress,
  onLongPress,
}) => {
  const avatarName = useMemo(() => {
    const userName = (user && user.name) || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) {
      return `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      return `${name[0].charAt(0)}${name[1].charAt(0)}`;
    }
    return '';
  }, [user]);

  const avatarColor = useMemo(() => {
    const userName = (user && user.name) || '';
    let sumChars = 0;
    for (let i = 0; i < userName.length; i += 1) {
      sumChars += userName.charCodeAt(i);
    }

    const colors = [
      carrot,
      emerald,
      peterRiver,
      wisteria,
      alizarin,
      turquoise,
      midnightBlue,
    ];

    return colors[sumChars % colors.length];
  }, [user]);

  const renderAvatar = () => {
    if (user) {
      if (typeof user.avatar === 'function') {
        return user.avatar([styles.avatarStyle, avatarStyle]);
      } else if (typeof user.avatar === 'string') {
        return (
          <Image
            source={{ uri: user.avatar }}
            style={[styles.avatarStyle, avatarStyle]}
          />
        );
      } else if (typeof user.avatar === 'number') {
        return (
          <Image
            source={user.avatar}
            style={[styles.avatarStyle, avatarStyle]}
          />
        );
      } else if (user.id === Author.ASSISTANT) {
        return (
          <Image
            source={{ uri: './assets/images/digiAssistant.png' }}
            style={[styles.avatarStyle, avatarStyle]}
          />
        );
      }
    }
    return null;
  };

  const renderInitials = () => (
    <Text style={[styles.textStyle, textStyle]}>{avatarName}</Text>
  );

  if (!user || (!user.name && !user.avatar)) {
    // render placeholder
    return (
      <View
        style={[styles.avatarStyle, styles.avatarTransparent, avatarStyle]}
        accessibilityRole="image"
      />
    );
  }

  if (user.avatar) {
    return (
      <Pressable
        disabled={!onPress}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityRole="image"
      >
        {renderAvatar()}
      </Pressable>
    );
  }

  if (user.id === Author.ASSISTANT) {
    return (
      <Pressable
        disabled={!onPress}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityRole="image"
      >
        {renderAvatar()}
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.avatarStyle, { backgroundColor: avatarColor }, avatarStyle]}
      accessibilityRole="image"
    >
      {renderInitials()}
    </Pressable>
  );
};

CopilotAvatar.defaultProps = {
  user: {
    id: '',
    name: undefined,
    avatar: undefined,
  },
  onPress: undefined,
  onLongPress: undefined,
  avatarStyle: {},
  textStyle: {},
};

export default CopilotAvatar;
