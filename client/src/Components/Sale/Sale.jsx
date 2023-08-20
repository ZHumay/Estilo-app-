import React, { useEffect, useState } from "react";
import "./sale.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "../CarouselSwiper/carousel.css";
import { Link } from "react-router-dom";
import { usePostsContext } from "../../hooks/usePostsContext";
SwiperCore.use([Autoplay, Navigation, Pagination]);

function Sale() {
  // Arka plan resmi URL'si
  const { posts } = usePostsContext();
  const Posts = posts.filter((post) => post.likes.length <= 5);

  const backgroundImageUrl =
    "https://img.freepik.com/premium-vector/flash-sale-banner-template-hot-color-background_42331-3510.jpg?w=2000";

  // İndirim başlangıç ve bitiş tarihleri (UNIX zaman damgaları olarak)
  const discountStartTime = new Date().getTime();
  const discountEndTime = discountStartTime + 15 * 24 * 60 * 60 * 1000; // 15 gün

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const timeDiff = discountEndTime - now;

    if (timeDiff <= 0) {
      // İndirim sona erdi
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  return (
    <div className="sectionsale">
      <div
        className="sale"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "99vh",
          width: "1010px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="timer">
          {/* <h1>15 Günlük İndirim</h1> */}
          <div className="countdown">
            <div className="time-unit">
              <span>{timeLeft.days}</span>
              <p className="timeP">Day</p>
            </div>
            <div className="time-unit">
              <span>{timeLeft.hours}</span>
              <p className="timeP">Hours</p>
            </div>
            <div className="time-unit">
              <span>{timeLeft.minutes}</span>
              <p className="timeP">Mins</p>
            </div>
            <div className="time-unit">
              <span>{timeLeft.seconds}</span>
              <p className="timeP">Secs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rightSale">
        <div className="popular">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            loop={true}
            slidesPerView={2.5}
            centeredSlides={true}
            autoplay={{ delay: "1500" }}
            navigation={true}
            className="mySwiperSale"
            style={{ padding: "20px 0" }}
          >
            {Posts.map((post, index) => (
              <SwiperSlide key={post._id} className={`card rounded-lg `}>
                <br></br>
                <p className="carousel_item_title_sale">{post.title}</p>
                <br></br>
                <div className="item_carousel_img_wrapper">
                  <Link to={`/post/${post?._id}`}>
                    <img className="postimg" src={post.postImage} alt="Slide" />
                  </Link>
                </div>
                <div className="newprice">
                <p className="PostPrice"> {`${post.price}$`}</p>
                 <p className="newPostprice">{`${post.price*0.5}$`}</p>
                </div>

                <br></br>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Sale;
