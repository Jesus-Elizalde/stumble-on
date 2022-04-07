import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import RatingStar from "./RatingStar";

import { deleteOneReview } from "../../store/reviews";

const ReviewHolder = ({ setreviewmode, reviewmode, setreviewid }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const carId = pathname.split("/").at(-1);
  const getAllReviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.session.user);

  return (
    <div className="reviewconatinermodal">
      {Object.values(getAllReviews)
        .filter((ele) => ele.carId === +carId)
        .map((ele, i) => (
          <div key={i} className="reviewholdersingler">
            <div className="reviewholdersinglerheader">
              <div>
                <h3>{ele.rating}</h3>
                <RatingStar rating={ele.rating} />
              </div>
              {user?.id === ele.userId && (
                <div className="revieweditdel">
                  <button
                    onClick={() => {
                      setreviewmode(!reviewmode);

                      setreviewid(ele.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setreviewmode(true);
                      dispatch(deleteOneReview(ele.id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="reviewsinglebox">{ele.review}</p>
            <div>
              <p>by {ele.User?.username}</p>
              {ele.createdAt === ele.updatedAt ? (
                <p>{ele.createdAt} </p>
              ) : (
                <p>{ele.updatedAt} </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReviewHolder;
