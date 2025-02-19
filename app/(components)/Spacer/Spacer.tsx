import { View } from "react-native";

interface SpacerProps {
  w?: any;
  h?: any;
}

const Spacer = ({ w, h }: SpacerProps) => {
  return (
    <View style={{ width: w ?? 0, height: h ?? 0 }} />
  );
}

export default Spacer;