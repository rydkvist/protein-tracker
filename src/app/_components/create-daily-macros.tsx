"use client";
import { api } from "@/trpc/react";
import { RouterInputs, RouterOutputs } from "@/trpc/shared";
import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";

type CreateMacrosInput = RouterInputs["macros"]["create"];
type UpdateMacrosInput = RouterInputs["macros"]["update"];
type FormMacros = Omit<CreateMacrosInput, "calories">;

type GetMacrosOutput = RouterOutputs["macros"]["getAllMacros"][number];

type Props = {
  initialData: GetMacrosOutput | null;
};

const composeFormData = (data: GetMacrosOutput | null): FormMacros => {
  if (!data) {
    return {
      name: new Date().toLocaleDateString(),
      proteins: 0,
      carbs: 0,
      fats: 0,
    };
  }

  return {
    name: data.name,
    proteins: data.proteins,
    carbs: data.carbs,
    fats: data.fats,
  };
};

export function CreateDailyMacros({ initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormMacros>(composeFormData(initialData));

  const calories = useMemo(() => {
    return form.proteins * 4 + form.carbs * 4 + form.fats * 9;
  }, [form]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.name) return console.error("No name on input");

    const name = e.target.name as keyof typeof form;
    setForm({
      ...form,
      [name]: name === "name" ? e.target.value : parseInt(e.target.value),
    });
  };

  const createMacros = api.macros.create.useMutation({
    onSuccess: (data) => {
      router.refresh();
      setForm(composeFormData(data));
    },
  });

  const updateMacros = api.macros.update.useMutation({
    onSuccess: (data) => {
      router.refresh();
      setForm(composeFormData(data));
    },
  });

  function postMacros() {
    if (initialData?.id) {
      updateMacros.mutate({
        id: initialData.id,
        ...form,
        calories,
      });
    } else {
      createMacros.mutate({ ...form, calories });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        postMacros();
      }}
      className="flex flex-col gap-2"
    >
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label className="text-lg" htmlFor={key}>
            {key}
          </label>
          <input
            key={key}
            type={key === "name" ? "text" : "number"}
            placeholder={key}
            name={key}
            value={form[key as keyof typeof form]}
            onChange={onChange}
            className="w-full rounded-full px-4 py-2 text-black"
          />
        </div>
      ))}

      <p className="text-center text-2xl">Total Calories: {calories}</p>
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createMacros.isLoading}
      >
        {createMacros.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
