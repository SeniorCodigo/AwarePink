import React from 'react';
import { Image, ImageStyle, ImageSourcePropType } from 'react-native';

interface IconSymbolProps {
  size: number;
  color: string;
  name: string;
}

export const IconSymbol: React.FC<IconSymbolProps> = ({ size, color, name }) => {
  let source: ImageSourcePropType;

  // Selecciona la imagen según el nombre que se pase
  switch (name) {
    case 'house.fill':
      source = require('@/assets/images/home.png');
      break;
    case 'paperplane.fill':
      source = require('@/assets/images/reminder.png');
      break;
    // Puedes agregar más casos para otros iconos
    case 'tips':
      source = require('@/assets/images/tips.png');
      break;
    // Puedes agregar más casos para otros iconos
    case 'resources':
      source = require('@/assets/images/resources.png');
      break;
    // Puedes agregar más casos para otros iconos
    default:
      source = require('@/assets/images/tips.png');
      break;
  }

  const style: ImageStyle = {
    width: size,
    height: size,
    tintColor: color, // Aplica el color dinámico
  };



  return <Image source={source} style={style} resizeMode="contain" />;
};
