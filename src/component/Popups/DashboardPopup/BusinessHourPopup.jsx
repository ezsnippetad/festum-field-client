import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ArrowLeft, X } from "lucide-react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const BusinessHourPopup = ({ setBusinessHourPopupOpen }) => {
  return (
    <div className="fixed inset-0 md:h-screen flex flex-col items-center justify-center py-5 px-3 lg:px-0 bg-black/60 z-50 how are you">
      <div className="w-[474px] p-[30px] bg-white rounded-2xl ">
        <div className="flex w-full items-center justify-between">
          <div className="w-full flex items-center space-x-[9px]">
            <ArrowLeft
              className="text-chatlook-sky cursor-pointer"
              onClick={() => {
                setBusinessHourPopupOpen(false);
              }}
            />
            <h4>Business Hours</h4>
          </div>
          <X
            className="cursor-pointer"
            onClick={() => {
              setBusinessHourPopupOpen(false);
            }}
          />
        </div>
        <div className="mt-[34px] flex flex-col ">
          <div className="w-full ">
            <div className="flex w-full items-center justify-between border-b pb-2 pt-1">
              <div className="flex flex-col space-y-[14px]">
                <h5 className="text-sm">Sunday</h5>
                <div className="flex items-center space-x-5  ">
                  {/*  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span>-</span>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                {/* <span className="text-chatlook-sky text-sm font-bold cursor-pointer why">
                  + Add New Hours
                </span> */}
              </div>
              <div className=" w-12 form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  name="dob"
                  role="switch"
                  // checked={values?.dob}
                  // onChange={handleChange}
                  // checked={permissions.dob}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("dob");
                  //   setValues({
                  //     ...values,
                  //     dob: e.target.checked,
                  //   });
                  // }}
                />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 why -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <div className="flex items-center">
                  <h4></h4>
                  <div className="flex items-center">
                    <span className="block"></span>
                    <span className="block"></span>
                  </div>
                </div>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex w-full items-center justify-between border-b pb-2 pt-1">
              <div className="flex flex-col space-y-[14px]">
                <h5 className="text-sm">Sunday</h5>
                <div className="flex items-center space-x-5  ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span>-</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <span className="text-chatlook-sky text-sm font-bold cursor-pointer why">
                  + Add New Hours
                </span>
              </div>
              <div className=" w-12 form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  name="dob"
                  role="switch"
                  // checked={values?.dob}
                  // onChange={handleChange}
                  // checked={permissions.dob}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("dob");
                  //   setValues({
                  //     ...values,
                  //     dob: e.target.checked,
                  //   });
                  // }}
                />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 why -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex w-full items-center justify-between border-b pb-2 pt-1">
              <div className="flex flex-col space-y-[14px]">
                <h5 className="text-sm">Sunday</h5>
                <div className="flex items-center space-x-5  ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span>-</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <span className="text-chatlook-sky text-sm font-bold cursor-pointer why">
                  + Add New Hours
                </span>
              </div>
              <div className=" w-12 form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  name="dob"
                  role="switch"
                  // checked={values?.dob}
                  // onChange={handleChange}
                  // checked={permissions.dob}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("dob");
                  //   setValues({
                  //     ...values,
                  //     dob: e.target.checked,
                  //   });
                  // }}
                />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 why -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex w-full items-center justify-between border-b pb-2 pt-1">
              <div className="flex flex-col space-y-[14px]">
                <h5 className="text-sm">Sunday</h5>
                <div className="flex items-center space-x-5  ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span>-</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <span className="text-chatlook-sky text-sm font-bold cursor-pointer why">
                  + Add New Hours
                </span>
              </div>
              <div className=" w-12 form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  name="dob"
                  role="switch"
                  // checked={values?.dob}
                  // onChange={handleChange}
                  // checked={permissions.dob}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("dob");
                  //   setValues({
                  //     ...values,
                  //     dob: e.target.checked,
                  //   });
                  // }}
                />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 why -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex w-full items-center justify-between border-b pb-2 pt-1">
              <div className="flex flex-col space-y-[14px]">
                <h5 className="text-sm">Sunday</h5>
                <div className="flex items-center space-x-5  ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span>-</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <span className="text-chatlook-sky text-sm font-bold cursor-pointer why">
                  + Add New Hours
                </span>
              </div>
              <div className=" w-12 form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  name="dob"
                  role="switch"
                  // checked={values?.dob}
                  // onChange={handleChange}
                  // checked={permissions.dob}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("dob");
                  //   setValues({
                  //     ...values,
                  //     dob: e.target.checked,
                  //   });
                  // }}
                />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 why -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex w-full items-center justify-between border-b pb-2 pt-1">
              <div className="flex flex-col space-y-[14px]">
                <h5 className="text-sm">Sunday</h5>
                <div className="flex items-center space-x-5  ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span>-</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <span className="text-chatlook-sky text-sm font-bold cursor-pointer why">
                  + Add New Hours
                </span>
              </div>
              <div className=" w-12 form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  name="dob"
                  role="switch"
                  // checked={values?.dob}
                  // onChange={handleChange}
                  // checked={permissions.dob}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("dob");
                  //   setValues({
                  //     ...values,
                  //     dob: e.target.checked,
                  //   });
                  // }}
                />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 why -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex w-full items-center justify-between border-b pb-2 pt-1">
              <div className="flex flex-col space-y-[14px]">
                <h5 className="text-sm">Sunday</h5>
                <div className="flex items-center space-x-5  ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span>-</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker defaultValue={dayjs(new Date())} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                {/* <span className="text-chatlook-sky text-sm font-bold cursor-pointer why">
                  + Add New Hours
                </span> */}
              </div>
              <div className=" w-12 form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  name="dob"
                  role="switch"
                  // checked={values?.dob}
                  // onChange={handleChange}
                  // checked={permissions.dob}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("dob");
                  //   setValues({
                  //     ...values,
                  //     dob: e.target.checked,
                  //   });
                  // }}
                />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 why -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button className="w-32 my-2 rounded h-12 bg-chatlook-sky text-white font-bold">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHourPopup;
