// Image on first page
import FrameImg from "./assets/frame.png";

import Backsound from "./assets/backsound.mp3";
import Music from "./assets/music.png";
import { BrideCharacter, CoupleCharacter, GroomCharacter } from "./characters";

import {
  AngsoDuo,
  ButterflyOpen,
  ButterflySide,
  ButterflyTiny,
  Divider,
  DividerCrest,
  GoldCard,
  LaceEdge,
  MonogramVO,
  PeonyCorner,
  PucukRebung,
  SongketPattern,
  SulurCorner,
  TampukManggis,
} from "./ornaments";

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
  const [weddingWishLength, setWeddingWishLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const guestName = params.get("guest")
    ? params.get("guest")!.replace(/\;/g, " ").replace(/\=/g, "&")
    : "";
  const [weddingWish, setweddingWish] = useState<IWeddingWish>({
    id: "",
    name: guestName,
    created_at: "",
    wish: "",
  });
  const [listWeddingWish, setListWeddingWish] = useState<IWeddingWish[]>([]);
  const dday = new Date(2026, 8, 20, 11, 0, 0, 0);

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
    const format = new Date(date).toLocaleString("id-ID", {
      dateStyle: "full",
    });
    const time = new Date(date).toLocaleTimeString("id-ID", {
      hour12: false,
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
          viraogi_wedding_wish(offset: ${page}, limit: 5, order_by: {created_at: desc}) {
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
      const result = data.data.data.viraogi_wedding_wish;
      setIsLoading(false);
      setListWeddingWish(result);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const fetchWeddingWishLength = async () => {
    const API_URL = "https://fueremi.hasura.app/v1/graphql";
    const API_HEADERS = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "A4xxh5EYO5EfrydYORUlobfBSeJVGyds3RFds5d6Km7k0vghrtK3vNLaU3NSa3VX",
    };
    const API_QUERY = `
      query MyQuery {
          viraogi_wedding_wish_aggregate {
            aggregate {
              count
          }
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
      const result =
        data.data.data.viraogi_wedding_wish_aggregate.aggregate.count;
      setIsLoading(false);
      setWeddingWishLength(result);
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
    if (weddingWish.name === "" || weddingWish.wish === "") {
      return;
    }
    const API_URL = "https://fueremi.hasura.app/v1/graphql";
    const API_HEADERS = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "A4xxh5EYO5EfrydYORUlobfBSeJVGyds3RFds5d6Km7k0vghrtK3vNLaU3NSa3VX",
    };
    const API_QUERY = `
      mutation MyMutation($input: String!) {
        insert_viraogi_wedding_wish(objects: {name: "${weddingWish.name}", wish: $input}) {
          affected_rows
        }
      }
      `;
    try {
      setIsLoading(true);
      const data = await axios.post(
        API_URL,
        { query: API_QUERY, variables: { input: weddingWish.wish } },
        { headers: API_HEADERS }
      );
      setIsLoading(false);
      const result =
        data.data.data.insert_viraogi_wedding_wish.affected_rows;
      if (result > 0) {
        setweddingWish({
          id: "",
          created_at: "",
          name: guestName,
          wish: "",
        });
        fetchWeddingWish();
        fetchWeddingWishLength();
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
      title: "Nomor rekening berhasil disalin",

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

  // Component Render
  const CountdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (completed) {
      return (
        <div className="text-cream font-cinzel text-2xl text-center">
          Hari Bahagia Telah Tiba
        </div>
      );
    }
    const items: [number, string][] = [
      [days, "Hari"],
      [hours, "Jam"],
      [minutes, "Menit"],
      [seconds, "Detik"],
    ];
    return (
      <div
        className="flex justify-center gap-3"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-once="true"
      >
        {items.map(([value, label]) => (
          <div
            key={label}
            className="w-16 h-20 rounded-lg border-2 border-gold bg-maroon flex flex-col justify-center"
          >
            <p className="text-cream text-2xl text-center">{value}</p>
            <p className="text-gold-light text-xs text-center">{label}</p>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchWeddingWish();
    fetchWeddingWishLength();
    AOS.init();
  }, [page]);

  return (
    <div className="relative mx-auto w-full max-w-[430px] min-h-dvh bg-maroon-deep overflow-x-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)]">
      {isLoading && (
        <div className="w-screen h-screen bg-mycolor fixed left-0 top-0 z-[999]">
          <div className="inline-flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-lg text-white bg-maroon transition ease-in-out duration-150">
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
            Memproses...
          </div>
        </div>
      )}

      <audio id="audio" loop>
        <source src={Backsound} type="audio/mpeg" />
      </audio>
      <img
        src={Music}
        alt=""
        className={`w-14 bottom-3 fixed z-50 left-[max(0.75rem,calc(50%-215px+0.75rem))] drop-shadow-lg ${
          isMuted && "animate-spin-slow"
        }`}
        onClick={() => handleOnClickMusic()}
      />

      {/* Cover */}
      <section
        className={`overflow-hidden relative z-10 h-[calc(100dvh)] w-full bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep ${
          isInvitationOpen && "-translate-y-full"
        } transition-all duration-[2000ms]`}
      >
        <SongketPattern className="absolute inset-0 h-full w-full text-gold-light opacity-[0.12]" />
        <PucukRebung className="absolute top-0 left-0 w-full h-8 text-gold rotate-180" />
        <LaceEdge className="absolute top-8 left-0 w-full h-7 text-gold/70" />
        <PucukRebung className="absolute bottom-0 left-0 w-full h-8 text-gold" />
        <SulurCorner className="absolute top-16 left-3 w-14 text-gold/70" />
        <SulurCorner className="absolute top-16 right-3 w-14 text-gold/70 -scale-x-100" />
        <div className="absolute -bottom-3 -left-7 w-44 animate-sway origin-bottom-left pointer-events-none">
          <PeonyCorner className="w-full" />
        </div>
        <div className="absolute -bottom-3 -right-7 w-44 -scale-x-100 animate-sway origin-bottom-left pointer-events-none">
          <PeonyCorner className="w-full" />
        </div>
        <ButterflySide className="absolute top-[16%] left-6 w-10 animate-flutter pointer-events-none" />
        <ButterflyOpen className="absolute top-[26%] right-8 w-12 animate-flutter-slow pointer-events-none" />
        <ButterflyTiny className="absolute bottom-[30%] left-10 w-7 animate-flutter-slow pointer-events-none" />
        <ButterflyTiny className="absolute bottom-[38%] right-12 w-6 animate-flutter pointer-events-none" />
        <div className="relative flex flex-col justify-center items-center h-full w-full text-cream px-6 pb-16">
          <MonogramVO
            className="w-24 text-gold-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
            data-aos="fade-down"
            data-aos-duration="2000"
          />
          <p
            className="mt-6 text-sm tracking-[0.3em] text-gold-light font-cinzel"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            THE WEDDING OF
          </p>
          <h1
            className="mt-3 font-cinzel text-[42px] leading-tight tracking-[0.06em] text-gold-light text-center whitespace-nowrap"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="3000"
          >
            Vira <span className="mx-1">&</span> Ogi
          </h1>
          <p
            className="mt-2 font-cinzel text-sm tracking-[0.16em] text-gold-light"
            data-aos="fade-up"
            data-aos-delay="1500"
            data-aos-duration="2000"
          >
            Minggu, 20 September 2026
          </p>
          <Divider
            className="mt-6 w-60 text-gold"
            data-aos="fade-up"
            data-aos-delay="2000"
            data-aos-duration="2000"
          />
          <p
            className="mt-5 text-xs tracking-widest font-lato"
            data-aos="fade-up"
            data-aos-delay="2000"
            data-aos-duration="2000"
          >
            KEPADA YTH. BAPAK/IBU/SAUDARA/I
          </p>
          <span
            data-aos="fade-up"
            data-aos-delay="2500"
            data-aos-duration="2000"
            className="text-gold-light font-bold text-2xl font-great-vibes px-2 py-1 rounded-lg mt-2 capitalize text-center w-80"
          >
            {weddingWish.name}
          </span>
          <button
            data-aos="fade-up"
            data-aos-delay="3000"
            data-aos-duration="2000"
            className="px-6 py-2 bg-gold-light text-maroon-deep font-semibold text-sm font-lato mt-4 rounded-full flex justify-center items-center gap-1"
            onClick={() => handleOnClickOpenInvitation()}
          >
            Buka Undangan
          </button>
        </div>
      </section>

      {isInvitationOpen && (
        <div className={`overflow-hidden`}>
          {/* Pembuka */}
          <section
            className={`h-[calc(100dvh)] bg-ivory w-full overflow-hidden flex flex-col justify-center items-center px-4 ${
              isInvitationOpen && "absolute top-0 left-0"
            }`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-maroon opacity-[0.05]" />
            <PucukRebung className="absolute bottom-0 left-0 w-full h-8 text-maroon" />
            <LaceEdge className="absolute bottom-8 left-0 w-full h-7 text-maroon/60 rotate-180" />
            <ButterflySide className="absolute top-16 right-8 w-9 animate-flutter" />
            <ButterflyTiny className="absolute top-28 left-8 w-6 animate-flutter-slow" />
            <div className="relative flex justify-center items-center gap-4">
              <span
                className="w-10 h-[2px] bg-gold"
                data-aos="fade-down"
                data-aos-duration="2000"
              ></span>
              <MonogramVO
                className="w-14 text-maroon"
                data-aos="fade-down"
                data-aos-duration="3000"
              />
              <span
                className="w-10 h-[2px] bg-gold"
                data-aos="fade-down"
                data-aos-duration="2000"
              ></span>
            </div>
            <h2
              className="relative font-lato text-maroon uppercase mt-2 tracking-[0.15em]"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="500"
            >
              Undangan Pernikahan
            </h2>
            <h3
              className="relative font-lato text-sm text-maroon"
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              Minggu, 20 September 2026
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
              <CoupleCharacter
                label="Vira & Ogi"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="2000"
                data-aos-once="true"
                className="absolute top-[40px] left-8 w-[148px] h-[280px]"
              />
              <SulurCorner
                className="absolute z-20 -top-5 -left-5 w-14 text-gold"
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-delay="3000"
                data-aos-once="true"
              />
              <div
                className="absolute z-20 -bottom-5 -right-5 w-14"
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-delay="3000"
                data-aos-once="true"
              >
                <SulurCorner className="w-full text-gold -scale-x-100 -scale-y-100" />
              </div>
              <TampukManggis
                className="absolute z-20 -top-4 -right-4 w-10"
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-delay="3000"
                data-aos-once="true"
              />
              <TampukManggis
                className="absolute z-20 -bottom-4 -left-4 w-10"
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-delay="3000"
                data-aos-once="true"
              />
            </div>
            <p
              className="relative mt-8 text-maroon text-2xl font-great-vibes"
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="2000"
              data-aos-once="true"
            >
              Vira & Ogi
            </p>
          </section>

          {/* Ayat */}
          <section
            className={`min-h-[calc(75dvh)] w-full bg-maroon py-24 flex justify-center items-center flex-col relative overflow-hidden`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-gold-light opacity-[0.1]" />
            <PucukRebung className="absolute top-0 left-0 w-full h-8 text-gold rotate-180" />
            <LaceEdge className="absolute top-8 left-0 w-full h-7 text-gold/70" />
            <PucukRebung className="absolute bottom-0 left-0 w-full h-8 text-gold" />
            <LaceEdge className="absolute bottom-8 left-0 w-full h-7 text-gold/70 rotate-180" />
            <TampukManggis
              className="w-16 relative"
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-once="true"
            />
            <h1
              className="text-xl text-gold-light font-bold mt-8 text-center relative"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
            </h1>
            <p
              className="mt-8 text-cream text-sm font-lato px-8 text-center leading-6 relative"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
              untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu
              cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di
              antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian
              itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
            </p>
            <p
              className="text-center text-gold-light text-sm mt-4 relative"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-once="true"
            >
              (QS. Ar-Rum: 21)
            </p>
          </section>

          {/* Mempelai */}
          <section
            className={`min-h-[calc(100dvh)] w-full bg-ivory py-2 flex justify-center flex-col relative overflow-hidden`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-maroon opacity-[0.05]" />
            <PucukRebung className="absolute top-0 left-0 w-full h-8 text-maroon rotate-180" />
            <LaceEdge className="absolute top-8 left-0 w-full h-7 text-maroon/60" />
            <div className="absolute top-10 -right-8 w-36 rotate-180 opacity-90">
              <PeonyCorner className="w-full" />
            </div>
            <ButterflyTiny className="absolute top-44 left-6 w-6 animate-flutter" />
            <div className="relative px-4 pt-24 pb-12 flex items-center flex-col text-maroon">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.1em]"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                Kedua Mempelai
              </h2>
              <Divider
                className="mt-4 w-56 text-gold"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              />
              <h3
                className="text-sm mt-6 w-full text-center"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
              </h3>
              <p
                className="text-sm mt-6 text-center leading-6"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                Assalamu'alaikum Warahmatullahi Wabarakatuh. Maha Suci Allah
                yang telah menciptakan makhluk-Nya berpasang-pasangan, ya Allah
                perkenankanlah kami menikahkan putra-putri kami:
              </p>

              <div
                className="mt-16 relative w-64"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <BrideCharacter className="w-full" label="Dean Savira" />
              </div>
              <div className="mt-12">
                <h1
                  className="font-apple tracking-[0.05em] text-3xl text-center text-gold"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Dean Savira
                </h1>
                <p
                  className="mt-4 text-sm text-center w-full"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Putri Kedua dari Bapak Paryanto <br /> dan <br /> Ibu Dewi
                  Asmara
                </p>
              </div>

              <div
                className="font-great-vibes text-3xl my-8"
                data-aos="zoom-in"
                data-aos-duration="2000"
              >
                dengan
              </div>

              <div
                className="relative w-64"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <GroomCharacter className="w-full" label="Bogita Mersa Putra" />
              </div>
              <div className="mt-12">
                <h1
                  className="font-apple tracking-[0.05em] text-3xl text-center text-gold"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Bogita Mersa Putra
                </h1>
                <p
                  className="mt-4 text-sm text-center w-full"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Putra Ketiga dari Bapak Syafril Hadi <br /> dan <br /> Ibu
                  Meri Azrinelti
                </p>
              </div>
            </div>
          </section>

          {/* Save The Date */}
          <section
            className={`w-full bg-maroon-deep pt-20 pb-16 flex justify-center flex-col relative overflow-hidden`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-gold-light opacity-[0.1]" />
            <PucukRebung className="absolute top-0 left-0 w-full h-8 text-gold rotate-180" />
            <LaceEdge className="absolute top-8 left-0 w-full h-7 text-gold/70" />
            <div className="relative px-4 py-8 flex items-center flex-col">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.1em] text-gold-light"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Save The Date
              </h2>
              <TampukManggis
                className="w-14 mt-6"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <p
                className="mt-6 text-cream font-news text-lg"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Minggu
              </p>
              <p
                className="font-great-vibes text-3xl text-gold-light text-center"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                20 September 2026
              </p>
              <ButterflyOpen className="absolute top-2 right-3 w-10 animate-flutter pointer-events-none" />
              <ButterflyTiny className="absolute top-32 left-6 w-6 animate-flutter-slow pointer-events-none" />
              <div className="mt-8">
                <CountDown date={dday} renderer={CountdownRenderer} />
              </div>
              <a
                className="border border-gold text-gold-light px-6 py-2 rounded-full text-xs font-lato mt-8"
                data-aos="fade-up"
                data-aos-duration="2000"
                href="https://www.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Vira+%26+Ogi&dates=20260920T110000/20260920T150000&location=Kediaman+Mempelai+Wanita+%7C+Jl.+Pertamina+RT.+13+%28Depan+SMAN+2+Muaro+Jambi%29%2C+Sengeti%2C+Muaro+Jambi%2C+Jambi%2C+Indonesia&details=Merupakan+suatu+kehormatan+dan+kebahagiaan+bagi+kami+apabila+Bapak%2FIbu%2FSaudara%2Fi+berkenan+hadir+untuk+memberikan+do%27a+restu+%7C+Akad+Nikah+Vira+%26+Ogi+%7C+Minggu%2C+20+September+2026"
                target="_blank"
                rel="nofollow"
              >
                Tambah ke Kalender
              </a>
            </div>
          </section>

          {/* Acara */}
          <section
            className={`min-h-[calc(100dvh)] w-full bg-ivory pt-24 pb-16 flex justify-center flex-col relative overflow-hidden`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-maroon opacity-[0.05]" />
            <PucukRebung className="absolute top-0 left-0 w-full h-8 text-maroon rotate-180" />
            <LaceEdge className="absolute top-8 left-0 w-full h-7 text-maroon/60" />
            <div className="absolute -bottom-4 -left-8 w-40 opacity-90">
              <PeonyCorner className="w-full" />
            </div>
            <ButterflySide className="absolute top-16 right-6 w-9 animate-flutter-slow" />
            <div className="relative px-6 flex items-center flex-col text-maroon">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.1em]"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Waktu & Tempat
              </h2>
              <Divider
                className="mt-4 w-56 text-gold"
                data-aos="fade-up"
                data-aos-duration="2000"
              />
              <p
                className="text-center text-sm leading-6 mt-6 mb-8"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a restu
                kepada putra-putri kami
              </p>
              <GoldCard
                tone="maroon"
                className="w-full max-w-sm"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <div className="flex flex-col items-center text-cream">
                  <TampukManggis className="w-14" />
                  <p className="font-cinzel text-3xl text-center mt-4 text-gold-light">
                    Akad Nikah
                  </p>
                  <p className="font-news text-sm text-center mt-4">
                    Minggu, 20 September 2026
                  </p>
                  <p className="font-news text-xs text-center mt-1">
                    Pukul 11.00 WIB s/d Selesai
                  </p>
                  <Divider className="w-44 mt-6 text-gold" />
                  <p className="font-news text-lg text-center mt-6 leading-5 text-gold-light">
                    Kediaman Mempelai Wanita
                  </p>
                  <p className="font-news text-xs text-center mt-2 leading-4">
                    Jl. Pertamina RT. 13 (Depan SMAN 2 Muaro Jambi), Sengeti,
                    Muaro Jambi
                  </p>
                  <a
                    className="px-6 py-1.5 mt-6 bg-gold-light text-maroon-deep font-semibold rounded-full text-sm"
                    href="https://maps.google.com/?daddr=-1.486287,103.509666"
                    target="_blank"
                    rel="nofollow"
                  >
                    Lihat Peta
                  </a>
                </div>
              </GoldCard>
            </div>
          </section>

          {/* Tanda Kasih */}
          <section
            className={`min-h-[calc(100dvh)] w-full bg-maroon px-4 py-24 flex justify-center flex-col relative overflow-hidden`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-gold-light opacity-[0.1]" />
            <PucukRebung className="absolute top-0 left-0 w-full h-8 text-gold rotate-180" />
            <LaceEdge className="absolute top-8 left-0 w-full h-7 text-gold/70" />
            <PucukRebung className="absolute bottom-0 left-0 w-full h-8 text-gold" />
            <LaceEdge className="absolute bottom-8 left-0 w-full h-7 text-gold/70 rotate-180" />
            <div className="relative px-4 flex items-center flex-col">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.05em] text-gold-light"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Tanda Kasih
              </h2>
              <p
                className="font-news text-center text-sm text-cream mt-6 leading-6"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Kehadiran Bapak/Ibu/Saudara/i merupakan hadiah terindah bagi
                kami. Namun apabila ingin memberikan tanda kasih, dapat melalui:
              </p>

              <GoldCard
                tone="ivory"
                className="w-full max-w-xs mt-8"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <div className="flex flex-col items-center text-maroon">
                  <div className="font-news text-2xl">Bank Mandiri</div>
                  <div className="font-news text-center mt-1" id="acc_num1">
                    1100022166133
                  </div>
                  <div className="font-news text-center -mt-1">
                    an. Dean Savira
                  </div>
                  <button
                    className="font-news text-lg mt-2 border-b-2 border-maroon pb-1"
                    onClick={() => handleOnClickClipboard("acc_num1")}
                  >
                    Salin
                  </button>
                </div>
              </GoldCard>

              <DividerCrest
                className="w-44 mt-6 text-gold-light"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              <GoldCard
                tone="ivory"
                className="w-full max-w-xs mt-6"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <div className="flex flex-col items-center text-maroon">
                  <div className="font-news text-2xl">Bank BCA</div>
                  <div className="font-news text-center mt-1" id="acc_num2">
                    8610404821
                  </div>
                  <div className="font-news text-center -mt-1">
                    an. Bogita Mersa Putra
                  </div>
                  <button
                    className="font-news text-lg mt-2 border-b-2 border-maroon pb-1"
                    onClick={() => handleOnClickClipboard("acc_num2")}
                  >
                    Salin
                  </button>
                </div>
              </GoldCard>
            </div>
          </section>

          {/* Ucapan & Do'a */}
          <section
            className={`min-h-[calc(100dvh)] w-full bg-ivory px-4 pt-24 pb-16 flex justify-start flex-col relative overflow-hidden`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-maroon opacity-[0.05]" />
            <PucukRebung className="absolute top-0 left-0 w-full h-8 text-maroon rotate-180" />
            <LaceEdge className="absolute top-8 left-0 w-full h-7 text-maroon/60" />
            <div className="relative px-4 flex w-full items-center flex-col text-maroon">
              <h2
                className="font-great-vibes text-4xl text-center font-medium tracking-[0.05em]"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Ucapan & Do'a
              </h2>
              <Divider
                className="mt-4 mb-8 w-56 text-gold"
                data-aos="fade-up"
                data-aos-duration="2000"
              />
              <GoldCard
                tone="maroon"
                className="w-full max-w-sm"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                <div className="flex flex-col w-full font-news text-cream">
                  <label htmlFor="name">Nama</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="rounded border border-gold/60 bg-white text-maroon-deep px-2 py-1 disabled:bg-blush/25 capitalize"
                    autoComplete="off"
                    value={weddingWish?.name}
                    onChange={(e) => handleOnChange(e)}
                    disabled
                  />
                  <label htmlFor="wish" className="mt-4">
                    Ucapan / Do'a
                  </label>
                  <textarea
                    id="wish"
                    name="wish"
                    className="rounded border border-gold/60 bg-white text-maroon-deep px-2 py-1"
                    value={weddingWish?.wish}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <button
                    className="bg-gold-light text-maroon-deep font-semibold text-xs rounded px-4 py-1.5 mt-4 self-start"
                    onClick={() => handleOnClickSend()}
                  >
                    Kirim
                  </button>
                </div>
              </GoldCard>
              <DividerCrest
                className="w-44 mt-8 text-gold"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />
              {listWeddingWish.length > 0 && (
                <>
                  <div
                    className="bg-white border-2 border-gold w-full rounded-xl p-4 mt-12 font-news text-maroon"
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
                        <p className="leading-4 mt-2 text-xs text-justify normal-case first-letter:uppercase text-black whitespace-pre-line">
                          {wish?.wish}
                        </p>
                        <div className="flex justify-center items-center">
                          <hr className="mt-2 w-12 border-maroon" />
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
                      className="bg-maroon px-4 py-1 text-cream rounded disabled:opacity-50"
                      disabled={page === 0}
                      onClick={() => setPage(page - 5)}
                    >
                      Sebelumnya
                    </button>
                    <button
                      className="bg-maroon px-4 py-1 text-cream rounded disabled:opacity-50"
                      disabled={page + 5 >= weddingWishLength}
                      onClick={() => setPage(page + 5)}
                    >
                      Berikutnya
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Penutup */}
          <section
            className={`min-h-[calc(60dvh)] w-full bg-gradient-to-b from-maroon to-maroon-deep px-4 pt-14 pb-16 flex justify-center items-center flex-col relative overflow-hidden`}
          >
            <SongketPattern className="absolute inset-0 h-full w-full text-gold-light opacity-[0.1]" />
            <PucukRebung className="absolute top-0 left-0 w-full h-8 text-gold rotate-180" />
            <LaceEdge className="absolute top-8 left-0 w-full h-7 text-gold/70" />
            <div className="absolute -bottom-8 -left-9 w-40 animate-sway origin-bottom-left pointer-events-none">
              <PeonyCorner className="w-full" />
            </div>
            <div className="absolute -bottom-8 -right-9 w-40 -scale-x-100 animate-sway origin-bottom-left pointer-events-none">
              <PeonyCorner className="w-full" />
            </div>
            <ButterflyTiny className="absolute top-16 left-8 w-6 animate-flutter" />
            <ButterflyTiny className="absolute top-24 right-10 w-7 animate-flutter-slow" />
            <div className="relative flex flex-col items-center text-center text-cream">
              <AngsoDuo
                className="w-52"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              />
              <MonogramVO
                className="w-24 text-gold-light mt-2"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              />
              <div
                className="mt-2 font-news text-2xl"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              >
                20 . 09 . 2026
              </div>
              <Divider
                className="mt-4 w-56 text-gold"
                data-aos="fade-down"
                data-aos-duration="3000"
                data-aos-once="true"
              />
              <p
                className="mt-6 font-news text-sm"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                Kami yang berbahagia,
              </p>
              <p
                className="mt-2 px-6 font-news text-xs leading-5 text-cream/90"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-once="true"
              >
                Keluarga Besar Bapak Paryanto & Ibu Dewi Asmara
                <br />
                Keluarga Besar Bapak Syafril Hadi & Ibu Meri Azrinelti
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
