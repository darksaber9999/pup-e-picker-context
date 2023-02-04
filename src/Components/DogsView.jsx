import React from "react";
import { useDogContext } from "../providers/DogProvider";
import { CreateDogForm } from "./CreateDogForm";
import { Dogs } from "./Dogs";
import { Section } from "./Section";

export const DogsView = () => {
  const { showComponent } = useDogContext();

  return (
    <Section label={"Dogs: "}>
      {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
        showComponent
      ) && <Dogs />}
      {showComponent === "create-dog-form" && <CreateDogForm />}
    </Section>
  );
};
