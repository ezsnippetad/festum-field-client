import React, { useState } from "react";
import profileImg from "../../../assets/images/create-your-profile.png";
import CreatePersonalProfile from "./CreatePersonalProfile";
import Modal from "../../../Common/Modals/Modal";
import NewCreatePersonalProfile from "./NewCreatePersonalProfile";
export default function CreateYourProfile({ setEmptyProfilePopUp }) {
  const [
    isCreatePersonalProfilePopUpOpen,
    setIsCreatePersonalProfilePopUpOpen,
  ] = useState(false);

  return (
    <>
      <div>
        <div className="fixed inset-0 md:h-screen flex flex-col items-center justify-center py-5 px-3 lg:px-0 bg-black/60">
          <div className="md:w-[450px] bg-white p-[30px] rounded-[15px]">
            <div className="flex justify-end">
              <button
                onClick={() => setEmptyProfilePopUp(false)}
                className="icon-close text-xl text-chatlook-gray cursor-pointer"
              ></button>
            </div>
            <img src={profileImg} alt="create-your-profile" className="mx-auto" />
            <h2 className="text-center pb-[19px] pt-6">Create Your Profile</h2>
            <p className="text-center pb-[19px] leading-[30px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
            <div className="flex items-stretch justify-center space-x-5">
              <button
                onClick={() => setEmptyProfilePopUp(false)}
                className="btn-secondary text-sm font-medium uppercase"
              >
                Skip Now
              </button>
              <button
                onClick={() => {
                  setIsCreatePersonalProfilePopUpOpen(true);
                }}
                className="btn-primary text-sm font-medium uppercase"
              >
                continue
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={isCreatePersonalProfilePopUpOpen} handleClose={setIsCreatePersonalProfilePopUpOpen} >
          <NewCreatePersonalProfile
            setEmptyProfilePopUp={setEmptyProfilePopUp}
            setIsCreatePersonalProfilePopUpOpen={setIsCreatePersonalProfilePopUpOpen}
          />
        </Modal>
      </div>
    </>
  );
}
