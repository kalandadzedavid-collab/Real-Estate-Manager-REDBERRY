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
      <div className="flex-col gap-20 xl:flex-row flex justify-between items-center">
        <div>
          <h1>FILTER</h1>
        </div>
        <div className="flex gap-5">
          <Link to={`/add`}>
            <Button color="orange">+ ლისტინგის დამატება</Button>
          </Link>

          <Button handleClick={() => setIsOpen((prev) => !prev)} color="white">
            + აგენტის დამატება
          </Button>
        </div>
      </div>

      {isOpen && <AgentModal setIsOpen={setIsOpen} />}

      <section className="justify-center xl:justify-start flex flex-wrap gap-5 w-full mb-55 mt-19.25">
        {apartments?.map((apart) => (
          <ListingCard key={apart.id} data={apart} />
        ))}
      </section>
    </div>
  );
};

export default Home;
