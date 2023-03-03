import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import {
  CreateParkingSpace,
  createParkingSpaceSchema,
} from "~/validation/parkingSpacesValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePlacesWidget } from "react-google-autocomplete";
import { env } from "~/env.mjs";

const RegisterParkingPage: NextPage = () => {
  const { mutate } = api.parkingSpaces.registerParkingSpace.useMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateParkingSpace>({
    resolver: zodResolver(createParkingSpaceSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: CreateParkingSpace) => {
    mutate(data);
    reset();
  };

  const { ref: placesRef } = usePlacesWidget<HTMLInputElement>({
    apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      setValue("address", place?.formatted_address);
      setValue("latitude", place?.geometry?.location?.lat());
      setValue("longitude", place?.geometry?.location?.lng());
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "no" },
    },
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-20">
        <h1 className="my-10 text-2xl">Registrer din parkeringsplass!</h1>
        <form
          className="flex max-w-sm flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Navn på parkeringsplass"
            className="bg-slate-800"
            {...register("name", { required: true })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <input
            type="number"
            placeholder="Pris pr. time"
            className="bg-slate-800"
            {...register("price", { required: true })}
          />
          {errors.price && <p>{errors.price.message}</p>}
          <input
            type="text"
            ref={placesRef}
            placeholder="Addresse"
            className="bg-slate-800"
          />
          {errors.address && <p>{errors.address.message}</p>}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

// submit button styled with tailwind
const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="my-5 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    >
      Registrer
    </button>
  );
};

export default RegisterParkingPage;
