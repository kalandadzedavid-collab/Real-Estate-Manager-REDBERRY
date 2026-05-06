import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { getAgents, getApartments } from "../api/apartments";
import AgentModal from "../components/AgentModal";
import { useState } from "react";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: apartments } = useQuery({
    queryKey: ["apartments"],
    queryFn: getApartments,
  });

  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  console.log(apartments);
  console.log(agents);

  return (
    <div>
      <Link to={`/add`}>
        <Button color="orange">+ ლისტინგის დამატება</Button>
      </Link>

      <Button handleClick={() => setIsOpen((prev) => !prev)} color="white">
        + აგენტის დამატება
      </Button>
      <Button color="gray">+ აგენტის დამატება</Button>
      {isOpen && <AgentModal setIsOpen={setIsOpen} />}

      <section className="flex flex-wrap gap-5 w-full justify-center">
       {apartments?.map((apart) => <ListingCard key={apart.id} data={apart} />)}
      </section>
    </div>
  );
};

export default Home;
