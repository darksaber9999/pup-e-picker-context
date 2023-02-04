import { createContext, useContext, useEffect, useState } from "react";
import { addDogToDb } from "../fetch/add-dog";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../fetch/update-favorite";

const DogContext = createContext({});

export const DogProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then(setDogs);
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs()
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);

  const unfavoriteDogCount = unfavorited.length;
  const favoriteDogCount = favorited.length;

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <DogContext.Provider
      value={{
        showComponent,
        addDog,
        deleteDog,
        unfavoriteDog,
        favoriteDog,
        unfavorited,
        favorited,
        unfavoriteDogCount,
        favoriteDogCount,
        filteredDogs,
        onClickFavorited,
        onClickUnfavorited,
        onClickCreateDog,
      }}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = () => {
  const context = useContext(DogContext);
  return {
    showComponent: context.showComponent,
    addDog: context.addDog,
    deleteDog: context.deleteDog,
    unfavoriteDog: context.unfavoriteDog,
    favoriteDog: context.favoriteDog,
    unfavorited: context.unfavorited,
    favorited: context.favorited,
    unfavoriteDogCount: context.unfavoriteDogCount,
    favoriteDogCount: context.favoriteDogCount,
    filteredDogs: context.filteredDogs,
    onClickFavorited: context.onClickFavorited,
    onClickUnfavorited: context.onClickUnfavorited,
    onClickCreateDog: context.onClickCreateDog,
  };
};
