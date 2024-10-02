// Image on Cover
import OrnTreeImg from "./assets/orn-tree.png";
import OrnFlowerLeftImg from "./assets/orn-flower.png";
import OrnFlowerLeftColorImg from "./assets/orn-flower-7.png";
import OrnFlowerRightImg from "./assets/orn-flower-12.png";
import OrnFlowerRightColorImg from "./assets/orn-flower-9.png";

// Image on first page
import FrameImg from "./assets/frame.png";
import CoverImg from "./assets/cover.jpeg";
import OrnFlowerTopRightImg from "./assets/orn-flower-19.png";
import OrnFlowerTopLeftImg from "./assets/orn-flower-4.png";
import OrnFlowerMiddleLeftImg from "./assets/orn-flower-20.png";
import OrnFlowerMiddleRightImg from "./assets/orn-flower-18.png";
import OrnFlowerBottomLeftImg from "./assets/orn-flower-21.png";
import OrnFlowerBottomLeft1Img from "./assets/orn-flower-26.png";
import OrnFlowerBottomRightImg from "./assets/orn-flower-22.png";
import OrnFlowerBottomRight2Img from "./assets/orn-flower-27.png";

// Image for catin
import NadiyaImg from "./assets/nadiya.jpg";
import RianImg from "./assets/rian.jpg";
import OrnFlowerBottomLeftImg2 from "./assets/orn-flower-23.png";
import OrnFlowerMiddleLeftImg2 from "./assets/orn-flower-25.png";

// Image for Save the Date
import FrameDateImg from "./assets/framedate.png";
import FrameOrnLeftImg from "./assets/orn-save-date-1-left.png";
import FrameOrnRightImg from "./assets/orn-save-date-1-right.png";

// Image for Foto
import Lebar1Img from "./assets/lebar1.jpg";
import Lebar2Img from "./assets/lebar2.jpg";
import Lebar3Img from "./assets/lebar3.jpg";
import Lebar4Img from "./assets/lebar4.jpg";
import Lebar5Img from "./assets/lebar5.jpg";
import Lebar6Img from "./assets/lebar6.jpg";
import Lebar7Img from "./assets/lebar7.jpg";
import Lebar8Img from "./assets/lebar8.jpg";
import Lebar9Img from "./assets/lebar9.jpg";

// DDay
import FrameTopImg from "./assets/frame-top.png";
import FrameBottomImg from "./assets/frame-bottom.png";
import FrameCenterImg from "./assets/frame-center.png";
import OrnEventTLImg from "./assets/orn-event-tl-1.png";
import OrnEventTL2Img from "./assets/orn-event-tl-2.png";
import OrnEventTRImg from "./assets/orn-event-tr-1.png";
import OrnEventBLImg from "./assets/orn-event-bl-1.png";
import OrnEventBL2Img from "./assets/orn-event-bl-2.png";
import OrnEventBRImg from "./assets/orn-event-br-1.png";
import OrnEventCover1Img from "./assets/orn-cover-1.png";
import OrnEventCover3Img from "./assets/orn-cover-3.png";
import AkadImg from "./assets/akad.png";
import ReceptionImg from "./assets/reception.png";

// Footer
import OrnFooter1 from "./assets/orn-footer-1.png";
import OrnFooter2 from "./assets/orn-footer-2.png";
import OrnFooter3 from "./assets/orn-footer-3-min.png";
import OrnFooter4 from "./assets/orn-footer-4.png";
import OrnFooter5 from "./assets/orn-footer-5.png";
import OrnFooter6 from "./assets/orn-footer-6.png";
import OrnFooter7 from "./assets/orn-footer-7.png";
import OrnFooter9 from "./assets/orn-footer-9.png";
import OrnFooter10 from "./assets/orn-footer-10.png";

