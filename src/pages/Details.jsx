import { Link, useParams } from "react-router-dom";
import { getApartment, getApartments } from "../api/apartments";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Button";
import DelModal from "../components/DelModal";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Details = () => {
  const [isModal, setIsModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: appart } = useQuery({
    queryKey: ["appartment", id],
    queryFn: () => getApartment(id),
  });

  let appartCity = appart?.city?.name;
  let appartId = appart?.id;

  const { data: apartments } = useQuery({
    queryKey: ["apartments"],
    queryFn: getApartments,
  });

  console.log(appart);

  return (
    <div>
      <div className=" w-10">
        <Link to={`/`}>
          <svg
            className="mb-8.5"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M11.6095 20.9425C11.0888 21.4632 10.2446 21.4632 9.72387 20.9425L0.390534 11.6091C-0.130166 11.0885 -0.130166 10.2442 0.390534 9.72353L9.72387 0.390198C10.2446 -0.130501 11.0888 -0.130501 11.6095 0.390198C12.1302 0.910897 12.1302 1.75512 11.6095 2.27582L4.55229 9.33301H20C20.7364 9.33301 21.3333 9.92996 21.3333 10.6663C21.3333 11.4027 20.7364 11.9997 20 11.9997H4.55229L11.6095 19.0569C12.1302 19.5776 12.1302 20.4218 11.6095 20.9425Z"
              fill="#021526"
            />
          </svg>
        </Link>
      </div>

      <section className="flex items-center gap-22 mb-25">
        <div
          style={{ backgroundImage: `url(${appart?.image})` }}
          className={`flex justify-end items-end relative rounded-2xl bg-cover bg-center w-209.75 h-167.5 `}
        >
          <button
            className="py-1.5 absolute left-5.75 top-5.75 w-24 bg-slate-900/50 rounded-2xl text-white
text-xs
font-medium"
          >
            {appart?.is_rental == 0 ? "იყიდება" : "ქირავდება"}{" "}
          </button>
          <p
            className="-mb-6.25 text-slate-500
text-base
font-normal"
          >
            გამოქვეყნების თარიღი:{" "}
            {appart?.created_at
              ?.split("T")[0]
              ?.split("-")
              ?.reverse()
              ?.join(".")}
          </p>
        </div>
        <div>
          <div>
            <p
              className="text-slate-900
text-5xl
font-bold mb-6"
            >
              {appart?.price.toLocaleString("fr-FR")} ₾
            </p>
            <div
              className="text-slate-500
text-2xl
font-normal"
            >
              <p className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.55527 4.45547C8.5623 1.44844 13.4377 1.44844 16.4447 4.45547C19.4517 7.46251 19.4517 12.3379 16.4447 15.3449L11 20.7896L5.55527 15.3449C2.54823 12.3379 2.54823 7.46251 5.55527 4.45547ZM11 12.1002C12.215 12.1002 13.2 11.1152 13.2 9.9002C13.2 8.68517 12.215 7.7002 11 7.7002C9.78496 7.7002 8.79999 8.68517 8.79999 9.9002C8.79999 11.1152 9.78496 12.1002 11 12.1002Z"
                    fill="#808A93"
                  />
                </svg>
                {appart?.city?.name}, {appart?.address}
              </p>
              <p className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <rect width="22" height="22" fill="white" />
                  <path
                    d="M3 17.1111C3 17.6121 3.19901 18.0925 3.55324 18.4468C3.90748 18.801 4.38792 19 4.88889 19H18.1111C18.6121 19 19.0925 18.801 19.4468 18.4468C19.801 18.0925 20 17.6121 20 17.1111V3.88889C20 3.38792 19.801 2.90748 19.4468 2.55324C19.0925 2.19901 18.6121 2 18.1111 2H4.88889C4.38792 2 3.90748 2.19901 3.55324 2.55324C3.19901 2.90748 3 3.38792 3 3.88889V17.1111ZM11.5 4.83333H17.1667V10.5H15.2778V6.72222H11.5V4.83333ZM5.83333 10.5H7.72222V14.2778H11.5V16.1667H5.83333V10.5Z"
                    fill="#808A93"
                  />
                </svg>
                ფართი {appart?.area}{" "}
                <span>
                  მ<sup>2</sup>
                </span>
              </p>

              <p className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M18.5625 9.91289C18.1291 9.72263 17.6608 9.62459 17.1875 9.625H4.8125C4.3392 9.62454 3.87097 9.72243 3.4375 9.91246C2.82485 10.1804 2.30353 10.621 1.93724 11.1804C1.57096 11.7398 1.37559 12.3938 1.375 13.0625V17.875C1.375 18.0573 1.44743 18.2322 1.57636 18.3611C1.7053 18.4901 1.88016 18.5625 2.0625 18.5625C2.24484 18.5625 2.4197 18.4901 2.54864 18.3611C2.67757 18.2322 2.75 18.0573 2.75 17.875V17.5313C2.75111 17.4404 2.78769 17.3536 2.85191 17.2894C2.91614 17.2252 3.00293 17.1886 3.09375 17.1875H18.9062C18.9971 17.1886 19.0839 17.2252 19.1481 17.2894C19.2123 17.3536 19.2489 17.4404 19.25 17.5313V17.875C19.25 18.0573 19.3224 18.2322 19.4514 18.3611C19.5803 18.4901 19.7552 18.5625 19.9375 18.5625C20.1198 18.5625 20.2947 18.4901 20.4236 18.3611C20.5526 18.2322 20.625 18.0573 20.625 17.875V13.0625C20.6243 12.3939 20.4289 11.74 20.0626 11.1806C19.6964 10.6213 19.1751 10.1808 18.5625 9.91289Z"
                    fill="#808A93"
                  />
                  <path
                    d="M16.1562 3.4375H5.84375C5.20557 3.4375 4.59353 3.69102 4.14227 4.14227C3.69102 4.59353 3.4375 5.20557 3.4375 5.84375V8.9375C3.43752 8.96413 3.44373 8.9904 3.45564 9.01422C3.46755 9.03805 3.48483 9.05878 3.50612 9.07478C3.52741 9.09078 3.55213 9.10161 3.57833 9.10642C3.60453 9.11123 3.63148 9.10989 3.65707 9.1025C4.03238 8.99273 4.42146 8.93717 4.8125 8.9375H4.99426C5.03668 8.93777 5.07771 8.92234 5.10944 8.89418C5.14117 8.86602 5.16136 8.82712 5.16613 8.78496C5.20363 8.44903 5.36356 8.13868 5.61537 7.91318C5.86718 7.68768 6.19323 7.56284 6.53125 7.5625H8.9375C9.27574 7.56253 9.60211 7.68722 9.85419 7.91275C10.1063 8.13828 10.2664 8.44881 10.3039 8.78496C10.3087 8.82712 10.3289 8.86602 10.3606 8.89418C10.3923 8.92234 10.4334 8.93777 10.4758 8.9375H11.5268C11.5692 8.93777 11.6102 8.92234 11.642 8.89418C11.6737 8.86602 11.6939 8.82712 11.6987 8.78496C11.7361 8.44925 11.8959 8.13908 12.1474 7.91361C12.399 7.68814 12.7247 7.56316 13.0625 7.5625H15.4688C15.807 7.56253 16.1334 7.68722 16.3854 7.91275C16.6375 8.13828 16.7976 8.44881 16.8352 8.78496C16.8399 8.82712 16.8601 8.86602 16.8919 8.89418C16.9236 8.92234 16.9646 8.93777 17.007 8.9375H17.1875C17.5786 8.93731 17.9676 8.99302 18.3429 9.10293C18.3686 9.11033 18.3955 9.11167 18.4218 9.10683C18.448 9.102 18.4727 9.09113 18.4941 9.07508C18.5154 9.05903 18.5326 9.03824 18.5445 9.01436C18.5564 8.99049 18.5625 8.96417 18.5625 8.9375V5.84375C18.5625 5.20557 18.309 4.59353 17.8577 4.14227C17.4065 3.69102 16.7944 3.4375 16.1562 3.4375Z"
                    fill="#808A93"
                  />
                </svg>
                საძინებელი {appart?.bedrooms}
              </p>

              <p className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                >
                  <path
                    d="M7.89431 0.394496C7.65904 0.64712 7.52683 0.989776 7.52676 1.34709V4.83142H1.25446C0.921756 4.83142 0.602679 4.97338 0.367423 5.22606C0.132166 5.47874 0 5.82146 0 6.1788V11.5683C0 11.9257 0.132166 12.2684 0.367423 12.5211C0.602679 12.7738 0.921756 12.9157 1.25446 12.9157H7.52676V21H10.0357V12.9157H14.4664C14.6503 12.9156 14.8319 12.8722 14.9984 12.7883C15.1649 12.7045 15.3122 12.5824 15.4298 12.4307L17.8547 9.30473C17.9486 9.18368 18 9.03111 18 8.87357C18 8.71602 17.9486 8.56346 17.8547 8.4424L15.4298 5.31648C15.3122 5.16473 15.1649 5.04263 14.9984 4.95881C14.8319 4.87498 14.6503 4.8315 14.4664 4.83142H10.0357V1.34709C10.0356 1.08065 9.96202 0.820203 9.82417 0.59868C9.68633 0.377157 9.49043 0.204504 9.26124 0.102548C9.03205 0.000591374 8.77986 -0.0260908 8.53656 0.0258744C8.29325 0.0778397 8.06975 0.206119 7.89431 0.394496Z"
                    fill="#021526"
                    fillOpacity="0.5"
                  />
                </svg>
                საფოსტო ინდექსი {appart?.zip_code}
              </p>
            </div>
          </div>
          <p
            className="w-125.75 my-10 text-slate-500
text-base
font-normal leading-6"
          >
            {appart?.description}
          </p>
          <div className="mb-5 w-125.75 py-5 px-4 rounded-lg outline -outline-offset-1 outline-zinc-300">
            <div className="mb-4 flex items-center gap-3.5">
              <img
                className="w-16 h-16 rounded-[100px]"
                src={appart?.agent?.avatar}
                alt=""
              />
              <p
                className="flex flex-col text-slate-900
text-base
font-normal"
              >
                {appart?.agent?.name} {appart?.agent?.surname}{" "}
                <span
                  className="text-zinc-500
text-sm
font-normal"
                >
                  აგენტი
                </span>
              </p>
            </div>
            <p
              className="text-slate-500
text-sm
font-normal mb-1 flex gap-1 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="13"
                viewBox="0 0 16 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.84341e-05 2.15414C-1.95112e-05 2.16127 -3.14003e-05 2.16839 6.24258e-05 2.17551V10.8333C6.24258e-05 12.0266 0.980211 13 2.18186 13H13.8181C15.0198 13 15.9999 12.0266 15.9999 10.8333V2.1756C16 2.16841 16 2.16122 15.9999 2.15404C15.993 0.966489 15.0155 0 13.8181 0H2.18186C0.984418 0 0.00692812 0.966547 9.84341e-05 2.15414ZM1.53211 1.84452C1.65238 1.60833 1.89971 1.44444 2.18186 1.44444H13.8181C14.1003 1.44444 14.3476 1.60833 14.4679 1.84452L8 6.34064L1.53211 1.84452ZM14.5454 3.55381V10.8333C14.5454 11.2289 14.2165 11.5556 13.8181 11.5556H2.18186C1.78353 11.5556 1.4546 11.2289 1.4546 10.8333V3.55381L7.58294 7.81389C7.83335 7.98796 8.16665 7.98796 8.41706 7.81389L14.5454 3.55381Z"
                  fill="#808A93"
                />
              </svg>{" "}
              {appart?.agent?.email}
            </p>
            <p
              className="text-slate-500
text-sm
font-normal flex gap-1 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M8.83632 3.25C9.44678 3.3691 10.0078 3.66766 10.4476 4.10746C10.8874 4.54726 11.186 5.10829 11.3051 5.71875M8.83632 0.75C10.1046 0.890898 11.2873 1.45886 12.1902 2.36063C13.0931 3.2624 13.6626 4.44438 13.8051 5.7125M13.1801 10.7V12.575C13.1808 12.7491 13.1451 12.9214 13.0754 13.0808C13.0057 13.2403 12.9034 13.3835 12.7751 13.5012C12.6469 13.6188 12.4954 13.7084 12.3305 13.7642C12.1657 13.82 11.9909 13.8407 11.8176 13.825C9.89434 13.616 8.04695 12.9588 6.42382 11.9063C4.91372 10.9467 3.63341 9.66636 2.67382 8.15625C1.61756 6.52575 0.960225 4.66937 0.755073 2.7375C0.739455 2.56467 0.759995 2.39048 0.815386 2.22602C0.870777 2.06156 0.959805 1.91043 1.0768 1.78226C1.1938 1.6541 1.3362 1.55169 1.49494 1.48158C1.65368 1.41146 1.82529 1.37516 1.99882 1.375H3.87382C4.17714 1.37201 4.47119 1.47942 4.70117 1.67721C4.93116 1.87499 5.08137 2.14965 5.12382 2.45C5.20296 3.05004 5.34973 3.6392 5.56132 4.20625C5.64541 4.42995 5.66361 4.67307 5.61376 4.9068C5.56392 5.14053 5.44811 5.35507 5.28007 5.525L4.48632 6.31875C5.37605 7.88347 6.67161 9.17903 8.23632 10.0687L9.03007 9.275C9.2 9.10696 9.41454 8.99116 9.64827 8.94131C9.882 8.89146 10.1251 8.90966 10.3488 8.99375C10.9159 9.20534 11.505 9.35211 12.1051 9.43125C12.4087 9.47408 12.6859 9.627 12.8842 9.86093C13.0824 10.0949 13.1877 10.3935 13.1801 10.7Z"
                  stroke="#808A93"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              {appart?.agent?.phone}
            </p>
          </div>
          <Button handleClick={() => setIsModal(true)} color={"gray"}>
            ლისტინგის წაშლა
          </Button>
        </div>
      </section>
      {isModal && <DelModal id={id} setIsModal={setIsModal} />}

      <section className="w-full mb-57">
        <h4
          className="text-slate-900
text-3xl
font-medium mb-13.5"
        >
          ბინები მსგავს ლოკაციაზე
        </h4>

        <div className="relative w-full px-12">
          {/* 2. Custom Buttons: Positioned absolutely relative to the Outer Container */}
          <button className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* 3. The Swiper: Width is 100% of the space between the paddings */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={80} // Space between cards
            slidesPerView={1}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
              1920: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {apartments
              ?.filter((appart) => appart?.city?.name === appartCity)
              .filter((app) => app.id !== appartId)
              .map((apart) => (
                <SwiperSlide key={apart.id} className="py-4">
                  {" "}
                  {/* Padding top/bottom stops shadow clipping */}
                  <ListingCard data={apart} />
                </SwiperSlide>
              ))}
          </Swiper>

          <button className="next-btn absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Details;
