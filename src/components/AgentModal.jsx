import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createAgent } from "../api/apartments";
import Button from "./Button";

const AgentModal = ({ setIsOpen }) => {
  const schema = yup.object({
    name: yup
      .string()
      .required("აუცილებელია")
      .min(2, "მინიმუმ ორი სიმბოლო")
      .matches(/^[a-zA-Z\s]+$/, "მხოლოდ ქართული ასოები"),
    surname: yup
      .string()
      .required("აუცილებელია")
      .min(2, "მინიმუმ ორი სიმბოლო")
      .matches(/^[a-zA-Z\s]+$/, "მხოლოდ ქართული ასოები"),
    email: yup
      .string()
      .required("აუცილებელია")
      .matches(/@redberry\.ge$/, "გამოიყენეთ @redberry.ge ფოსტა"),
    phone: yup
      .string()
      .required("აუცილებელია")
      .matches(/^5\d{8}$/, "უნდა დაიწყოს 5-ით და შედგებოდეს 9 ციფრისგან"),
    avatar: yup.mixed().test("required", "აუცილებელია", (value) => {
      return value && value.length > 0;
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addAgent = useMutation({
    mutationFn: (data) => createAgent(data),
  });

  const imageFile = watch("avatar");

  return (
    <div className="absolute left-0 top-0 w-full h-screen z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="px-26.25 py-21.75 w-252.25 h-196 bg-white rounded-[10px] shadow-[5px_5px_4px_0px_rgba(0,0,0,0.08)]">
        <h3
          className="text-slate-900 text-center mb-15.25
text-3xl
font-medium"
        >
          აგენტის დამატება
        </h3>

        <form
          className="flex flex-wrap gap-7.75 mb-22.75"
          onSubmit={handleSubmit((data) => {
            // create form data to solve image upload
            const formData = new FormData();

            // append object fields in form data object
            formData.append("name", data.name);
            formData.append("surname", data.surname);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("avatar", data.avatar[0]);

            // post correct formatted data in api
            addAgent.mutate(formData, {
              onSuccess: () => {
                reset();
                setIsOpen((prev) => !prev);
              },
              onError: (err) => {
                console.error("Mutation error:", err);
              },
            });
          })}
          noValidate
        >
          <label
            htmlFor="name"
            className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
          >
            სახელი *{" "}
            <input
              className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
              id="name"
              type="text"
              {...register("name")}
            />
            <p className="flex gap-1.75">
              <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
              მინიმუმ ორი სიმბოლო
            </p>
            {errors?.name && (
              <p className="text-red-500 text-sm">{errors?.name.message}</p>
            )}
          </label>

          <label
            htmlFor="surname"
            className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
          >
            გვარი *{" "}
            <input
              className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
              id="surname"
              type="text"
              {...register("surname")}
            />
            <p className="flex gap-1.75">
              <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
              მინიმუმ ორი სიმბოლო
            </p>
            {errors?.surname && (
              <p className="text-red-500 text-sm">{errors?.surname.message}</p>
            )}
          </label>

          <label
            htmlFor="email"
            className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
          >
            ელ-ფოსტა *{" "}
            <input
              className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
              id="email"
              type="text"
              {...register("email")}
            />
            <p className="flex gap-1.75">
              <img className="w-2.5" src="/Vector.svg" alt="checkmark" />{" "}
              გამოიყენეთ @redberry.ge ფოსტა
            </p>
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </label>

          <label
            htmlFor="phone"
            className="text-slate-900
text-sm
font-medium flex flex-col gap-1"
          >
            ტელეფონის ნომერი *{" "}
            <input
              className="w-96 h-10 p-2.5 rounded-md outline-1 -outline-offset-1 outline-slate-500"
              id="phone"
              type="text"
              {...register("phone")}
            />
            <p className="flex gap-1.75">
              <img className="w-2.5" src="/Vector.svg" alt="checkmark" /> მხოლოდ
              რიცხვები
            </p>
            {errors?.phone && (
              <p className="text-red-500 text-sm">{errors?.phone.message}</p>
            )}
          </label>

          <label
            htmlFor="avatar"
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
                id="avatar"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("avatar")}
              />
            </div>
            {errors?.avatar && (
              <p className="text-red-500 text-sm">{errors?.avatar.message}</p>
            )}
          </label>

          <div className="w-full flex gap-3.75 justify-end">
            <Button
              handleClick={() => setIsOpen((prev) => !prev)}
              color="white"
              submit="button"
            >
              გაუქმება
            </Button>
            <Button submit="submit" color="orange">
              დაამატე აგენტი
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentModal;
