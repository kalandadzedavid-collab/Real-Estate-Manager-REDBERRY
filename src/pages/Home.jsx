import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <div>
      <Link to={`/add`}><Button color="orange">+ ლისტინგის დამატება</Button></Link>
      
      <Button color="white">+ აგენტის დამატება</Button>
      <Button color="gray">+ აგენტის დამატება</Button>

    </div>
  );
};

export default Home;
