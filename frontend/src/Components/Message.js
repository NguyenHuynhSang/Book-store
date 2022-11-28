import { Alert } from 'react-bootstrap';

const Message = (props) => {
  const variant = props.variant;
  return (
    <Alert variant={variant || 'info'} animation="border" role="status">
      {props.children}
    </Alert>
  );
};
export default Message;
