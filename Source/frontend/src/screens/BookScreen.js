import { parsePath, useParams } from 'react-router-dom';

function BookScreen() {
  const urlParam = useParams();
  const { slug } = urlParam;

  return <div> {slug}</div>;
}
export default BookScreen;
