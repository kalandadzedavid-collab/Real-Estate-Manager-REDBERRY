import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { getAgents, getApartments, getRegions } from "../api/apartments";
import AgentModal from "../components/AgentModal";
import { useMemo, useState } from "react";
import ListingCard from "../components/ListingCard";
import { useForm } from "react-hook-form";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: apartments } = useQuery({
    queryKey: ["apartments"],
    queryFn: getApartments,
  });

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  const [filterOpen, setFitlerOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const [selectedRegions, setSelectedRegions] = useState([]);

  const filteredAppartments = useMemo(() => {
    let isSelected = selectedRegions.length > 0;

    if (isSelected) {
      return apartments?.filter((app) =>
        selectedRegions.includes(app?.city?.region_id.toString())
      );
    }

    return apartments;
  }, [selectedRegions, apartments]);

  return (
    <div>
      <div className="flex-col gap-5 xl:flex-row flex justify-between items-center">
        <div>
          <form
            onSubmit={handleSubmit((data) => {
              setSelectedRegions(data.regions);
              setFitlerOpen(false)
            })}
          >
            <button
              onClick={() => setFitlerOpen((prev) => !prev)}
              type="button"
              className="relative py-2 px-3.5 rounded-[10px] outline -outline-offset-1 outline-zinc-300 flex gap-1 items-center"
            >
              რეგიონი{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3.91247 4.83785C3.68466 4.61004 3.31532 4.61004 3.08751 4.83785C2.85971 5.06565 2.85971 5.435 3.08751 5.6628L6.58751 9.1628C6.81532 9.39061 7.18466 9.39061 7.41247 9.1628L10.9125 5.6628C11.1403 5.435 11.1403 5.06565 10.9125 4.83785C10.6847 4.61004 10.3153 4.61004 10.0875 4.83785L6.99999 7.92537L3.91247 4.83785Z"
                  fill="#021526"
                />
              </svg>
            </button>
            {filterOpen && (
              <div className="mt-5 p-[24px] xl:w-140 2xl:w-170.75 2xl:h-59 rounded-[10px] shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)] outline outline-1 outline-offset-[-1px] outline-zinc-300">
                <h5
                  className="text-slate-900
text-base
font-medium mb-6"
                >
                  რეგიონის მიხედვით
                </h5>
                <div className="flex flex-wrap gap-y-2 gap-x-5 mb-5">
                  {regions?.map((region) => {
                    return (
                      <label
                        key={region.id}
                        className="flex gap-3 items-center cursor-pointer group"
                        htmlFor={region.name}
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            id={region.name}
                            value={region.id}
                            {...register("regions")}
                            className="
        peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md 
        checked:bg-[#4CAF50] checked:border-[#4CAF50] 
        transition-all duration-200
      "
                          />
                          {/* This SVG creates the white checkmark inside the green box */}
                          <svg
                            className="absolute w-4 h-4 text-white hidden peer-checked:block pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className=" text-[#001D35] text-sm font-medium">
                          {region.name}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <Button  submit={"submit"} color={"orange"}>
                  არჩევა
                </Button>
              </div>
            )}
          </form>
        </div>
        <div className={`${filterOpen && "self-start"} flex gap-5`}>
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
        {filteredAppartments?.length > 0 ? (
          filteredAppartments?.map((apart) => (
            <ListingCard key={apart.id} data={apart} />
          ))
        ) : (
          <h6
            className="text-slate-900/80
text-xl
font-normal"
          >
            აღნიშნული მონაცემებით განცხადება არ იძებნება
          </h6>
        )}
      </section>
    </div>
  );
};

export default Home;
