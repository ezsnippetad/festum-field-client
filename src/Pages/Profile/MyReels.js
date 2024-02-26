import React, { useEffect, useState } from "react";
import Woman from "../../assets/images/woman.png";
import ReelsBg from "../../assets/images/reels-bg.png";
import Modal from "../../Common/Modals/Modal";
import MoreOptionPopUp from "../../component/Popups/DashboardPopup/MoreOptionPopUp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination } from "swiper";
import { FcLike } from "react-icons/fc";
import { GrLikeFill } from "react-icons/gr";
import { useRef } from "react";
const dummyVideos = [
  {
    id: "1",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/BigBuckBunny.jpg",
    title: "Big Buck Bunny",
  },
  {
    id: "2",
    description: "The first Blender Open Movie from 2006",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/ElephantsDream.jpg",
    title: "Elephant Dream",
  },
  {
    id: "3",
    description:
      "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerBlazes.jpg",
    title: "For Bigger Blazes",
  },
  {
    id: "4",
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerEscapes.jpg",
    title: "For Bigger Escape",
  },
  {
    id: "5",
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerFun.jpg",
    title: "For Bigger Fun",
  },
  {
    id: "6",
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerJoyrides.jpg",
    title: "For Bigger Joyrides",
  },
  {
    id: "7",
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerMeltdowns.jpg",
    title: "For Bigger Meltdowns",
  },
  {
    id: "8",
    description:
      "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/Sintel.jpg",
    title: "Sintel",
  },
  {
    id: "9",
    description:
      "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    ],
    subtitle: "By Garage419",
    thumb: "images/SubaruOutbackOnStreetAndDirt.jpg",
    title: "Subaru Outback On Street And Dirt",
  },
  {
    id: "10",
    description:
      "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/TearsOfSteel.jpg",
    title: "Tears of Steel",
  },
  {
    id: "11",
    description:
      "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    ],
    subtitle: "By Garage419",
    thumb: "images/VolkswagenGTIReview.jpg",
    title: "Volkswagen GTI Review",
  },
];

