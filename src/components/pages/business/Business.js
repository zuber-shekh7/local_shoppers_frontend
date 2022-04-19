import React from "react";
import routes, { generateRoute } from "../../../utils/routes";
import { LinkButton } from "../../buttons";
import CategoryList from "./CategoryList";

const Business = (props) => {
  const { business } = props;

  return (
    <div>
      {business ? (
        <div className="flex justify-center ">
          <div className="flex-1 space-y-5">
            <img
              className="h-96 w-full object-top object-cover rounded-lg"
              src={business.photo.url}
              alt={business.name}
            />
            <div className="text-center">
              <h1>{business.name}</h1>
              <p>{business.description}</p>
              <p>&bull; {business.category.name} &bull;</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h2>Categories</h2>
                <LinkButton
                  to={generateRoute(routes.getCategories, {
                    ":businessId": business._id,
                  })}
                >
                  Explore
                </LinkButton>
              </div>
              <CategoryList
                categories={business.categories.slice(0, 3)}
                business={business}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h3>Business not available</h3>
        </div>
      )}
    </div>
  );
};

export default Business;
