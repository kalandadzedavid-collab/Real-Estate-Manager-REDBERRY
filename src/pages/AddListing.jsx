import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { getCities, getRegions } from "../api/apartments";
import { useMemo } from "react";

const AddListing = () => {
  const {
    data: regions,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  const {
    data: cities,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const schema = yup.object({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const region = watch("region_id");
  

const filteredCities = useMemo(() => {
    const selectedRegion = region !== "";

    if (selectedRegion) {
      return cities?.filter((city) => city.region_id == region);
    }

    return cities;
  }, [region, cities]);

  

  return (
    <>
      <div className="mt-15.5 flex flex-col items-center">
        <h2
          className="text-slate-900
text-3xl
font-medium"
        >
          ლისტინგის დამატება
        </h2>

        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
          })}
          className="w-197.5 mt-15.25"
        >
          <div>
            <h3
              className="text-zinc-900
text-base
font-medium mb-2"
            >
              გარიგების ტიპი
            </h3>
            <div className="flex gap-21">
              <label className="flex items-center gap-1.75" htmlFor="buy">
                <input
                  value={0}
                  id="buy"
                  {...register("is_rental")}
                  type="radio"
                />{" "}
                იყიდება
              </label>
              <label className="flex items-center gap-1.75" htmlFor="rent">
                <input
                  value={1}
                  id="buy"
                  {...register("is_rental")}
                  type="radio"
                />{" "}
                ქირავდება
              </label>
            </div>
          </div>

          <div className="mt-20">
            <h3
              className="text-zinc-900
text-base
font-medium mb-5.5"
            >
              მდებარეობა
            </h3>

            <div className="flex flex-wrap gap-5">
              <label htmlFor="address" className=" flex flex-col gap-1">
                მისამართი *{" "}
                <input
                  className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
                  id="address"
                  type="text"
                  {...register("address")}
                />
                <p className="flex gap-1.75">
                  <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
                  მინიმუმ ორი სიმბოლო
                </p>
              </label>

              <label htmlFor="zip-code" className=" flex flex-col gap-1">
                საფოსტო ინდექსი *{" "}
                <input
                  className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
                  id="zip-code"
                  type="text"
                  {...register("zip-code")}
                />
                <p className="flex gap-1.75">
                  <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
                  მხოლოდ რიცხვები
                </p>
              </label>

              <label className=" flex flex-col gap-1" htmlFor="region">
                რეგიონი
                <div className="relative w-96">
                  <select
                    id="region"
                    className=" appearance-none w-full h-10 px-2.5 pr-10 rounded-md outline-1 -outline-offset-1 outline-slate-500 bg-white"
                    {...register("region_id")}
                  >
                    <option value="">აირჩიე რეგიონი</option>
                    {regions?.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>

                  {/* Custom Arrow Icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </label>

              <label className="flex flex-col gap-1" htmlFor="city">
                ქალაქი
                <div className="relative w-96">
                  <select
                    id="city"
                    className="appearance-none w-full h-10 px-2.5 pr-10 rounded-md outline-1 -outline-offset-1 outline-slate-500 bg-white"
                    {...register("city_id")}
                  >
                    {filteredCities?.map((city) => {
                      return <option key={city.id}>{city.name}</option>;
                    })}
                  </select>

                  {/* Custom Arrow Icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    </>
  );
};

export default AddListing;
