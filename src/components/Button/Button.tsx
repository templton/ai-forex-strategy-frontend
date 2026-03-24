import { Button as AntButton } from 'antd';
import type { ButtonProps } from './Button.types';

function Button(props: ButtonProps) {
  return <AntButton {...props} />;
}

export default Button;
