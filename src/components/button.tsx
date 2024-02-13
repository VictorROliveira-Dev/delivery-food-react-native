import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
};

type ButtonTextProps = {
  children: ReactNode;
};

type ButtonIconProps = {
  children: ReactNode;
};

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.6}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="text-slate-900 font-heading text-base mx-2">
      {children}
    </Text>
  );
}

function ButtoIcon({ children }: ButtonIconProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtoIcon;

export { Button }