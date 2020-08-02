import React from 'react';

import { useFormikContext } from 'formik';

import CustomButton from '../../custom/CustomButton';

interface Props {
  textType: string;
  style?: {};
  textStyle?: {};
  text: string;
  color: string;
  name?: string;
  animation?: string;
  size?: number;
  fontSize: number;
  buttonWidth: string;
  onPress?: () => void;
}

const SubmitButton: React.FC<Props> = ({ buttonWidth, style, name, size, color, fontSize, textType, text, onPress }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <React.Fragment>
      <CustomButton
        buttonWidth={buttonWidth}
        style={style}
        name={name}
        size={size}
        color={color}
        fontSize={fontSize}
        textType={textType}
        text={text}
        onPress={handleSubmit}
      />
    </React.Fragment>
  );
};

export default SubmitButton;
