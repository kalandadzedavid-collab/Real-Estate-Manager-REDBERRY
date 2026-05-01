import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { getApartments } from "../api/apartments";

const Home = () => {

  

  const {data: apartments} = useQuery({
    queryKey: ["apartments"],
    queryFn: getApartments
  })
  
  console.log(apartments)

  return (
    <div>
      <Link to={`/add`}><Button color="orange">+ ლისტინგის დამატება</Button></Link>
      
      <Button color="white">+ აგენტის დამატება</Button>
      <Button color="gray">+ აგენტის დამატება</Button>

    </div>
  );
};

export default Home;
