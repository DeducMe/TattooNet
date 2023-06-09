import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';

export type IconPack =
  | 'Ionicons'
  | 'AntDesign'
  | 'FontAwesome'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'FontAwesome5'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'SimpleLineIcons'
  | 'Foundation';

export function getIcon(imageGroup: IconPack) {
  switch (imageGroup) {
    default:
    case 'Ionicons':
      return Ionicons;

    case 'AntDesign':
      return AntDesign;

    case 'FontAwesome':
      return FontAwesome;

    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;

    case 'MaterialIcons':
      return MaterialIcons;

    case 'FontAwesome5':
      return FontAwesome5;

    case 'Entypo':
      return Entypo;

    case 'EvilIcons':
      return EvilIcons;

    case 'Feather':
      return Feather;

    case 'SimpleLineIcons':
      return SimpleLineIcons;

    case 'Foundation':
      return Foundation;
  }
}
