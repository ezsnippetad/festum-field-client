import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import titleStroke from "../../assets/images/titel-strok.png";
import HeroBanner from "../../assets/images/hero-banner.png";
import AllDevices from "../../assets/images/devices.png";
import Logo from "../../assets/images/logo.png";
import FooterLogo from "../../assets/images/FooterLogo.png";
import GooglePlayBtn from "../../assets/images/google-play-btn.png";
import AppStorebtn from "../../assets/images/app-Store-btn.png";
import WhoAreYou from "../../assets/images/who-are-you.png";
import OurFeatures from "../../assets/images/our-Features.png";
import ShowcaseBg from "../../assets/images/showcase.png";
import PromotionLeft from "../../assets/images/promotionleft.png";
import PromotionRight from "../../assets/images/promotionright.png";
import WhoWeArebg from "../../assets/images/who-we-arebg.png";
import WhoWeAre from "../../assets/images/who-we-are.png";
import OurCompany from "../../assets/images/our-company1.png";
import OurCompany2 from "../../assets/images/our-company2.png";
import Ff from "../../assets/images/FF.png";
import Fe from "../../assets/images/FE.png";
import Ep from "../../assets/images/EP.svg";
import Fam from "../../assets/images/festumadvertising.png";
import Pam from "../../assets/images/perfact.png";
import FCoin from "../../assets/images/F-coin.png";
import ContactUs from "../../assets/images/contactus.png";
import Support from "../../assets/images/support.png";
import ContactStrok from "../../assets/images/contact-strok.png";
import ContactStrok2 from "../../assets/images/contact-strok2.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  console.log(React.useRef(null), "React.useRef(null)");

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const navigate = useNavigate()
  return (
    <>
      <header className="fixed landing-header top-0 inset-x-0 z-40 nav-down border-b-0 block bg-transparent px-0">
        <div className="wrapperlanding">
          <div className="flex flex-wrap items-center justify-between space-x-0 md:space-x-5 bg-white px-3 md:px-7 py-2 md:py-3">
            <img
              src={Logo}
              className="w-32 sm:w-40 lg:w-48 h-auto"
              width="239"
              height="49"
              viewBox="0 0 239 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            />
            <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 md:space-x-8 lg:order-3">
              <a href="#">
                <svg
                  className="w-4 md:w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.8905 5.67183H11.5801L9.85464 0.481309C9.75911 0.19392 9.49029 0 9.18743 0H2.10936C0.946258 0 0 0.946258 0 2.10936V16.2186C0 17.3817 0.946258 18.328 2.10936 18.328H9.85759L11.5689 23.5047C11.6635 23.8079 11.9439 24 12.2406 24C12.2422 24 12.2439 23.9998 12.2455 23.9998H21.8905C23.0536 23.9998 23.9999 23.0536 23.9999 21.8905V7.78119C23.9998 6.61809 23.0536 5.67183 21.8905 5.67183ZM2.10936 16.9217C1.72166 16.9217 1.40624 16.6063 1.40624 16.2186V2.10936C1.40624 1.72166 1.72166 1.40624 2.10936 1.40624H8.6802L13.8377 16.9217C11.2037 16.9217 4.71006 16.9217 2.10936 16.9217ZM13.7216 18.328L12.3434 21.3674L11.3387 18.328H13.7216ZM22.5936 21.8905C22.5936 22.2782 22.2782 22.5936 21.8905 22.5936H13.3315L15.4527 17.9152C15.5288 17.7474 15.5324 17.5616 15.4795 17.4028L12.0475 7.07807H21.8905C22.2782 7.07807 22.5936 7.39349 22.5936 7.78119V21.8905Z"
                    className="fill-current"
                  ></path>
                  <path
                    d="M9.18745 8.48435H7.07809C6.68978 8.48435 6.37497 8.79916 6.37497 9.18747C6.37497 9.57578 6.68978 9.89059 7.07809 9.89059H8.36339C8.07315 10.709 7.29161 11.2968 6.37497 11.2968C5.21187 11.2968 4.26561 10.3506 4.26561 9.18747C4.26561 8.02437 5.21187 7.07811 6.37497 7.07811C6.93841 7.07811 7.46809 7.29753 7.86652 7.69592C8.14107 7.97051 8.58628 7.97051 8.86087 7.69592C9.13542 7.42133 9.13542 6.97616 8.86087 6.70157C8.19685 6.03754 7.31401 5.67188 6.37497 5.67188C4.43647 5.67188 2.85938 7.24897 2.85938 9.18747C2.85938 11.126 4.43647 12.7031 6.37497 12.7031C8.31347 12.7031 9.89057 11.126 9.89057 9.18747C9.89057 8.79916 9.57576 8.48435 9.18745 8.48435Z"
                    className="fill-current"
                  ></path>
                  <path
                    d="M20.4355 11.2968H18.3261V10.5937C18.3261 10.2054 18.0113 9.89056 17.623 9.89056C17.2347 9.89056 16.9199 10.2054 16.9199 10.5937V11.2968H14.8105C14.4222 11.2968 14.1074 11.6116 14.1074 11.9999C14.1074 12.3882 14.4222 12.703 14.8105 12.703H18.8952C18.6715 13.368 18.1911 14.156 17.6324 14.9143C17.5121 14.7518 17.3933 14.5856 17.2787 14.417C17.0603 14.0959 16.623 14.0126 16.3019 14.231C15.9808 14.4493 15.8975 14.8866 16.1159 15.2078C16.3131 15.4979 16.5199 15.7802 16.726 16.0477C16.3747 16.4553 16.0283 16.8244 15.7244 17.123C15.4472 17.395 15.443 17.8402 15.7149 18.1173C15.9858 18.3934 16.4309 18.3999 16.7092 18.1268C16.7335 18.1029 17.117 17.7252 17.6291 17.1453C18.1289 17.7172 18.5031 18.0931 18.5321 18.1221C18.8066 18.3965 19.2516 18.3967 19.5262 18.1222C19.8008 17.8477 19.801 17.4025 19.5266 17.1279C19.5192 17.1205 19.0887 16.6876 18.5394 16.047C19.5347 14.7604 20.1415 13.6396 20.3517 12.703H20.4355C20.8238 12.703 21.1386 12.3882 21.1386 11.9999C21.1386 11.6116 20.8238 11.2968 20.4355 11.2968Z"
                    className="fill-current"
                  ></path>
                </svg>
              </a>
              <button className="btn-primary-landing uppercase">Contact Us</button>
              {/*<button className="btn-primary-landing uppercase" onClick={() => { navigate("/dashboard") }} >Register</button>*/}
              <svg
                className="w-5 md:w-7 h-auto cursor-pointer fill-current hover:text-ev-sky anim xl:hidden"
                onclick="toggleActive('nav', 'hidden')"
                viewBox="0 0 100 80"
                width="40"
                height="40"
              >
                <rect width="100" height="15"></rect>
                <rect y="30" width="100" height="15"></rect>
                <rect y="60" width="100" height="15"></rect>
              </svg>
            </div>
            <nav className="w-full lg:w-auto py-4 lg:py-0 lg:order-2 text-center hidden xl:block">
              <ul className="flex flex-wrap space-y-2 lg:space-y-0 lg:space-x-8">
                <li className="w-full lg:w-auto">
                  <a href="#" className="block">
                    Home
                  </a>
                </li>
                <li className="w-full lg:w-auto">
                  <a href="#" className="block">
                    About
                  </a>
                </li>
                <li className="w-full lg:w-auto">
                  <a href="#" className="block">
                    Feature
                  </a>
                </li>
                <li className="w-full lg:w-auto">
                  <a href="#" className="block">
                    Showcase
                  </a>
                </li>
                <li className="w-full lg:w-auto">
                  <a href="#" className="block">
                    F+ Coin
                  </a>
                </li>
                <li className="w-full lg:w-auto">
                  <a href="#" className="block">
                    About Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className="banner relative">
        <img
          src={HeroBanner}
          className="w-auto h-full absolute inset-0 -z-10"
          alt="hero-banner"
        />
        <div className="wrapperlanding pt-32 md:pt-40 lg:pt-60 space-y-9 2xl:space-y-16 text-center">
          <div className="text-white w-full max-w-5xl mx-auto space-y-2 md:space-y-6">
            <p className="font-semibold md:font-bold text-xs md:text-base lg:text-lg text-white">
              Form New Connections, Create Business Profiles, Make Reels
            </p>
            <h1 className="h1 px-6 sm:max-w-5xl mx-auto">
              Connect, Scale Up, and Express with Festum Field
            </h1>
          </div>
          <img
            className="max-w-full w-auto h-auto mx-auto xl:pt-10 lg:translate-y-16"
            src={AllDevices}
            alt="All Devices"
          />
        </div>
      </section>

      <section className="py-14 lg:py-24 xl:py-40">
        <div className="wrapperlanding">
          <div className="title text-center py-5 md:py-8 lg:py-12 space-y-3 lg:space-y-10">
            <div className="w-max px-6 relative mx-auto">
              <h2 className="h2 min-w-max inline-block">Who are you?</h2>
              <img
                src={titleStroke}
                alt="titel-strok"
                className="mx-auto absolute inset-x-0 top-full w-full object-cover mt-0.5"
              />
            </div>
            <p className="text-sm md:text-lg lg:text-xl font-pop font-medium text-ev-lightgray max-w-6xl mx-auto">
              Whether you are a social geek or a business person, Festum Field helps both kinds of users seamlessly interact, promote, and grow.
            </p>
          </div>
          <div className="flex items-center flex-wrap">
            <div className="w-full md:w-1/2 md:order-2 text-right md:pl-8">
              <img src={WhoAreYou} alt="who-are-you" />
            </div>
            <div className="w-full md:w-1/2 md:order-1">
              <div className="w-full flex flex-col md:flex-row py-7 xl:py-6">
                <div>
                  <div className="icon mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-[#C0F7FC]">
                    <svg
                      className="w-6 xl:w-7 h-auto"
                      width="26"
                      height="30"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.6 27.42V22.92C25.6 21.66 25.42 20.4 24.7 19.14C23.98 17.88 23.08 16.8 21.82 16.08C20.56 15.18 17.86 15 16.6 15L13.72 18.06L14.8 20.4V25.8L13 27.78L11.2 25.8V20.4L12.46 18.06L9.40003 15C7.96003 15 5.26003 15.18 4.00002 16.08C2.74002 16.8 2.02002 17.88 1.30002 19.14C0.580024 20.4 0.400024 21.48 0.400024 22.92V27.42C0.400024 27.42 5.08002 29.4 13 29.4C20.92 29.4 25.6 27.42 25.6 27.42ZM13 0.780029C9.58003 0.780029 7.60003 4.02003 8.14003 7.62003C8.68003 11.22 10.48 13.74 13 13.74C15.52 13.74 17.32 11.22 17.86 7.62003C18.4 3.84003 16.42 0.780029 13 0.780029Z"
                        fill="#5AC8D2"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="md:pl-5 xl:pl-12 max-w-[600px] space-y-2 xl:space-y-4">
                  <h3 className="h3">Are You a Social User?</h3>
                  <p className="text-base text-gray-400 font-medium">
                    Individuals looking to connect with friends, family, and like-minded individuals can communicate, share experiences, and engage in group activities within the platform's chat, group chat, voice call, video call features.
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row py-7 xl:py-6">
                <div>
                  <div className="icon mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-[#C0F7FC]">
                    <svg
                      className="w-6 xl:w-7 h-auto"
                      width="30"
                      height="28"
                      viewBox="0 0 30 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.3185 7.64362C18.3185 11.6093 15.0734 14.7872 11.024 14.7872C6.97604 14.7872 3.72946 11.6093 3.72946 7.64362C3.72946 3.67798 6.97604 0.5 11.024 0.5C15.0734 0.5 18.3185 3.67798 18.3185 7.64362ZM0 22.8761C0 19.2051 5.07829 18.2866 11.024 18.2866C17.002 18.2866 22.048 19.2367 22.048 22.9105C22.048 26.5815 16.9697 27.5 11.024 27.5C5.046 27.5 0 26.5499 0 22.8761ZM21.2601 7.77312C21.2601 9.7926 20.6408 11.677 19.5546 13.2422C19.4416 13.4032 19.5414 13.6203 19.7381 13.6547C20.0111 13.6993 20.2914 13.7266 20.5776 13.7324C23.425 13.8057 25.9803 12.0104 26.6863 9.30677C27.7327 5.29514 24.6623 1.69314 20.7508 1.69314C20.3267 1.69314 19.9201 1.73626 19.5238 1.81532C19.4695 1.82682 19.4108 1.85269 19.3815 1.89868C19.3433 1.95761 19.3712 2.03379 19.4093 2.0841C20.585 3.69824 21.2601 5.6631 21.2601 7.77312ZM25.9759 16.5534C27.8898 16.92 29.1476 17.666 29.6687 18.754C30.1104 19.6452 30.1104 20.6801 29.6687 21.5712C28.8717 23.2558 26.3003 23.7977 25.3007 23.9371C25.0938 23.9659 24.9279 23.7934 24.95 23.5893C25.4607 18.9208 21.3996 16.7072 20.3487 16.1984C20.3046 16.174 20.2944 16.1395 20.2988 16.1165C20.3017 16.1021 20.3208 16.0791 20.3546 16.0748C22.628 16.0317 25.0733 16.3378 25.9759 16.5534Z"
                        fill="#5AC8D2"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="md:pl-5 xl:pl-12 max-w-[600px] space-y-2 xl:space-y-4">
                  <h3 className="h3">Are You an Entrepreneur?</h3>
                  <p className="text-base text-gray-400 font-medium">
                    Businesses and entrepreneurs seeking a platform to promote their brands may showcase their products/services, conduct business-related activities, and engage with their target audience using Festum Field's business-oriented tools.
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row py-7 xl:py-6">
                <div>
                  <div className="icon mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-[#C0F7FC]">
                    <svg
                        className="w-6 xl:w-7 h-auto"
                        width="30"
                        height="28"
                        viewBox="0 0 30 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18.3185 7.64362C18.3185 11.6093 15.0734 14.7872 11.024 14.7872C6.97604 14.7872 3.72946 11.6093 3.72946 7.64362C3.72946 3.67798 6.97604 0.5 11.024 0.5C15.0734 0.5 18.3185 3.67798 18.3185 7.64362ZM0 22.8761C0 19.2051 5.07829 18.2866 11.024 18.2866C17.002 18.2866 22.048 19.2367 22.048 22.9105C22.048 26.5815 16.9697 27.5 11.024 27.5C5.046 27.5 0 26.5499 0 22.8761ZM21.2601 7.77312C21.2601 9.7926 20.6408 11.677 19.5546 13.2422C19.4416 13.4032 19.5414 13.6203 19.7381 13.6547C20.0111 13.6993 20.2914 13.7266 20.5776 13.7324C23.425 13.8057 25.9803 12.0104 26.6863 9.30677C27.7327 5.29514 24.6623 1.69314 20.7508 1.69314C20.3267 1.69314 19.9201 1.73626 19.5238 1.81532C19.4695 1.82682 19.4108 1.85269 19.3815 1.89868C19.3433 1.95761 19.3712 2.03379 19.4093 2.0841C20.585 3.69824 21.2601 5.6631 21.2601 7.77312ZM25.9759 16.5534C27.8898 16.92 29.1476 17.666 29.6687 18.754C30.1104 19.6452 30.1104 20.6801 29.6687 21.5712C28.8717 23.2558 26.3003 23.7977 25.3007 23.9371C25.0938 23.9659 24.9279 23.7934 24.95 23.5893C25.4607 18.9208 21.3996 16.7072 20.3487 16.1984C20.3046 16.174 20.2944 16.1395 20.2988 16.1165C20.3017 16.1021 20.3208 16.0791 20.3546 16.0748C22.628 16.0317 25.0733 16.3378 25.9759 16.5534Z"
                          fill="#5AC8D2"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="md:pl-5 xl:pl-12 max-w-[600px] space-y-2 xl:space-y-4">
                  <h3 className="h3">Are You a Content Creator?</h3>
                  <p className="text-base text-gray-400 font-medium">
                    Content creators can showcase their creativity through short, engaging videos, gaining more visibility. The Reels feature provides a canvas for users to express their talents, ideas, and stories in innovative ways, allowing them to attract a wider audience and increase followership.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <a href="" className="inline-block">
                  <img src={GooglePlayBtn} alt="google-play-btn" />
                </a>
                <a href="" className="inline-block">
                  <img src={AppStorebtn} alt="app-Store-btn" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white relative py-14 lg:py-20">
        <img
          src={OurFeatures}
          className="w-full h-full absolute inset-0 object-cover sm:object-none"
          alt="our-Features"
        />
        <div className="wrapperlanding relative">
          <div className="title text-center py-5 md:py-8 lg:py-12">
            <div className="w-max px-6 relative mx-auto">
              <h2 className="h2 min-w-max inline-block">Our Features</h2>
              <img
                src={titleStroke}
                alt="titel-strok"
                className="mx-auto absolute inset-x-0 top-full w-full object-cover mt-0.5"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap ">
            <div className="block rounded-xl w-full sm:w-1/2 md:w-1/3 p-4 md:min-h-[300px]">
              <div className="text-center">
                <div className="w-16 mx-auto h-16 p-3 bg- flex items-center justify-center bg-[#C0F7FC] rounded-md">
                  <svg
                    width="30"
                    height="30"
                    className="h-8 w-8 text-ev-sky mx-auto"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.5291 0.541343C5.57077 1.6623 1.68021 5.47286 0.486554 10.3774C-0.166146 13.0592 -0.160183 15.8811 0.492517 18.5629C1.70484 23.5441 5.27097 27.6897 10.0549 29.6213L10.2634 29.7055C12.3336 30.5414 14.7051 29.5347 15.5546 27.4836C15.7883 26.9191 16.345 26.5446 16.9601 26.5446H18.8331C23.9274 26.5446 28.3589 23.0832 29.5547 18.1701C30.1484 15.7304 30.1484 13.1854 29.5547 10.7457L29.3979 10.1015C28.2454 5.36597 24.4889 1.68673 19.7014 0.604403L19.0289 0.452356C16.361 -0.150785 13.5906 -0.150786 10.9227 0.452356L10.5291 0.541343ZM9.16991 8.94448C8.52861 8.94448 8.00873 9.46027 8.00873 10.0965C8.00873 10.7328 8.52861 11.2486 9.16991 11.2486H19.814C20.4553 11.2486 20.9752 10.7328 20.9752 10.0965C20.9752 9.46027 20.4553 8.94448 19.814 8.94448H9.16991ZM11.1052 14.7048C10.4639 14.7048 9.94403 15.2205 9.94403 15.8568C9.94403 16.4931 10.4639 17.0089 11.1052 17.0089H17.8787C18.52 17.0089 19.0399 16.4931 19.0399 15.8568C19.0399 15.2205 18.52 14.7048 17.8787 14.7048H11.1052Z"
                      fill="#5AC8D2"
                    ></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl lg:text-3xl font-bold text-ev-dark">
                  Group Chat
                </h3>
                <p className="mt-2 max-w-[300px] text-base mx-auto font-medium text-ev-lightgray">
                  Engage in seamless communication with your friends or coworkers in a single conversation area.
                </p>
              </div>
            </div>
            <div className="block rounded-xl w-full sm:w-1/2 md:w-1/3 p-4 md:min-h-[300px]">
              <div className="text-center">
                <div className="w-16 mx-auto h-16 p-3 bg-[#C0F7FC] rounded-md flex items-center justify-center ">
                  <svg
                    width="38"
                    height="30"
                    viewBox="0 0 38 30"
                    className="h-8 w-8 text-ev-sky mx-auto"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.4705 1.58547C24.8501 2.3775 27.5528 4.85799 28.4731 8.05824L29.7634 7.29065C33.0588 5.33008 37.3334 7.58529 37.3334 11.2845L37.3334 19.3239C37.3334 22.825 33.4627 25.1021 30.173 23.5364L28.2475 22.62C27.1609 25.4896 24.6072 27.6793 21.4705 28.4144C17.2243 29.4095 12.7392 29.4215 8.48751 28.4251C4.98672 27.6047 2.27586 24.9681 1.48951 21.6188L1.38038 21.154C0.42887 17.1013 0.428871 12.8986 1.38038 8.84583L1.48951 8.381C2.27586 5.03175 4.98672 2.39515 8.48751 1.57472C12.7392 0.578318 17.2243 0.590357 21.4705 1.58547ZM28.9843 19.7468C29.5224 16.8794 29.569 13.9495 29.1243 11.0712L31.3689 9.73585C32.6467 8.97563 34.3042 9.85009 34.3042 11.2845L34.3042 19.3239C34.3042 20.6815 32.8033 21.5644 31.5277 20.9573L28.9843 19.7468Z"
                      fill="#5AC8D2"
                    ></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl lg:text-3xl font-bold text-ev-dark">
                  Make Reels
                </h3>
                <p className="mt-2 max-w-[300px] text-base mx-auto font-medium text-ev-lightgray">
                  Create brief, compelling videos to showcase your creative abilities and tell others your stories.
                </p>
              </div>
            </div>
            <div className="block rounded-xl w-full sm:w-1/2 md:w-1/3 p-4 md:min-h-[300px]">
              <div className="text-center">
                <div className="w-16 mx-auto h-16 p-3 bg-[#C0F7FC] rounded-md flex items-center justify-center ">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    className="h-8 w-8 text-ev-sky mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.9504 0.572831C16.6943 -0.190944 13.3057 -0.190943 10.0496 0.572832C5.34736 1.67582 1.67583 5.34735 0.572833 10.0496C-0.190944 13.3057 -0.190944 16.6943 0.572833 19.9504C1.67583 24.6527 5.34736 28.3242 10.0496 29.4272C13.3057 30.1909 16.6943 30.1909 19.9504 29.4272C24.6526 28.3242 28.3242 24.6526 29.4272 19.9504C30.1909 16.6943 30.1909 13.3057 29.4272 10.0496C28.3242 5.34736 24.6526 1.67582 19.9504 0.572831ZM15 9.57534C13.3258 9.57534 11.9686 10.9325 11.9686 12.6067C11.9686 13.6572 12.5021 14.5835 13.3174 15.1288C13.6735 15.367 13.828 15.8129 13.6956 16.2204L12.6006 19.5891C12.4666 20.0015 12.7739 20.4246 13.2075 20.4246H16.7925C17.2261 20.4246 17.5334 20.0015 17.3994 19.5891L16.3045 16.2204C16.172 15.8129 16.3265 15.367 16.6826 15.1288C17.4979 14.5835 18.0314 13.6572 18.0314 12.6067C18.0314 10.9325 16.6742 9.57534 15 9.57534ZM10.054 12.6067C10.054 9.87515 12.2684 7.66076 15 7.66076C17.7316 7.66076 19.946 9.87515 19.946 12.6067C19.946 14.0558 19.3223 15.3589 18.3313 16.2625L19.2202 18.9973C19.7563 20.6467 18.5268 22.3392 16.7925 22.3392H13.2075C11.4732 22.3392 10.2437 20.6467 10.7798 18.9973L11.6687 16.2625C10.6778 15.3589 10.054 14.0558 10.054 12.6067Z"
                      fill="#5AC8D2"
                    ></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl lg:text-3xl font-bold text-ev-dark">
                  Privacy
                </h3>
                <p className="mt-2 max-w-[300px] text-base mx-auto font-medium text-ev-lightgray">
                  Have control over your conversations and information to make sure they are safe and secure.
                </p>
              </div>
            </div>
            <div className="block rounded-xl w-full sm:w-1/2 md:w-1/3 p-4 md:min-h-[300px]">
              <div className="text-center">
                <div className="w-16 mx-auto h-16 p-3 bg-[#C0F7FC] rounded-md flex items-center justify-center ">
                  <svg
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.00246 15.7958C0.945464 24.0788 7.61399 30.8397 15.897 30.8967C24.1801 30.9537 30.941 24.2852 30.998 16.0022C31.055 7.71913 24.3865 0.958191 16.1034 0.901197C7.82039 0.844202 1.05945 7.51273 1.00246 15.7958Z"
                      fill="url(#paint0_linear_8767_256)"
                    />
                    <path
                      d="M16 30.0148C24.2832 30.0148 30.9981 23.2999 30.9981 15.0167C30.9981 6.73344 24.2832 0.0185547 16 0.0185547C7.71672 0.0185547 1.00183 6.73344 1.00183 15.0167C1.00183 23.2999 7.71672 30.0148 16 30.0148Z"
                      fill="#5AC8D2"
                    />
                    <g filter="url(#filter0_i_8767_256)">
                      <path
                        d="M16.0001 27.3681C22.8216 27.3681 28.3515 21.8382 28.3515 15.0167C28.3515 8.19519 22.8216 2.66528 16.0001 2.66528C9.17859 2.66528 3.64868 8.19519 3.64868 15.0167C3.64868 21.8382 9.17859 27.3681 16.0001 27.3681Z"
                        fill="#5AC8D2"
                      />
                    </g>
                    <path
                      d="M18.0914 9.54688C18.6905 9.54688 19.1761 10.0325 19.1761 10.6316V10.6316C19.1761 11.2306 18.6905 11.7163 18.0914 11.7163H16.2008C15.6485 11.7163 15.2008 12.164 15.2008 12.7163V14.0599H17.1223C17.7039 14.0599 18.1753 14.5313 18.1753 15.1129V15.1129C18.1753 15.6945 17.7039 16.166 17.1223 16.166H15.2008V19.4747C15.2008 20.1311 14.6687 20.6631 14.0124 20.6631V20.6631C13.356 20.6631 12.824 20.1311 12.824 19.4747V11.0469C12.824 10.2184 13.4955 9.54688 14.324 9.54688H18.0914Z"
                      fill="white"
                    />
                    <defs>
                      <filter
                        id="filter0_i_8767_256"
                        x="3.64868"
                        y="2.66528"
                        width="24.7028"
                        height="24.7029"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow_8767_256"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_8767_256"
                        x1="34.4498"
                        y1="-1.26139"
                        x2="23.924"
                        y2="29.3409"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#003F7D" />
                        <stop offset="0.839127" stopColor="#5BC3CD" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl lg:text-3xl font-bold text-ev-dark">
                  F-Coin
                </h3>
                <p className="mt-2 max-w-[300px] text-base mx-auto font-medium text-ev-lightgray">
                  Share with others and earn rewards as you engage and participate within the Festum Field platform.
                </p>
              </div>
            </div>
            <div className="block rounded-xl w-full sm:w-1/2 md:w-1/3 p-4 md:min-h-[300px]">
              <div className="text-center">
                <div className="w-16 mx-auto h-16 p-3 bg-[#C0F7FC] rounded-md flex items-center justify-center ">
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 24 30"
                    fill="none"
                    className="h-8 w-8 text-ev-sky mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9999 0C7.94301 0 4.65424 3.26193 4.65424 7.28571C4.65424 11.3095 7.94301 14.5714 11.9999 14.5714C16.0568 14.5714 19.3456 11.3095 19.3456 7.28571C19.3456 3.26193 16.0568 0 11.9999 0Z"
                      fill="#5AC8D2"
                    ></path>
                    <path
                      d="M16.3349 17.8128C13.4631 17.3582 10.5368 17.3582 7.66499 17.8128L7.35716 17.8615C3.31071 18.502 0.333252 21.9638 0.333252 26.0281C0.333252 28.2217 2.12619 30 4.33789 30H19.662C21.8737 30 23.6666 28.2217 23.6666 26.0281C23.6666 21.9638 20.6891 18.502 16.6427 17.8615L16.3349 17.8128Z"
                      fill="#5AC8D2"
                    ></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl lg:text-3xl font-bold text-ev-dark">
                  Business Profile
                </h3>
                <p className="mt-2 max-w-[300px] text-base mx-auto font-medium text-ev-lightgray">
                  With a dedicated business account, you can connect with your customers, highlight your goods and services, and build brand awareness.
                </p>
              </div>
            </div>
            <div className="block rounded-xl w-full sm:w-1/2 md:w-1/3 p-4 md:min-h-[300px]">
              <div className="text-center">
                <div className="w-16 mx-auto h-16 p-3 bg-[#C0F7FC] rounded-md flex items-center justify-center ">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    className="h-8 w-8 text-ev-sky mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3314 28.8888C13.0189 28.5387 12.6639 28.1413 12.394 28.0888C11.9577 28.1073 11.5345 28.2433 11.1691 28.4825L11.1778 28.4762C10.7366 28.7357 10.2446 28.8969 9.73544 28.9487L9.72044 28.95H9.70794C9.55051 28.9502 9.39461 28.9192 9.24923 28.8587L9.25673 28.8613C8.64303 28.6063 8.3943 27.8962 8.15682 27.2087C8.06159 26.7948 7.86535 26.4109 7.58562 26.0912L7.58812 26.0938C7.37197 25.9888 7.13117 25.9451 6.89193 25.9675H6.89693C6.71444 25.9675 6.52196 25.9788 6.32947 25.99C6.12199 26.0025 5.91451 26.0125 5.71702 26.0125C5.47987 26.0349 5.24064 26.0102 5.01306 25.9398C4.78548 25.8694 4.57404 25.7548 4.39088 25.6025L4.39338 25.605C4.19673 25.3246 4.06118 25.006 3.99551 24.6699C3.92984 24.3337 3.93551 23.9876 4.01217 23.6538L4.00967 23.67C4.0829 23.2425 4.04679 22.8035 3.90467 22.3938L3.90967 22.4125C3.59585 22.1366 3.21897 21.9421 2.81227 21.8462L2.79477 21.8425C2.10732 21.6038 1.39488 21.3563 1.1424 20.7425C1.06998 20.4115 1.06736 20.069 1.13472 19.7369C1.20208 19.4048 1.33794 19.0904 1.53362 18.8137L1.52862 18.8213C1.75698 18.4547 1.88897 18.0363 1.91234 17.605V17.5988C1.85984 17.3275 1.46238 16.9738 1.11241 16.6613C0.564953 16.1763 0 15.6725 0 14.9987C0 14.325 0.564953 13.8213 1.11116 13.3325C1.46113 13.02 1.8586 12.665 1.91109 12.395C1.88572 11.9595 1.75026 11.5376 1.51737 11.1688L1.52362 11.1788C1.32849 10.9 1.19377 10.5835 1.12812 10.2497C1.06247 9.9158 1.06734 9.57188 1.1424 9.24L1.1399 9.25625C1.39488 8.6425 2.10482 8.39375 2.79227 8.15625C3.22473 8.055 3.60095 7.85625 3.90967 7.58375L3.90717 7.58625C4.04808 7.177 4.08165 6.73843 4.00467 6.3125L4.00717 6.3275C3.9335 5.99435 3.92991 5.64951 3.99661 5.3149C4.06331 4.98028 4.19886 4.66319 4.39463 4.38375L4.38963 4.39125C4.57374 4.23953 4.78599 4.12566 5.01421 4.05616C5.24242 3.98666 5.48211 3.9629 5.71952 3.98625H5.71202C5.91201 3.98625 6.11824 3.9975 6.32447 4.00875C6.51696 4.02 6.70944 4.03125 6.89193 4.03125C7.13222 4.05326 7.37394 4.00872 7.59062 3.9025L7.58312 3.90625C7.85185 3.59875 8.05058 3.22375 8.14807 2.80875L8.15182 2.79125C8.3918 2.10375 8.63928 1.39125 9.25173 1.13875C9.39488 1.08006 9.54823 1.05033 9.70294 1.05125H9.71669H9.71544C10.2604 1.1075 10.7554 1.27625 11.1916 1.53375L11.1741 1.525C11.5349 1.76231 11.9537 1.89672 12.3852 1.91375H12.3902C12.6614 1.86125 13.0152 1.46375 13.3276 1.11375C13.8201 0.565 14.3251 0 14.9987 0C15.6724 0 16.1762 0.565 16.6649 1.1125C16.9773 1.4625 17.3323 1.86 17.6023 1.9125C18.0385 1.89236 18.4614 1.75599 18.8272 1.5175L18.8172 1.52375C19.2588 1.26432 19.7512 1.10356 20.2608 1.0525L20.2758 1.05125H20.2883C20.4508 1.05125 20.6058 1.08375 20.747 1.1425L20.7395 1.14C21.3532 1.395 21.6019 2.105 21.8394 2.7925C21.9407 3.225 22.1394 3.6 22.4106 3.91L22.4081 3.9075C22.6247 4.01233 22.8661 4.05517 23.1056 4.03125H23.1006C23.2831 4.03125 23.4755 4.02 23.668 4.01C23.8755 3.99875 24.083 3.9875 24.2805 3.9875C24.5178 3.96531 24.7572 3.9901 24.985 4.06045C25.2127 4.1308 25.4244 4.24533 25.6079 4.3975L25.6054 4.395C25.8014 4.6757 25.9365 4.99434 26.0019 5.3304C26.0673 5.66646 26.0617 6.0125 25.9853 6.34625L25.9878 6.33C25.9144 6.75754 25.951 7.19674 26.0941 7.60625L26.0891 7.58875C26.3953 7.85875 26.7715 8.0575 27.1865 8.15375L27.204 8.1575C27.8914 8.3975 28.6039 8.645 28.8563 9.2575C28.928 9.5885 28.9304 9.93075 28.8633 10.2627C28.7962 10.5947 28.661 10.9091 28.4664 11.1863L28.4714 11.1788C28.2424 11.5426 28.1091 11.9584 28.0839 12.3875V12.395C28.1364 12.6663 28.5339 13.02 28.8838 13.3325C29.435 13.8238 30 14.3275 30 15.0013C30 15.675 29.435 16.18 28.8876 16.6688C28.5376 16.9813 28.1402 17.335 28.0877 17.6063C28.1152 18.06 28.2564 18.4762 28.4814 18.8337L28.4751 18.8225C28.6703 19.101 28.805 19.4172 28.8707 19.7509C28.9364 20.0846 28.9315 20.4283 28.8563 20.76L28.8588 20.7437C28.6051 21.3587 27.8939 21.6063 27.2065 21.8438C26.7923 21.939 26.4083 22.1357 26.0891 22.4163L26.0916 22.4137C25.9507 22.823 25.9171 23.2616 25.9941 23.6875L25.9916 23.6725C26.0651 24.0055 26.0686 24.3501 26.0019 24.6845C25.9352 25.0188 25.7997 25.3357 25.6041 25.615L25.6091 25.6075C25.4254 25.7595 25.2134 25.8737 24.9854 25.9437C24.7574 26.0136 24.5179 26.0378 24.2805 26.015H24.288C24.088 26.015 23.8818 26.0037 23.6755 25.9925C23.4866 25.9796 23.2974 25.9721 23.1081 25.97C22.8678 25.9475 22.6259 25.9921 22.4094 26.0987L22.4169 26.095C22.1418 26.4092 21.9479 26.786 21.8519 27.1925L21.8482 27.21C21.6082 27.8975 21.3607 28.61 20.7483 28.8625C20.6051 28.9212 20.4518 28.9509 20.2971 28.95H20.2833H20.2846C19.7636 28.8981 19.2602 28.733 18.8097 28.4663L18.8259 28.475C18.4652 28.2376 18.0463 28.1035 17.6148 28.0875H17.6098C17.3386 28.14 16.9848 28.5375 16.6724 28.8875C16.1787 29.435 15.6749 30 15 30C14.3251 30 13.8226 29.435 13.3326 28.8888H13.3314ZM17.746 9.13625L11.6465 20.2213C11.6292 20.2528 11.6203 20.2883 11.6209 20.3243C11.6214 20.3603 11.6313 20.3956 11.6496 20.4266C11.6679 20.4576 11.6939 20.4834 11.7252 20.5013C11.7564 20.5192 11.7918 20.5287 11.8278 20.5288H12.8864C12.9232 20.5288 12.9593 20.519 12.991 20.5003C13.0226 20.4816 13.0487 20.4547 13.0664 20.4225V20.4212L19.1572 9.335C19.1745 9.30345 19.1834 9.26792 19.1828 9.23191C19.1823 9.1959 19.1724 9.16066 19.1541 9.12963C19.1358 9.09861 19.1098 9.07288 19.0785 9.05497C19.0473 9.03707 19.0119 9.0276 18.9759 9.0275H17.9273C17.8902 9.0276 17.8538 9.03762 17.822 9.05653C17.7901 9.07543 17.7639 9.10253 17.746 9.135V9.13625ZM16.8661 14.8225C16.7073 14.9538 16.5794 15.1186 16.4917 15.3051C16.404 15.4916 16.3585 15.6952 16.3586 15.9012V18.9025C16.3586 19.3325 16.5561 19.7163 16.8648 19.9688L16.8673 19.9713C17.1873 20.2388 17.6023 20.4 18.056 20.4C18.5097 20.4 18.9247 20.2375 19.2471 19.9688L19.2446 19.9713C19.5571 19.7175 19.7546 19.3337 19.7546 18.9037V15.9037C19.7546 15.4737 19.5609 15.0875 19.2571 14.83L19.2546 14.8287C18.9379 14.5441 18.5269 14.3869 18.101 14.3875H18.0622H18.0647H18.026C17.5989 14.3869 17.1864 14.5425 16.8661 14.825L16.8686 14.8238L16.8661 14.8225ZM11.5615 9.43875C11.4027 9.57007 11.2749 9.73486 11.1871 9.92135C11.0994 10.1078 11.054 10.3114 11.0541 10.5175V13.5175C11.0541 13.9488 11.2503 14.335 11.5603 14.5887L11.5628 14.5913C11.8828 14.8625 12.299 15.0262 12.7539 15.0262C13.2089 15.0262 13.6264 14.8612 13.9476 14.5887L13.9451 14.5913C14.2601 14.335 14.4588 13.9488 14.4588 13.515V10.5225C14.4588 10.0887 14.2626 9.7025 13.9526 9.445L13.9501 9.44375C13.6163 9.15944 13.1921 9.00339 12.7537 9.00362C12.3153 9.00385 11.8913 9.16034 11.5578 9.445L11.5603 9.4425L11.5615 9.43875ZM17.7835 19.065C17.7566 19.0436 17.7349 19.0164 17.72 18.9855C17.7051 18.9545 17.6973 18.9206 17.6973 18.8862V15.885C17.6973 15.8125 17.731 15.7487 17.7823 15.7075C17.8471 15.6512 17.9301 15.6201 18.016 15.62H18.0322H18.031H18.046C18.1321 15.6199 18.2154 15.6505 18.281 15.7062C18.3077 15.7275 18.3293 15.7545 18.3442 15.7852C18.3591 15.8159 18.367 15.8496 18.3672 15.8837V18.8862C18.3672 18.9203 18.3596 18.9539 18.3449 18.9847C18.3302 19.0154 18.3088 19.0424 18.2822 19.0638C18.2147 19.1187 18.1272 19.1513 18.0322 19.1513C17.9373 19.1513 17.8498 19.1187 17.781 19.0625H17.7823L17.7835 19.065ZM12.484 13.6825C12.4572 13.661 12.4356 13.6338 12.4207 13.6028C12.4058 13.5719 12.3979 13.5381 12.3977 13.5038V10.5037C12.3977 10.4312 12.4315 10.3675 12.4827 10.325C12.5502 10.27 12.6377 10.2375 12.7327 10.2375C12.8277 10.2375 12.9152 10.27 12.9839 10.3263H12.9827C13.0095 10.3477 13.0313 10.3748 13.0462 10.4058C13.0611 10.4367 13.0689 10.4706 13.0689 10.505V13.5063C13.0689 13.5405 13.0612 13.5743 13.0465 13.6052C13.0318 13.6361 13.0104 13.6634 12.9839 13.685C12.9164 13.74 12.8289 13.7725 12.7339 13.7725C12.6389 13.7725 12.5515 13.74 12.4827 13.6837H12.484V13.6825Z"
                      fill="#5AC8D2"
                    ></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl lg:text-3xl font-bold text-ev-dark">
                  Product Sale
                </h3>
                <p className="mt-2 max-w-[300px] text-base mx-auto font-medium text-ev-lightgray">
                  Increase the size of your market within the Festum Field community by actively marketing and selling your goods to a targeted group of people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 xl:py-24">
        <div className="wrapperlanding">
          <div className="title text-center space-y-5 lg:space-y-10">
            <div className="w-max px-6 relative mx-auto">
              <h2 className="h2 min-w-max inline-block">App Showcase</h2>
              <img
                src={titleStroke}
                alt="titel-strok"
                className="mx-auto absolute inset-x-0 top-full w-full object-cover mt-0.5"
              />
            </div>
            <p className="text-sm md:text-lg lg:text-xl font-pop font-medium text-ev-lightgray max-w-6xl mx-auto">
              Your all-in-one platform for seamless connections, business growth, and creative expression in one vibrant digital space.
            </p>
          </div>
          <div className="pt-9 lg:pt-20">
            <img src={ShowcaseBg} className="mx-auto" alt="Showcase-bg" />
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 xl:py-24 relative">
        <img
          src={WhoWeArebg}
          alt="who-we-arebg"
          className="absolute w-full h-full object-scale-down sm:object-center sm:object-cover"
        />
        <div className="wrapperlanding flex flex-wrap items-center relative">
          <div className="w-full md:order-2 md:w-1/2 lg:w-5/12 xl:w-4/12">
            <img
              src={WhoWeAre}
              alt="who-we-are"
              className="pl-6 w-full max-w-sm md:max-w-max"
            />
          </div>
          <div className="w-full md:order-1 md:w-1/2 lg:w-7/12 xl:w-8/12">
            <div className="title space-y-5 lg:space-y-10">
              <div className="w-max px-2 relative">
                <h2 className="h2 min-w-max inline-block">Who we are?</h2>
                <img
                  src={titleStroke}
                  alt="titel-strok"
                  className="mx-auto absolute inset-x-0 w-full object-cover mt-0.5"
                />
              </div>
              <p className="text-sm md:text-base lg:text-xl font-pop font-medium text-ev-lightgray max-w-4xl">
                We are Festum Field, a fabulous online community dedicated to bridging gaps. With the help of our platform, people may establish lively social circles, meaningful talks, and connections with loved ones. Festum Field provides businesses and entrepreneurs with a designated area to display products and engage with potential customers. Additionally, we allow content creators a platform to showcase their skills, tell stories, and enthrall viewers through our dynamic Reels feature.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 xl:py-24 relative">
        <div className="wrapperlanding flex flex-wrap items-center relative">
          <div className="w-full md:w-1/2 md:pr-9">
            <div className="p-10 relative">
              <img
                src={OurCompany}
                alt="our-company"
                className="absolute w-full h-full inset-0"
              />
              <img
                src={OurCompany2}
                alt="our-company2"
                className="relative w-full max-w-sm md:max-w-max"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pt-8 md:pt-0">
            <div className="title space-y-5 lg:space-y-10">
              <div className="w-max px-2 relative ">
                <h2 className="h2 min-w-max inline-block">Our Company</h2>
                <img
                  src={titleStroke}
                  alt="titel-strok"
                  className="mx-auto absolute inset-x-0 w-full object-cover mt-0.5"
                />
              </div>
              <p className="text-sm md:text-base lg:text-xl font-pop font-medium text-ev-lightgray">
                FestumEvento Pvt. Ltd. is a group of smart techs and insightful experts who are constantly working on digital products to deliver the latest technical advantages. We have been the market's leading IT solution provider since 2019, and we connect you to outstanding business perspectives.
              </p>
              <p className="text-sm md:text-base lg:text-xl font-pop font-medium text-ev-lightgray">
                To produce a rapid result and build the next-generation digital enterprise, the complete spectrum of our workflow involves transparency, consistency, and trust. Our core services include accounting software, GST software, ERP systems, application development, web development, integration and testing, and more.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div id="otherproducts" className="bg-white swiper-main">
        <div className="wrapper py-14 md:py-24">
          <h2 className="text-center text-ev-dark pb-3 lg:pb-6 text-4xl md:text-40 xl:text-5xl">
            Other Products
          </h2>
          <img
            src={titleStroke}
            alt="titel-strok"
            className="mx-auto absolute inset-x-0 object-cover mt-0.5"
          />
          <div className="swiper mySwiper px-5 responsive max-w-6xl pt-10">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              // loop={true}
              centeredSlides={false}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
            // breakpoints={{
            //   320: {
            //     slidesPerView: 1,
            //     spaceBetween: 15,
            //   },
            //   640: {
            //     slidesPerView: 2,
            //     spaceBetween: 20,
            //   },
            //   768: {
            //     slidesPerView: 3,
            //     spaceBetween: 25,
            //   },
            //   1024: {
            //     slidesPerView: 4,
            //     spaceBetween: 25,
            //   },
            //   1200: {
            //     slidesPerView: 4,
            //     spaceBetween: 30,
            //   },
            // }}
            >
              <SwiperSlide>
                <div className="swiper-slide py-5">
                  <div
                    className="px-5 py-5 bg-[#F7F8F9] drop-shadow-lg"
                    onClick={() => window.open("https://eventopackage.com/")}
                  >
                    <img
                      src={Ep}
                      className="mx-auto fixed-images"
                      alt="Evento Package"
                    />
                    <div className="text-center pt-7 w-full overflow-hidden">
                      <p className="text-xl font-bold text-ev-dark">
                        Evento Package
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide py-5">
                  <div
                    className="px-5 py-5 bg-[#F7F8F9] drop-shadow-lg"
                    onClick={() => window.open("https://fcoin.com/")}
                  >
                    <img
                      src={FCoin}
                      className="mx-auto fixed-images"
                      alt="F Coin"
                    />
                    <div className="text-center pt-7 w-full overflow-hidden">
                      <p className="text-xl font-bold text-ev-dark">F Coin</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide py-5">
                  <div
                    className="px-5 py-5 bg-[#F7F8F9] drop-shadow-lg"
                    onClick={() => window.open("https://festumevento.com/")}
                  >
                    <img
                      src={Fe}
                      className="mx-auto fixed-images"
                      alt="festumevento"
                    />
                    <div className="text-center pt-7 w-full overflow-hidden">
                      <p className="text-xl font-bold text-ev-dark">
                        Festum Evento
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide py-5">
                  <div
                    className="px-5 py-5 bg-[#F7F8F9] drop-shadow-lg"
                  // onClick={() => window.open("https://festumevento.com/")}
                  >
                    <img
                      src={Fam}
                      className="mx-auto fixed-images"
                      alt="Festum Advertising Media"
                    />
                    <div className="text-center pt-0 w-full overflow-hidden">
                      <p className="text-xl font-bold text-ev-dark">
                        Festum Advertising Media
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide py-5">
                  <div
                    className="px-5 py-5 bg-[#F7F8F9] drop-shadow-lg"
                  // onClick={() => window.open("https://festumevento.com/")}
                  >
                    <img
                      src={Pam}
                      className="mx-auto fixed-images"
                      alt="Perfect Account Manage "
                    />
                    <div className="text-center pt-0 w-full overflow-hidden">
                      <p className="text-xl font-bold text-ev-dark">
                        Perfect Account Manage
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <section className="py-14 lg:py-16 xl:py-24 relative">
        <img
          src={ContactUs}
          alt="contactus"
          className="absolute w-full h-full object-cover"
        />
        <div className="wrapperlanding flex flex-wrap items-center relative">
          <div className="w-full md:w-1/2 lg:w-7/12 xl:w-8/12">
            <div className="title relative space-y-5 lg:space-y-10">
              <div className="w-max relative">
                <h2 className="h2 min-w-max inline-block">Get in touch with us</h2>
                <img
                  src={titleStroke}
                  alt="titel-strok"
                  className="absolute inset-x-0 w-auto object-cover mt-0.5"
                />
              </div>
              <p className="text-sm md:text-base lg:text-xl font-pop font-medium text-ev-lightgray max-w-4xl md:pr-10">
                Do you want to learn more or do you have questions? Get in touch with us right now to find out the countless opportunities Festum Field has to offer! Reach out today!
              </p>
              <div className="flex justify-between items-center md:pr-14">
                <img src={Support} alt="support" />
                <img
                  src={ContactStrok}
                  className="hidden xl:inline-block"
                  alt="contact-strok"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-5/12 xl:w-4/12 relative">
            <img
              src={ContactStrok2}
              alt="contact-strok2"
              className="absolute left-full bottom-full hidden 2xl:inline-block"
            />
            <form action="" className="mt-6 mb-0 space-y-4">
              <div>
                <label for="email" className="text-sm font-medium">
                  Your Name
                </label>
                <div className="relative mt-1">
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm bg-white drop-shadow-sm"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label for="password" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative mt-1">
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm bg-white drop-shadow-sm"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div>
                <label for="password" className="text-sm font-medium">
                  Contact No
                </label>
                <div className="relative mt-1">
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm bg-white drop-shadow-sm"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div>
                <label for="password" className="text-sm font-medium">
                  Massage
                </label>
                <div className="relative mt-1">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm bg-white drop-shadow-sm"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-ev-sky px-5 py-3 text-sm font-medium text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="pt-24 lg:pt-32 xl:pt-40 relative px-5 -mb-24">
        {/*<div className="max-w-5xl mx-auto rounded-xl bg-ev-sky p-9 flex flex-wrap items-center relative">*/}
          {/*<div className="w-full md:w-7/12 space-y-2 lg:space-y-5">*/}
            {/*<h3 className="h3">Get Our Brochure</h3>*/}
            {/*<p className="text-sm md:text-base lg:text-xl font-pop font-medium text-white">*/}
              {/*Lorem Ipsum has been the industry's standard dummy text ever since*/}
              {/*the 1500.*/}
            {/*</p>*/}
          {/*</div>*/}
          {/*<div className="w-full md:w-5/12 md:text-right mt-5 md:mt-0">*/}
            {/*<a*/}
              {/*href="javascript:void(0)"*/}
              {/*className="inline-block py-2.5 px-4 text-base md:text-lg text-ev-sky hover:bg-transparent hover:text-white anim rounded-md bg-white border border-white"*/}
            {/*>*/}
              {/*Download Brochure*/}
            {/*</a>*/}
          {/*</div>*/}
        {/*</div>*/}
      </section>

      <footer className="bg-[#242427]">
        <div className=" text-white pt-24 pb-10 border-b border-white border-opacity-20">
          <div className="max-w-screen-2xl mx-auto px-5">
            <div className="flex flex-wrap pt-10 space-y-7 md:space-y-0">
              <div className="w-full lg:w-4/12 pr-5 space-y-5">
                <img
                  src={FooterLogo}
                  className="w-32 sm:w-40 lg:w-48 h-auto sm:m-0"
                  width="239"
                  height="49"
                  viewBox="0 0 239 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                />
                <p className="max-w-md text-sm pt-2 lg:text-base text-white opacity-60 font-normal text-center sm:text-left">
                  A flexible digital platform that promotes communication, empowers entrepreneurs, and encourages both individuals and content creators to express themselves.
                </p>
                <div className="max-w-md flex py-2 sm:py-4 justify-center space-x-8">
                  <a
                    className="hover:opacity-75"
                    href=""
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only"> Facebook </span>

                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="hover:opacity-75"
                    href=""
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only"> Instagram </span>

                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="hover:opacity-75"
                    href=""
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only"> Twitter </span>

                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    className="hover:opacity-75"
                    href=""
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only"> GitHub </span>

                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="hover:opacity-75"
                    href=""
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only"> Dribbble </span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.2 0H1.8C0.81 0 0 0.81 0 1.8V16.2C0 17.19 0.81 18 1.8 18H16.2C17.19 18 18 17.19 18 16.2V1.8C18 0.81 17.19 0 16.2 0ZM5.4 15.3H2.7V7.2H5.4V15.3ZM4.05 5.67C3.15 5.67 2.43 4.95 2.43 4.05C2.43 3.15 3.15 2.43 4.05 2.43C4.95 2.43 5.67 3.15 5.67 4.05C5.67 4.95 4.95 5.67 4.05 5.67ZM15.3 15.3H12.6V10.53C12.6 9.81004 11.97 9.18 11.25 9.18C10.53 9.18 9.9 9.81004 9.9 10.53V15.3H7.2V7.2H9.9V8.28C10.35 7.56 11.34 7.02 12.15 7.02C13.86 7.02 15.3 8.46 15.3 10.17V15.3Z"
                        fill="white"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-8/12 lg:pl-14">
                <div className="space-y-10 lg:border-l-2 lg:pl-24 lg:border-white">
                  <div className="space-y-4">
                    <div className="flex flex-wrap space-x-6 justify-center sm:justify-start lg:space-x-8 f-manu">
                      <a
                        href="#"
                        className="text-ev-lightgray hover:text-white inline-block py-2"
                      >
                        Home
                      </a>
                      <a
                        href="#"
                        className="text-ev-lightgray hover:text-white inline-block py-2"
                      >
                        About
                      </a>
                      <a
                        href="#"
                        className="text-ev-lightgray hover:text-white inline-block py-2"
                      >
                        Feature
                      </a>
                      <a
                        href="#"
                        className="text-ev-lightgray hover:text-white inline-block py-2"
                      >
                        Showcase
                      </a>
                      <a
                        href="#"
                        className="text-ev-lightgray hover:text-white inline-block py-2"
                      >
                        F+ Coin
                      </a>
                      <a
                        href="#"
                        className="text-ev-lightgray hover:text-white inline-block py-2"
                      >
                        About us
                      </a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="ft-titel text-white text-base">
                      Contact info
                    </span>
                    <div className="flex flex-wrap -mx-3.5 text-ev-lightgray  space-y-2 sm:space-y-0">
                      {/*<div className="w-full sm:w-1/3 pb-2 sm:pb-0 px-3.5 border-b sm:border-b-0 sm:border-r border-white border-opacity-20 ft-text">*/}
                        {/*593 South Marshall Drive Amarillo, TX 79106*/}
                      {/*</div>*/}
                      <div className="w-full sm:w-1/3 pb-2 sm:pb-0 px-3.5 border-b sm:border-b-0  border-white border-opacity-20 ft-text flex">
                        <div>
                          <span className="block whitespace-nowrap text-base mb-0">
                            +91 9727948000
                          </span>
                          <span className="block whitespace-nowrap text-base mb-0">
                            help@festumfield.com
                          </span>
                        </div>
                      </div>
                      {/*<div className="w-full sm:w-1/3 pl-3.5 md:pl-6 ft-text sm:flex justify-center">*/}
                        {/*593 South Marshall Drive Amarillo, TX 79106*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapperlanding py-4 text-white">
          <div className="flex flex-wrap justify-between text-xs md:text-sm">
            <span>© 2020 Festum Evento - Devepoled By Company</span>
            <ul className="flex items-center capitalize space-x-3 sm:mt-0">
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>|</li>
              <li>
                <a href="#">terms and conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
