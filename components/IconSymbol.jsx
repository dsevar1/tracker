import { Ionicons } from '@expo/vector-icons';

export function IconSymbol({ name, size = 24, color }) {
  return <Ionicons name={name} size={size} color={color} />;
}