import Backsound from "./assets/backsound.mp3";
import Music from "./assets/music.png";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import CountDown from "react-countdown";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const App = () => {
  const [params] = useSearchParams();
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [weddingWish, setweddingWish] = useState<IWeddingWish>({
    id: "",
    name: params.get("guest")
      ? params.get("guest")!.replace(/\;/g, " ").replace(/\=/g, "&")
      : "",
    created_at: "",
    wish: "",
  });
  const [listWeddingWish, setListWeddingWish] = useState<IWeddingWish[]>([]);
  const dday = new Date(2024, 9, 13, 8, 0, 0, 0);

  // Mixins

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  interface IWeddingWish {
    id: string;
    name: string;
    wish: string;
    created_at: string;
  }

  // Function
  const formatDate = (date: string) => {
    const format = new Date(date).toLocaleString("en-US", {
      dateStyle: "full",
    });
    const time = new Date(date).toLocaleTimeString("en-US", {
      hour12: true,
    });
    return `${format}, ${time}`;
  };
  const fetchWeddingWish = async () => {
    const API_URL = "https://fueremi.hasura.app/v1/graphql";
    const API_HEADERS = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "A4xxh5EYO5EfrydYORUlobfBSeJVGyds3RFds5d6Km7k0vghrtK3vNLaU3NSa3VX",
    };
    const API_QUERY = `
      query MyQuery {
          harinanbahagia_wedding_wish(offset: ${page}, limit: 5, order_by: {created_at: desc}) {
            id
            name
            created_at
            wish
          }
        }
      `;
    try {
      setIsLoading(true);
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );
      const result = data.data.data.harinanbahagia_wedding_wish;
      setIsLoading(false);
      setListWeddingWish(result);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setweddingWish({ ...weddingWish, [e.target.name]: e.target.value });
  };
  const handleOnClickSend = async () => {
    if (weddingWish.name === "" && weddingWish.wish === "") {
      return;
    }
    const API_URL = "https://fueremi.hasura.app/v1/graphql";
    const API_HEADERS = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "A4xxh5EYO5EfrydYORUlobfBSeJVGyds3RFds5d6Km7k0vghrtK3vNLaU3NSa3VX",
    };
    const API_QUERY = `
      mutation MyMutation {
        insert_harinanbahagia_wedding_wish(objects: {name: "${weddingWish.name}", wish: "${weddingWish.wish}"}) {
          affected_rows
        }
      }
      `;
    try {
      setIsLoading(true);
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );
      setIsLoading(false);
      const result =
        data.data.data.insert_harinanbahagia_wedding_wish.affected_rows;
      if (result > 0) {
        setweddingWish({
          id: "",
          created_at: "",
          name: params.get("guest")!,
          wish: "",
        });
        fetchWeddingWish();
      } else {
        console.log(data.data.data);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const handleOnClickClipboard = (acc_num: string) => {
    var copyText = document.getElementById(acc_num);
    navigator.clipboard.writeText(copyText!.innerText);
    Toast.fire({
      icon: "success",
      title: "Account number copied to Clipboard",

      position: "bottom",
    });
  };
  const handleOnClickOpenInvitation = () => {
    setIsInvitationOpen(!isInvitationOpen);
    const audio: any = document.getElementById("audio");
    setIsMuted(!isMuted);
    audio.play();
  };
  const handleOnClickMusic = () => {
    const audio: any = document.getElementById("audio");
    setIsMuted(!isMuted);
    audio.muted = isMuted;
  };
  const handleOnClickPhoto = (photo: any) => {
    setCurrentPhoto(photo);
    setIsPreview(true);
  };
  const handleOnClickClosePhoto = () => {
    setCurrentPhoto("");
    setIsPreview(false);
  };

  // Component Render
  const CountdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (completed) {
      return <div>D-Day</div>;
    } else {
      return (
        <>
          <div
            className="absolute top-[132px] left-[72px] h-20 w-16 bg-[#89565C] rounded-lg flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true"
          >
            <p className="text-white text-2xl text-center">{days}</p>
            <p className="text-white text-xs text-center">Days</p>
          </div>
          <div
            className="absolute top-[132px] left-[152px] h-20 w-16 bg-[#89565C] rounded-lg flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true"
          >
            <p className="text-white text-2xl text-center">{hours}</p>
            <p className="text-white text-xs text-center">Hours</p>
          </div>
          <div
            className="absolute top-[228px] left-[72px] h-20 w-16 bg-[#89565C] rounded-lg flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true"
          >
            <p className="text-white text-2xl text-center">{minutes}</p>
            <p className="text-white text-xs text-center">Minutes</p>
          </div>
          <div
            className="absolute top-[228px] left-[152px] h-20 w-16 bg-[#89565C] rounded-lg flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true"
          >
            <p className="text-white text-2xl text-center">{seconds}</p>
            <p className="text-white text-xs text-center">Seconds</p>
          </div>
          <a
            className="bg-[#89565C] px-4 py-1 rounded  text-white text-xs absolute top-[21rem] left-20"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true"
            href="https://www.google.com/calendar/render?action=TEMPLATE&amp;text=Nadiya+%26+Rian+Wedding&amp;dates=20241013T080000/20241013T130000&amp;location=Ballroom+Raden+Intan+UIN+Raden+Intan+Lampung+%7C+Jl.+Raycudu%2C+Way+Dadi%2C+Kecamatan+Sukarame%2C+Kota+Bandar+Lampung%2C+Lampung%2C+Indonesia&amp;details=Reservation+We+will+be+more+than+just+blessed+to+have+you+with+us+celebrating+the+wedding+of+Nadiya+and+Rian.+We+request+you+to+respond+to+our+invitation+and+let+us+know+%7C+Nadiya+%26+Rian+Wedding+%7C+Sunday%2C+October+13rd+2024"
            target="_blank"
            rel="nofollow"
          >
            Add To Calender
          </a>
        </>
      );
    }
  };

  useEffect(() => {
    fetchWeddingWish();
    AOS.init();
  }, [page]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="w-screen h-screen bg-mycolor fixed left-0 top-0 z-[999]">
          <div className="inline-flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999 items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-lg text-white bg-[#89565C] transition ease-in-out duration-150">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </div>
        </div>
      )}

      {isPreview && (
        <div
          className="w-screen h-screen bg-mycolor fixed left-0 top-0 z-[999] px-1"
          onClick={() => handleOnClickClosePhoto()}
        >
          <img src={currentPhoto} className="h-full object-contain" alt="" />
        </div>
      )}

      <audio id="audio" loop>
        <source src={Backsound} type="audio/mpeg" />
      </audio>
      <img
        src={Music}
        alt=""
        className={`w-16 left-2 bottom-2 fixed z-50  ${
          isMuted && "animate-spin-slow"
        }`}
        onClick={() => handleOnClickMusic()}
      />
      <section
        className={`overflow-hidden relative z-10 h-[calc(100dvh)] w-screen bg-[url('./assets/bg-cover-mobile.png')] bg-cover ${
          isInvitationOpen && "-translate-y-full"
        } transition-all duration-[2000ms]`}
      >
        <img
          data-aos="fade-right"
          data-aos-duration="2000"
          src={OrnTreeImg}
          alt=""
          className="absolute -left-52 -top-16 h-80"
        />
        <img
          data-aos="fade-left"
          data-aos-duration="2000"
          src={OrnTreeImg}
          alt=""
          className="absolute -right-52 -top-16 h-80"
        />
        <img
          data-aos="fade-up-right"
          data-aos-duration="2000"
          src={OrnFlowerLeftImg}
          alt=""
          className="absolute -left-24 bottom-0 h-80"
        />
        <img
          src={OrnFlowerLeftColorImg}
          alt=""
          className="absolute -left-4 bottom-0 h-40 animate-waving-flower-right origin-bottom"
        />
        <img
          data-aos="fade-up-left"
          data-aos-duration="2000"
          src={OrnFlowerRightImg}
          alt=""
          className="absolute right-8 bottom-0 h-40"
        />
        <img
          src={OrnFlowerRightColorImg}
          alt=""
          className="absolute -right-8 -bottom-3 h-40 animate-waving-flower-left origin-bottom"
        />
        <div className="flex flex-col justify-center items-center h-full w-screen text-[#89565C]">
          <h1
            className="text-[60px] leading-[60px] flex flex-col gap-2 font-parisienne text-center"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="3000"
          >
            {/* <h1 className="text-6xl flex flex-col gap-2 font-great-vibes text-[#89565C] text-center"> */}
            <span>Nadiya</span>
            <span>&</span>
            <span>Rian</span>
          </h1>
          <span
            data-aos="fade-up"
            data-aos-delay="2000"
            data-aos-duration="2000"
            className=" mt-5 w-32 h-[2px] bg-[#89565C]"
          ></span>
          <p
            className="mt-5"
            data-aos="fade-up"
            data-aos-delay="2000"
            data-aos-duration="2000"
          >
            SPECIAL INVITATION TO
          </p>
          <span
            data-aos="fade-up"
            data-aos-delay="2500"
            data-aos-duration="2000"
            className="text-[#89565C] font-bold text-2xl font-great-vibes px-2 py-1 rounded-lg mt-2 capitalize"
          >
            {weddingWish.name}
          </span>
          <button
            data-aos="fade-up"
            data-aos-delay="3000"
            data-aos-duration="2000"
            className="px-4 py-1 bg-[#89565C] text-white text-sm font-lato mt-4 rounded-full flex justify-center items-center gap-1"
            onClick={() => handleOnClickOpenInvitation()}
          >
            Open Invitation
          </button>
        </div>
      </section>
      {isInvitationOpen && (
        <div className={`overflow-hidden`}>
          <section
            className={`min-h-[calc(100dvh)] bg-[#EAE2DC] w-screen ${
              isInvitationOpen && "absolute top-0 left-0"
            }`}
          >
            <div className="flex flex-col justify-center items-center h-full w-full px-4 py-8">
              <div className="flex justify-center items-center gap-4">
                <span
                  className="w-10 h-[2px] bg-[#89565C]"
                  data-aos="fade-down"
                  data-aos-duration="2000"
                ></span>
                <div
                  className="text-4xl text-[#89565C] font-apple flex justify-center"
                  data-aos="fade-down"
                  data-aos-duration="3000"
                >
                  <span>N</span>
                  <span className="-ml-[14px] mt-3">R</span>
                </div>
                <span
                  className="w-10 h-[2px] bg-[#89565C]"
                  data-aos="fade-down"
                  data-aos-duration="2000"
                ></span>
              </div>
              <h2
                className="font-lato text-[#89565C] uppercase mt-2 tracking-[0.15em]"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="500"
              >
                Wedding Invitation
              </h2>
              <h3
                className="font-lato text-sm text-[#89565C]"
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                You're Invited!
              </h3>
              <div className="relative mt-10">
                <img
                  src={FrameImg}
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="2000"
                  data-aos-once="true"
                  alt=""
                  className="w-52 relative z-10"
                />
                <img
                  src={CoverImg}
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="2000"
                  data-aos-once="true"
                  alt=""
                  className="absolute top-[40px] left-8 w-[148px] h-[280px] object-cover mix-blend-multiply"
                />
                <img
                  src={OrnFlowerTopRightImg}
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="3000"
                  data-aos-once="true"
                  alt=""
                  className="absolute z-10 -top-6 -right-6 w-20"
                />
                <img
                  src={OrnFlowerTopLeftImg}
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="3000"
                  data-aos-once="true"
                  alt=""
                  className="absolute z-10 -top-6 -left-6 h-24"
                />
                <img
                  src={OrnFlowerMiddleLeftImg}
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="3000"
                  data-aos-once="true"
                  alt=""
                  className="absolute z-10 bottom-16 -left-10 w-24"
                />
                <img
                  src={OrnFlowerMiddleRightImg}
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="3000"
                  data-aos-once="true"
                  alt=""
                  className="absolute z-10 bottom-16 -right-4 w-16"
                />
                <img
                  src={OrnFlowerBottomLeftImg}
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="3000"
                  data-aos-once="true"
                  alt=""
                  className="absolute z-10 -bottom-2 -left-8 w-32"
                />
                <img
                  src={OrnFlowerBottomRightImg}
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="3000"
                  data-aos-once="true"
                  alt=""
                  className="absolute z-10 bottom-0 -right-0 w-32"
                />
              </div>
              <p
                className="mt-8 text-[#89565C] text-lg font-lato"
                data-aos="fade-down"
                data-aos-duration="2000"
                data-aos-delay="2000"
                data-aos-once="true"
              >
                #haRINAnbahagia
              </p>
            </div>
          </section>
          <section
            className={`min-h-[calc(75dvh)] w-screen bg-[url('./assets/bg-quotes.png')] bg-cover py-8 flex justify-center flex-col relative overflow-hidden`}
          >
            <img
              src={OrnFooter4}
              className="absolute bottom-0 left-32 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            {/* <img
              src={OrnFooter1}
              className="absolute bottom-32 -left-12 w-24"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            /> */}
            {/* <img
              src={OrnFooter2}
              className="absolute bottom-8 -left-10 w-28"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            /> */}
            <img
              src={OrnFooter3}
              className="absolute -bottom-4 left-0 w-36"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter7}
              className="absolute -bottom-8 -right-12 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            {/* <img
              src={OrnFooter5}
              className="absolute -bottom-4 right-16 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            /> */}
            <img
              src={OrnFooter6}
              className="absolute -bottom-8 -rotate-[25deg] right-4 w-36"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            {/* <img
              src={OrnFooter10}
              className="absolute bottom-24 -right-16 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            /> */}
            {/* <img
              src={OrnFooter9}
              className="absolute bottom-12 -right-16 w-24"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            /> */}
            <img
              src={OrnFooter1}
              className="absolute -bottom-20 right-0 w-24"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <h1
              className="text-xl text-[#89565C] font-bold mt-12 text-center"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
            </h1>
            <p
              className="mt-12 text-[#89565C] text-sm font-lato px-8 text-center"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              "And one of His signs is that He created for you spouses from
              among yourselves so that you may find comfort in them. And He has
              placed between you compassion and mercy. Surely in this are signs
              for people who reflect"
            </p>
            <p
              className="text-center text-[#89565C] text-sm mt-4"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              (QS. Ar-Rum: 21)
            </p>
          </section>
          <section
            className={`min-h-[calc(100dvh)] w-screen bg-[#EAE2DC] py-2 flex justify-center flex-col `}
          >
            <div className="px-4 pt-16 flex items-center flex-col text-[#89565C] ">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.1em]"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                The Wedding Of
              </h2>
              <h3
                className="text-sm mt-4"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
              </h3>
              <p
                className="text-sm mt-8 text-center"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                Assalamualaikum Warrahmatullahi Wabarakatuh, with the blessing
                and mercy from Allah SWT. We cordially invite you to the wedding
                of :
              </p>

              <div
                className="mt-16 relative border border-[#89565C] w-52 h-72 rounded-t-full"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <img
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  src={NadiyaImg}
                  alt=""
                  className="absolute w-48 h-[268px] top-2 left-[6px] rounded-t-full object-cover"
                />
                <img
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                  src={OrnFlowerMiddleLeftImg}
                  alt=""
                  className="absolute -left-14 -bottom-1 h-52 animate-waving-flower-left origin-bottom"
                />
                <img
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                  src={OrnFlowerBottomLeftImg2}
                  alt=""
                  className="absolute -left-4 -bottom-12 h-24"
                />
                <img
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                  src={OrnFlowerBottomRightImg}
                  alt=""
                  className="absolute -right-4 -bottom-8 h-20"
                />
              </div>
              <div className="mt-12">
                <h1
                  className="font-apple tracking-[0.05em] text-3xl text-center "
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Nadiya S.T.
                </h1>
                <p
                  className="mt-4 text-sm text-center"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Putri Ketiga dari Bapak Bajuri S.H., <br /> dan <br /> Ibu
                  Eviyana Hamid Jotang
                </p>
              </div>

              <div className="font-apple text-4xl my-8">&</div>

              <div
                className="relative border border-[#89565C] w-52 h-72 rounded-t-full"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <img
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  src={RianImg}
                  alt=""
                  className="absolute w-48 h-[268px] top-2 left-[6px] rounded-t-full object-cover"
                />
                <img
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                  src={OrnFlowerMiddleLeftImg2}
                  alt=""
                  className="absolute -right-14 -bottom-1 h-52 animate-waving-flower-right origin-bottom"
                />
                <img
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                  src={OrnFlowerBottomLeft1Img}
                  alt=""
                  className="absolute -right-2 -bottom-8 h-24"
                />
                <img
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                  src={OrnFlowerBottomRight2Img}
                  alt=""
                  className="absolute -left-4 -bottom-8 h-20"
                />
              </div>
              <div className="mt-12">
                <h1
                  className="font-apple tracking-[0.05em] text-3xl text-center"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Rian Oktio M.P. S.Kom.
                </h1>
                <p
                  className="mt-4 text-sm text-center"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Putra Keempat dari Bapak Dr. Ir. H. Syafril Hadi, M.S., <br />
                  dan <br /> Ibu Hj. Meri Azrinelti, S.T., M.M.
                </p>
              </div>
            </div>
          </section>
          <section
            className={`w-screen bg-[#EAE2DC] py-4 flex justify-start flex-col `}
          >
            <div className="px-4 pt-24 pb-4 flex items-center flex-col text-[#89565C]">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.1em] mb-8"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Save The Date
              </h2>
              <div className="relative">
                <img
                  src={FrameDateImg}
                  alt=""
                  className="w-72"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                />
                <img
                  src={FrameOrnLeftImg}
                  alt=""
                  className="absolute top-[40px] -left-12 w-32"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                />
                <img
                  src={FrameOrnRightImg}
                  alt=""
                  className="absolute top-[40px] -right-12 w-32"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="1000"
                />
                <h1
                  className="font-great-vibes text-[26px] w-full text-center font-medium tracking-[0.05em] mb-8 absolute top-[72px] left-0 leading-5"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  13<sup>rd</sup> <br />
                  October 2024
                </h1>
                <CountDown date={dday} renderer={CountdownRenderer} />
              </div>
            </div>
          </section>
          <section
            className={`min-h-[calc(100dvh)] w-screen bg-[#EAE2DC] py-4 flex justify-start flex-col `}
          >
            <div className="px-4 pt-2 pb-16 flex items-center flex-col text-[#89565C] ">
              <p
                className="text-center text-sm leading-4  mb-4"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                With the joy of our hearts, we cordially invite you to our
                special day. Your presence will enhance the happiness to us
              </p>
              <h3 data-aos="fade-up" data-aos-duration="2000">
                Sunday
              </h3>
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.05em]"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                October, 13<sup>rd</sup> 2024
              </h2>
            </div>
            <div className="relative flex justify-center flex-col items-center">
              <img src={FrameTopImg} alt="" className="w-80 z-10" />
              <img src={FrameCenterImg} alt="" className="w-80 z-10" />
              <img src={FrameBottomImg} alt="" className="w-80 z-10" />
              <div className="absolute top-24 z-50 flex justify-center items-center flex-col w-52 text-[#F9EACA]">
                <img
                  src={AkadImg}
                  className="ml-2 w-16"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  alt=""
                />
                <p
                  className="font-cinzel text-3xl text-center mt-4"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Akad
                </p>
                <p
                  className="font-news text-xs text-center"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  08.00 - 10.00
                </p>
                <p
                  className="font-cinzel text-2xl mt-6 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  &
                </p>
                <img
                  src={ReceptionImg}
                  className="ml-2 w-16"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  alt=""
                />
                <p
                  className="font-cinzel text-3xl text-center mt-4"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Reception
                </p>
                <p
                  className="font-news text-xs text-center"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  10.00 - Selesai
                </p>
                <p
                  className="font-news text-lg text-center mt-6 leading-5"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Ballroom UIN Raden Intan
                </p>
                <p
                  className="font-news text-xs text-center mt-2 leading-4"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Jl. Ryacudu, Way Dadi, Kec. Sukarame, Kota Bandar Lampung
                </p>
                <a
                  className="px-4 py-1 mt-8 border border-[#F9EACA] rounded-lg text-sm"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  href="https://www.google.com/maps/place/BALL+ROOM+RADEN+INTAN/@-5.3794358,105.3000924,17z/data=!3m1!4b1!4m6!3m5!1s0x2e40db9e01a9b95b:0x3c61c68ee958c5fd!8m2!3d-5.3794358!4d105.3026673!16s%2Fg%2F11s4d043l2?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="nofollow"
                >
                  View Maps
                </a>
              </div>
              <img
                src={OrnEventTLImg}
                alt=""
                className="w-32 absolute top-8 z-20 -left-12"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <img
                src={OrnEventTL2Img}
                alt=""
                className="w-44 absolute -top-8 z-20 left-12"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <img
                src={OrnEventTRImg}
                alt=""
                className="w-64 absolute -top-3 z-20 -right-12"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <img
                src={OrnEventBL2Img}
                alt=""
                className="w-64 absolute -bottom-12 z-20 left-8"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <img
                src={OrnEventBLImg}
                alt=""
                className="w-48 absolute -bottom-4 z-20 -left-8"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <img
                src={OrnEventBRImg}
                alt=""
                className="w-48 absolute bottom-0 z-20 -right-8"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <div className="absolute w-80 bg-[#89565C] h-[45.4rem] rounded-full z-0"></div>
            </div>
          </section>
          <section
            className={`min-h-[calc(100dvh)] w-screen bg-[#EAE2DC] py-4 flex justify-start flex-col `}
          >
            <div className="px-4 py-16 flex items-center flex-col text-[#89565C] ">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.1em] mb-8"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                Portrait of Us
              </h2>
              <div className="flex w-full">
                <div
                  className="bg-blue-200 border border-white  w-screen h-48"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src={Lebar6Img}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    onClick={() => handleOnClickPhoto(Lebar6Img)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div
                  className="bg-green-200 border border-white w-1/2 h-48"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src={Lebar7Img}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    onClick={() => handleOnClickPhoto(Lebar7Img)}
                  />
                </div>
                <div
                  className="bg-green-200 border border-white w-1/2 h-48"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="500"
                >
                  <img
                    src={Lebar1Img}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    onClick={() => handleOnClickPhoto(Lebar1Img)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div
                  className="bg-red-200 border border-white w-1/3 h-48"
                  data-aos="fade-up"
                  data-aos-duration="1600"
                  data-aos-delay="500"
                >
                  <img
                    src={Lebar4Img}
                    alt=""
                    className="w-full h-full object-cover"
                    onClick={() => handleOnClickPhoto(Lebar4Img)}
                  />
                </div>
                <div
                  className="bg-red-200 border border-white  w-1/3 h-48"
                  data-aos="fade-up"
                  data-aos-duration="1800"
                  data-aos-delay="750"
                >
                  <img
                    src={Lebar8Img}
                    alt=""
                    className="w-full h-full object-cover"
                    onClick={() => handleOnClickPhoto(Lebar8Img)}
                  />
                </div>
                <div
                  className="bg-red-200 border border-white w-1/3 h-48"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src={Lebar5Img}
                    alt=""
                    className="w-full h-full object-cover"
                    onClick={() => handleOnClickPhoto(Lebar5Img)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div
                  className="bg-green-200 border border-white w-1/2 h-48"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src={Lebar2Img}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    onClick={() => handleOnClickPhoto(Lebar2Img)}
                  />
                </div>
                <div
                  className="bg-green-200 border border-white w-1/2 h-48"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="500"
                >
                  <img
                    src={Lebar9Img}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    onClick={() => handleOnClickPhoto(Lebar9Img)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div
                  className="bg-blue-200 border border-white w-screen h-48"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src={Lebar3Img}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    onClick={() => handleOnClickPhoto(Lebar3Img)}
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            className={`min-h-[calc(100dvh)] w-screen bg-[#89565C] px-4 py-8 flex justify-start flex-col overflow-hidden`}
          >
            <div
              className="px-8 pt-24 pb-28 flex items-center flex-col text-[#89565C] rounded-t-full bg-[url('./assets/bg-quotes.png')] bg-cover bg-mycolor border-4 border-[#F9EACA] relative"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.05em] mb-8"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Wedding Gift
              </h2>
              <p
                className="font-news text-center text-sm"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Your attendance at our wedding is the greatest gift of all.
                However, if you wish to honor us with a gift, a cash gift would
                be very welcome.
              </p>
              <div
                className="font-news text-2xl mt-8"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Bank BCA
              </div>
              <div
                className="font-news text-center mt-1"
                data-aos="fade-up"
                data-aos-duration="2000"
                id="acc_num1"
              >
                2940617378
              </div>
              <div
                className="font-news text-center -mt-1"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                an. Nadiya
              </div>
              <button
                className="font-news text-lg mt-2 border-b-2 border-[#89565C] pb-1"
                data-aos="fade-up"
                data-aos-duration="2000"
                onClick={() => handleOnClickClipboard("acc_num1")}
              >
                Copy
              </button>

              <div
                className="font-news text-2xl mt-8"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Bank BNI
              </div>
              <div
                className="font-news text-center mt-1"
                data-aos="fade-up"
                data-aos-duration="2000"
                id="acc_num2"
              >
                1996101803
              </div>
              <div
                className="font-news text-center -mt-1"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                an. Rian Oktio Mersa Putra
              </div>
              <button
                className="font-news text-lg mt-2 border-b-2 border-[#89565C] pb-1 z-20"
                data-aos="fade-up"
                data-aos-duration="2000"
                onClick={() => handleOnClickClipboard("acc_num2")}
              >
                Copy
              </button>
              <img
                src={OrnEventTRImg}
                alt=""
                className="absolute -top-2 -right-8 h-52"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <img
                src={OrnEventCover1Img}
                alt=""
                className="absolute -bottom-16 -left-32 h-60"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <img
                src={OrnEventCover3Img}
                alt=""
                className="absolute -bottom-20 -right-24 h-64"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
            </div>
          </section>
          <section
            className={`min-h-[calc(100dvh)] w-screen bg-[#EAE2DC] px-4 py-8 flex justify-start flex-col overflow-hidden`}
          >
            <div className="px-8 py-8 flex w-full items-center flex-col text-[#89565C] ">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.05em] mb-8"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Wedding Wish
              </h2>
              <div
                className="flex flex-col w-full font-news mb-4"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="rounded px-2 py-1 disabled:bg-[#fde5e8] capitalize"
                  autoComplete="off"
                  value={weddingWish?.name}
                  onChange={(e) => handleOnChange(e)}
                  disabled
                />
              </div>
              <div className="flex flex-col w-full font-news mb-4">
                <label htmlFor="wish">Wish</label>
                <textarea
                  id="wish"
                  name="wish"
                  className="rounded px-2 py-1"
                  value={weddingWish?.wish}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <button
                className="bg-[#89565C] text-left text-[#F9EACA] text-xs rounded px-4 py-1"
                onClick={() => handleOnClickSend()}
              >
                Send
              </button>
              {listWeddingWish.length > 0 && (
                <>
                  <div
                    className="bg-white w-full rounded-md p-4 mt-16 font-news"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-once="true"
                  >
                    {listWeddingWish.map((wish: IWeddingWish) => (
                      <div key={wish.id} className="py-2">
                        <p className="text-left font-bold capitalize">
                          {wish?.name}
                        </p>
                        <p className="text-left text-xs -mt-1 text-black">
                          {formatDate(wish.created_at)}
                        </p>
                        <p className="leading-4 mt-2 text-xs text-justify normal-case first-letter:uppercase text-black">
                          {wish?.wish}
                        </p>
                        <div className="flex justify-center items-center">
                          <hr className="mt-2 w-12 border-[#89565C]" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex justify-center items-center gap-4 mt-8 font-news text-xs"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-once="true"
                  >
                    <button
                      className="bg-[#89565C] px-4 py-0.5 text-[#F9EACA] rounded disabled:bg-[#cda9ad]"
                      disabled={page === 0}
                      onClick={() => setPage(page - 5)}
                    >
                      Prev
                    </button>
                    <button
                      className="bg-[#89565C] px-4 py-0.5 text-[#F9EACA] rounded disabled:bg-[#cda9ad]"
                      disabled={page + 5 > listWeddingWish.length}
                      onClick={() => setPage(page + 5)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
          <section
            className={`min-h-[calc(60dvh)] w-screen bg-[url('./assets/bg-quotes.png')] bg-cover px-4 py-8 flex justify-start flex-col overflow-hidden relative`}
          >
            <img
              src={OrnFooter4}
              className="absolute bottom-0 left-32 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter1}
              className="absolute bottom-32 -left-12 w-24"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter2}
              className="absolute bottom-8 -left-10 w-28"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter3}
              className="absolute -bottom-4 left-0 w-36"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter7}
              className="absolute -bottom-8 -right-12 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter5}
              className="absolute -bottom-4 right-16 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter6}
              className="absolute -bottom-8 -rotate-[25deg] right-4 w-36"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter10}
              className="absolute bottom-24 -right-16 w-32"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter9}
              className="absolute bottom-12 -right-16 w-24"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <img
              src={OrnFooter1}
              className="absolute -bottom-20 right-0 w-24"
              alt=""
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <div className="absolute left-1/2 top-1/3 mt-12 -translate-x-1/2 -translate-y-1/2 text-center text-[#89565C] w-full">
              {/* <div
                className="mt-3 font-parisienne text-4xl tracking-[0.06em]"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              >
                Nadiya & Rian
              </div>
              <div
                className="mt-6 font-news text-lg"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              >
                October, 13<sup>rd</sup> 2024
              </div>

              <hr
                className="border-[#F9EACA] w-20 mx-auto mt-4"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              /> */}
              <div
                className="text-[72px] font-apple flex justify-center"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              >
                <span>N</span>
                <span className="-ml-[28px] mt-6">R</span>
              </div>
              <div
                className="mt-2 font-news text-2xl"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              >
                #haRINAnbahagia
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
