import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createApartment, getCities, getRegions } from "../api/apartments";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const AddListing = () => {
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const addListing = useMutation({
    mutationFn: (data) => createApartment(data),
  });

  const schema = yup.object({});
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { is_rental: "0" },
  });

  const region = watch("region_id");

  const city = watch("city_id");

  const imageFile = watch("image");

  useEffect(() => {
    if (city) {
      const selectedcity = cities?.find((item) => item.id == city);
      if (selectedcity) {
        setValue("region_id", selectedcity.region_id);
      }
    }
  }, [city, cities, setValue]);

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
            const formData = new FormData();

            formData.append("region_id", +data.region_id);
            formData.append("city_id ", +data.city_id);
            formData.append("price ", +data.price);
            formData.append("address ", data.address);
            formData.append("zip_code ", data.zip_code);
            formData.append("description ", data.description);
            formData.append("area ", +data.area);
            formData.append("bedrooms ", +data.bedrooms);
            formData.append("is_rental ", +data.is_rental);
            formData.append("agent_id ", +data.agent_id);
            formData.append("image ", data.image[0]);

            addListing.mutate(formData);
            reset();
          })}
          className="w-197.5 mt-15.25 mb-21.75"
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
                  id="rent"
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
              <label
                htmlFor="address"
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
              >
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

              <label
                htmlFor="zip-code"
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
              >
                საფოსტო ინდექსი *{" "}
                <input
                  className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
                  id="zip-code"
                  type="text"
                  {...register("zip_code")}
                />
                <p className="flex gap-1.75">
                  <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
                  მხოლოდ რიცხვები
                </p>
              </label>

              <label
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
                htmlFor="region"
              >
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

              <label
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
                htmlFor="city"
              >
                ქალაქი
                <div className="relative w-96">
                  <select
                    id="city"
                    className="appearance-none w-full h-10 px-2.5 pr-10 rounded-md outline-1 -outline-offset-1 outline-slate-500 bg-white"
                    {...register("city_id")}
                  >
                    <option value="">აირჩიე ქალაქი</option>
                    {filteredCities?.map((city) => {
                      return (
                        <option value={city.id} key={city.id}>
                          {city.name}
                        </option>
                      );
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

          <div className="mt-25">
            <h3
              className="mb-5.5 text-zinc-900
text-base
font-medium"
            >
              ბინის დეტალები
            </h3>

            <div className="flex flex-wrap gap-5">
              <label
                htmlFor="price"
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
              >
                ფასი{" "}
                <input
                  className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
                  id="price"
                  type="text"
                  {...register("price")}
                />
                <p className="flex gap-1.75">
                  <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
                  მხოლოდ რიცხვები
                </p>
              </label>

              <label
                htmlFor="area"
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
              >
                ფართობი{" "}
                <input
                  className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
                  id="area"
                  type="text"
                  {...register("area")}
                />
                <p className="flex gap-1.75">
                  <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
                  მხოლოდ რიცხვები
                </p>
              </label>

              <label
                htmlFor="bedrooms"
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
              >
                საძინებლების რაოდენობა*{" "}
                <input
                  className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
                  id="bedrooms"
                  type="text"
                  {...register("bedrooms")}
                />
                <p className="flex gap-1.75">
                  <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
                  მხოლოდ რიცხვები
                </p>
              </label>

              <label
                htmlFor="description"
                className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
              >
                აღწერა *{" "}
                <textarea
                  className="w-197.5 h-28.75 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500 resize-none"
                  id="description"
                  {...register("description")}
                />
                <p className="flex gap-1.75">
                  <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
                  მინიმუმ ხუთი სიტყვა
                </p>
              </label>

              <label
                htmlFor="image"
                className="text-slate-900 text-sm font-medium flex flex-col gap-1 w-197.5"
              >
                ატვირთეთ ფოტო *
                <div className="relative w-full h-28.75 flex items-center justify-center border border-dashed border-slate-500 rounded-md bg-white cursor-pointer overflow-hidden hover:bg-slate-50 transition-colors">
                  {/* If image exists and has at least one file, show preview */}
                  {imageFile && imageFile[0] ? (
                    <img
                      src={URL.createObjectURL(imageFile[0])}
                      alt="uploaded preview"
                      className="h-full"
                    />
                  ) : (
                    /* Otherwise, show the Plus Icon Circle */
                    <div className="flex items-center justify-center w-8 h-8 border border-slate-600 rounded-full">
                      <span className="text-slate-600">+</span>
                    </div>
                  )}

                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register("image")}
                  />
                </div>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="agent_id">აირჩიე აგენტი</label>
            <input id="agent_id" type="text" {...register("agent_id")} />
          </div>

          <div className="flex w-full justify-end mt-22.5 gap-3.75">
            <Link to="/">
              <Button color="white">გაუქმება</Button>
            </Link>
            <Button submit={"submit"} color="orange">
              დაამატე ლისტინგი
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddListing;
