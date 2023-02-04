import { useDogContext } from "../providers/DogProvider";
import { DogCard } from "./DogCard";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const Dogs = () => {
  const { filteredDogs, deleteDog, unfavoriteDog, favoriteDog } =
    useDogContext();

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => deleteDog(dog.id)}
          onHeartClick={() => unfavoriteDog(dog.id)}
          onEmptyHeartClick={() => favoriteDog(dog.id)}
        />
      ))}
    </>
  );
};
