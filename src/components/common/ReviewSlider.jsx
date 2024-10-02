import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";
//import { Autoplay, Navigation, Pagination } from "swiper/modules";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      //console.log("LOgging response in rating", data.data);

      if (data?.success) {
        setReviews(data?.data);
      }

      //console.log("Printing Reviews", reviews);
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="text-white">
      <div className="h-[190px] max-w-maxContent mb-20">
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews?.map((review, index) => (
            <div>
              <SwiperSlide
                key={index}
                className="border-none pt-5 pb-5 pl-5 bg-richblack-800"
              >
                <div className="flex gap-3">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="Profile Pic"
                    className="h-9 w-9 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <p>
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-richblack-600">
                      {review?.user?.email}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-richblack-50">
                  <p className="text-richblack-25">{review?.course?.courseName}</p>
                  <p>{review?.review}</p>
                </div>
                <div className="flex items-center gap-2 text-lightblue-500">
                  <p>{review?.rating.toFixed(1)}</p>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#33A5FB"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