export default function MyReels() {
  const [moreOptionPopUp, setMoreOptionPopUp] = useState(false);
  const [nofications, setNotifications] = useState(false);

  function slideChangeHandler(e) {
    const activeVideo = document.getElementById(dummyVideos[e.activeIndex].id);
    activeVideo.play();
    if (e.activeIndex > 0) {
      const prevVideo = document.getElementById(
        dummyVideos[e.activeIndex - 1].id
      );
      prevVideo.pause();
    }

    if (e.activeIndex < dummyVideos.length - 1) {
      const nextVideo = document.getElementById(
        dummyVideos[e.activeIndex + 1].id
      );
      nextVideo.pause();
    }
  }

  return (
    <main style={{ height: "100vh" }}>
      <div className="w-full h-full max-w-4xl mx-auto">
        <div className="relative flex items-center justify-center h-full mx-auto overflow-hidden rounded-lg drop-shadow-lg lg:max-w-none">
          {/* <!-- reels box --> */}
          <Swiper
            spaceBetween={40}
            slidesPerView={"auto"}
            centeredSlides={true}
            direction={"vertical"}
            modules={[Mousewheel]}
            mousewheel={{ enabled: true }}
            className="h-screen"
            onSlideChange={slideChangeHandler}
          >
            {dummyVideos.map((item) => (
              <SwiperSlide
                className="h-[calc(100vh-150px)] aspect-[9/16] rounded-sm"
                key={item.id}
              >
                <ReelItem
                  id={item.id}
                  description={item.description}
                  url={item.sources[0]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <!-- comment-box  --> */}
          {nofications ? (
            <div
              id="commentBox"
              className="w-full max-w-[375px] h-[calc(100vh-150px)] bg-white p-5 absolute lg:relative inset-0"
            >
              <div className="p-3 rounded-lg notifications-box user-box">
                <a className="flex items-center space-x-3">
                  <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                    <img src={Woman} className="object-cover" alt="woman" />
                  </div>
                  <div className="w-[calc(100%-54px)]">
                    <h4 className="whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize text-base">
                      notifications
                    </h4>
                    <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                      10:15PM
                    </span>
                  </div>
                </a>
              </div>
              <span className="block px-3 text-sm line-clamp-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard{" "}
                <a className="font-medium text-chatlook-dark">More...</a>
              </span>
              <div className="w-full border-b border-chatlook-grayLight h-[calc(100vh-500px)] overflow-hidden overflow-y-auto">
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
                <div className="p-3 rounded-lg notifications-box user-box">
                  <a className="flex items-center space-x-3">
                    <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
                      <img src={Woman} className="object-cover" alt="woman" />
                    </div>
                    <div className="w-[calc(100%-60px)]">
                      <h4 className="w-full overflow-hidden text-xs capitalize whitespace-nowrap overflow-ellipsis text-chatlook-gray">
                        <span className="inline-block font-medium text-chatlook-dark">
                          hellosunny9999
                        </span>{" "}
                        How do you plan this animation, like how!
                      </h4>
                      <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                        1d
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              {/* <!-- comment typr area  --> */}
              <div className="w-full">
                <div className="flex items-center py-3">
                  <a className="inline-block text-center">
                    <span className="text-2xl icon-like- text-chatlook-dark"></span>
                    <span className="block text-[10px] text-chatlook-dark">
                      10.5K
                    </span>
                  </a>
                  <a
                    className="inline-block mx-4 text-center"
                    // onClick="toggleFunction('commentBox', 'hidden')"
                  >
                    <span className="text-2xl icon-hunter-message text-chatlook-dark"></span>
                    <span className="block text-[10px] text-chatlook-dark">
                      10.5K
                    </span>
                  </a>
                  <a className="inline-block text-center">
                    <span className="text-2xl icon-send text-chatlook-dark"></span>
                    <span className="block text-[10px] text-chatlook-dark">
                      10.5K
                    </span>
                  </a>
                  <div
                    className="inline-block ml-auto text-center"
                    onClick={() => setMoreOptionPopUp(true)}
                  >
                    <span className="text-2xl icon-dots-reels-menu text-chatlook-dark"></span>
                    <span className="block text-[10px] text-chatlook-dark">
                      10.5K
                    </span>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="search"
                    className="flex items-center w-full px-5 py-2 border rounded-full border-chatlook-grayLight"
                  >
                    <i className="icon-search"></i>
                    <input
                      type="search"
                      name="Search"
                      id="Search"
                      placeholder="Search"
                      className="w-full px-3 outline-none"
                    />
                    <a className="text-sm text-chatlook-sky">Add</a>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <!-- more option popup  --> */}
      {moreOptionPopUp ? (
        <div
          id="moreoption"
          className="w-[calc(100%-350px)] h-full bg-white/25 backdrop-blur fixed right-0 inset-y-0 z-10 ml-auto p-5 hidden"
        >
          <div className="relative w-full h-auto max-w-xs mx-auto -translate-y-1/2 bg-white rounded-md top-1/2">
            <div className="py-4 text-center">
              <span
                className="absolute text-sm icon-close top-3 right-3"
                onClick="toggleFunction('moreoption', 'hidden')"
              ></span>
              <h2 className="text-lg xl:text-xl text-chatlook-dark">
                More option
              </h2>
            </div>
            <div className="block w-full py-4 border-t border-t-chatlook-grayLight">
              <div className="mx-auto space-y-2 w-max">
                <a className="flex items-center space-x-2">
                  <span className="inline-block text-lg icon-delete"></span>
                  <h4 className="text-sm font-medium text-red-400">
                    Delete Reels
                  </h4>
                </a>
                <a className="flex items-center space-x-2">
                  <span className="inline-block text-lg icon-Add-image"></span>
                  <h4 className="text-sm font-medium text-chatlook-gray">
                    edit reels
                  </h4>
                </a>
                <a className="flex items-center space-x-2">
                  <span className="inline-block text-lg icon-Add-image"></span>
                  <h4 className="text-sm font-medium text-chatlook-gray">
                    copy link
                  </h4>
                </a>
                <a className="flex items-center space-x-2">
                  <span className="inline-block text-lg icon-Add-image"></span>
                  <h4 className="text-sm font-medium text-chatlook-gray">
                    share reels
                  </h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div id="moreoption" className="w-[calc(100%-350px)] h-full bg-white/25 backdrop-blur fixed right-0 inset-y-0 z-10 ml-auto p-5 hidden">
              <div className="relative w-full h-auto max-w-xs mx-auto -translate-y-1/2 bg-white rounded-md top-1/2">
                  <div className="py-4 text-center">
                      <span className="absolute text-sm icon-close top-3 right-3" onClick="toggleFunction('moreoption', 'hidden')"></span>
                      <h2 className="text-lg xl:text-xl text-chatlook-dark">More option</h2>
                  </div>
                  <div className="block w-full py-4 border-t border-t-chatlook-grayLight">
                      <div className="mx-auto space-y-2 w-max">
                          <a className="flex items-center space-x-2">
                              <span className="inline-block text-lg icon-delete"></span>
                              <h4 className="text-sm font-medium text-red-400">Delete Reels</h4>
                          </a>
                          <a className="flex items-center space-x-2">
                              <span className="inline-block text-lg icon-Add-image"></span>
                              <h4 className="text-sm font-medium text-chatlook-gray">edit reels</h4>
                          </a>
                          <a className="flex items-center space-x-2">
                              <span className="inline-block text-lg icon-Add-image"></span>
                              <h4 className="text-sm font-medium text-chatlook-gray">copy link</h4>
                          </a>
                          <a className="flex items-center space-x-2">
                              <span className="inline-block text-lg icon-Add-image"></span>
                              <h4 className="text-sm font-medium text-chatlook-gray">share reels</h4>
                          </a>
                      </div>
                  </div>
              </div>
          </div>  */}
      <Modal isOpen={moreOptionPopUp}>
        <MoreOptionPopUp handleClose={setMoreOptionPopUp} />
      </Modal>
    </main>
  );
}

function ReelItem({ title, description, url, id }) {
  const [moreOptionPopUp, setMoreOptionPopUp] = useState(false);
  const [nofications, setNotifications] = useState(false);
  const videoRef = useRef(null);
  const [play, setPlay] = useState(true);

  const [liked, setLiked] = useState(false);
  const handleLikeClick = (e) => {
    e.stopPropagation();
    // e.preventDefault();
    setLiked(!liked);
  };

  const handleClick = () => {
    
    play ? videoRef.current.pause() : videoRef.current.play();
    if(!play){
      hendalIcontimeout();
    }
    setPlay(!play);
    setShowicon(true);
    
  };

  const [showicon,setShowicon]=useState(false);

  const hendalIcontimeout=()=>{
    setTimeout(() => {
      setShowicon(false);
    }, 1000);
  };
  




  return (
    <div
      className="w-full h-[calc(100vh-150px)] overflow-hidden relative rounded"
      onClick={handleClick} 
    >
      {showicon && (
      <span
      // onClick={hendalIcontimeout}
        className={`${
          play ? "icon-play" : "icon-pause2" 
        } absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[60px] text-white `}
      ></span>
       )} 
      <div className="absolute space-y-5 bottom-48 right-5">
        <div className="block text-center">
          <span
            onClick={handleLikeClick}
            className={`text-2xl  ${
              liked ? "  text-red-600 icon-heart" : "text-white icon-like-"
            } `}
          ></span>

          <span className="block text-[10px] text-white">10.5K</span>
        </div>
        <div
          className="block text-center"
          onClick={() => setNotifications(!nofications)}
        >
          <span className="text-3xl text-white icon-reels-message"></span>

          <span className="block text-[10px] text-white">10.5K</span>
        </div>
        <a className="block text-center">
          <span className="text-2xl text-white icon-send"></span>
          <span className="block text-[10px] text-white">10.5K</span>
        </a>
        <div
          onClick={() => setMoreOptionPopUp(true)}
          className="block text-center"
        >
          <span className="text-3xl text-white icon-dots-reels-menu"></span>
          <span className="block text-[10px] text-white">10.5K</span>
        </div>
      </div>
      <div className="absolute inset-x-0 w-full bottom-5">
        <div className="p-3 rounded-lg notifications-box user-box">
          <a className="flex items-center space-x-3">
            <div className="flex w-10 h-10 overflow-hidden rounded-full bg-slate-200">
              <img src={Woman} className="object-cover" alt="woman" />
            </div>
            <div className="w-[calc(100%-54px)]">
              <h4 className="text-white whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize text-base">
                notifications
              </h4>
              <span className="text-white whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden">
                10:15PM
              </span>
            </div>
          </a>
        </div>
        <span className="block px-3 text-sm text-white">{description}</span>
      </div>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 object-cover w-full h-full -z-10"
        src={url}
        id={id}
      />
    </div>
  );
}
