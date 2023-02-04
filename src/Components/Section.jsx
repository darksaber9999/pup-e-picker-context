import { useDogContext } from "../providers/DogProvider";

export const Section = ({
  label, // do not delete
  children, // do not delete
}) => {
  const {
    onClickFavorited,
    onClickUnfavorited,
    onClickCreateDog,
    showComponent,
    favoriteDogCount,
    unfavoriteDogCount,
  } = useDogContext();

  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              showComponent === "favorite-dogs" && "active"
            }`}
            onClick={onClickFavorited}>
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              showComponent === "unfavorite-dogs" && "active"
            }`}
            onClick={onClickUnfavorited}>
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${
              showComponent === "create-dog-form" && "active"
            }`}
            onClick={onClickCreateDog}>
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
