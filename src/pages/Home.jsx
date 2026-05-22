import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { getApartments, getRegions } from "../api/apartments";
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

  function handleFilters(id) {
    if (id == filterOpen) {
      setFitlerOpen(false);
    } else {
      setFitlerOpen(id);
    }
  }

  const { register, handleSubmit } = useForm();

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState({ min: null, max: null });

const filteredAppartments = useMemo(() => {
  const isSelected = selectedRegions.length > 0;
  
  // Use a helper to check if a value is "empty" (null, undefined, or empty string)
  const isMinSet = selectedPrice.min !== null && selectedPrice.min !== "";
  const isMaxSet = selectedPrice.max !== null && selectedPrice.max !== "";
  const isPriceSelected = isMinSet || isMaxSet;

  if (isSelected || isPriceSelected) {
    return apartments?.filter((apartment) => {
      // Region Match Logic
      const matchesRegion = !isSelected || selectedRegions.includes(apartment?.city?.region_id?.toString());

      // Price Match Logic: Only check min/max if they are actually set
      const matchesMin = !isMinSet || apartment.price >= Number(selectedPrice.min);
      const matchesMax = !isMaxSet || apartment.price <= Number(selectedPrice.max);

      return matchesRegion && matchesMin && matchesMax;
    });
  }

  // If no filters are active, return everything
  return apartments;
}, [selectedRegions, selectedPrice, apartments]);

  return (
    <div>
      <div className="flex-col gap-5 xl:flex-row flex justify-between items-center">
        <div>
          <form
            onSubmit={handleSubmit((data) => {
              data.regions && setSelectedRegions(data.regions);
              
              data.minPrice &&
                setSelectedPrice((prev) => ({ ...prev, min: data.minPrice }));
              data.maxPrice &&
                setSelectedPrice((prev) => ({ ...prev, max: data.maxPrice }));

              setFitlerOpen(false);
            })}
          >
            <div className="flex items-center gap-3 px-5 py-1.5 rounded-2xl border border-[#DBDBDB]">
              <button
                onClick={() => handleFilters(1)}
                type="button"
                className={`${
                  filterOpen == 1 && "bg-[#F3F3F3]"
                } relative py-2 px-3.5 rounded-[10px]  flex gap-1 items-center`}
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

              <button
                onClick={() => handleFilters(2)}
                type="button"
                className={`${
                  filterOpen == 2 && "bg-[#F3F3F3]"
                } relative py-2 px-3.5 rounded-[10px]  flex gap-1 items-center`}
              >
                საფასო კატეგორია{" "}
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
            </div>

            {filterOpen == 1 && (
              <div className="mt-5 p-6 xl:w-140 2xl:w-170.75 2xl:h-59 rounded-[10px] shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)] outline outline-1 outline-offset-[-1px] outline-zinc-300">
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

                <Button submit={"submit"} color={"orange"}>
                  არჩევა
                </Button>
              </div>
            )}

            {filterOpen == 2 && (
              <div className="mt-5 p-6 xl:w-[384px] 2xl:w-[384px] 2xl:h-59 rounded-[10px] shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)] outline outline-1 outline-offset-[-1px] outline-zinc-300">
                <h5
                  className="text-slate-900
text-base
font-medium mb-6"
                >
                  ფასის მიხედვით
                </h5>
                <div className="flex flex-col items-end">
                  <div className="flex justify-between mb-5 ">
                    <label
                      className="border border-slate-500 rounded-2xl p-2.5 w-[47%] justify-between flex items-center"
                      htmlFor="minPrice"
                    >
                      <input
                        className="outline-0 w-[80%]"
                        placeholder="დან"
                        id="minPrice"
                        type="text"
                        {...register("minPrice")}
                      />
                      ₾
                    </label>

                    <label
                      className="border border-slate-500 rounded-2xl p-2.5 w-[47%] justify-between flex items-center"
                      htmlFor="maxPrice"
                    >
                      <input
                        className="outline-0 w-[80%]"
                        placeholder="მდე"
                        id="maxPrice"
                        type="text"
                        {...register("maxPrice")}
                      />
                      ₾
                    </label>
                  </div>
                  <Button submit={"submit"} color={"orange"}>
                    არჩევა
                  </Button>
                </div>
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
