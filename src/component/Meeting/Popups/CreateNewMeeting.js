import React, {useCallback, useEffect, useRef, useState} from "react";
import { ReactComponent as Calendar }  from "../../../assets/images/Calendar.svg";
import { ReactComponent as Clock }  from "../../../assets/images/Clock.svg";
import CreateNewMeetingMember from "./CreateNewMeetingMember";
import Modal from "../../../Common/Modals/Modal";
import {friendsRequestsSearch, useFriendsRequests} from "../../../redux/Slice/requestSlice";
import {Secondary} from "../../../redux/services/toastServices";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useFormik} from "formik";
//import DatePicker from "react-datepicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import dayjs from 'dayjs';
import * as Yup from "yup";
import {IoClose} from "react-icons/io5";
import {PulseLoader} from "react-spinners";

export default function CreateNewMeeting({handleClose, onPressingEnter}) {
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState();
    const initialValues = {
        title: "",
        description: "",
        date: null,
        time: null,
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is Require!"),
        description: Yup.string().required("Description is Require!"),
        date: Yup.date().required('Date is required'),
        time: Yup.date().required('Time is required')
    });
    const onSubmit = (values) => {
        console.log(dayjs(values.date).format('DD/MM/YYYY'));
        //setIsCreateNewMeetingMemberPopUpOpen(true);
        console.log(values);
        onPressingEnter(values);
    };
    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setValues,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="fixed inset-0 w-full h-full min-h-screen flex items-center justify-center py-10 px-5 bg-black/60">
            <div className="w-full max-w-[480px] bg-white p-8 rounded-[15px]" style={{zIndex: "9999999999999"}}>
                <div className="w-full relative">
                    <h2 className="text-xl lg:text-2xl font-bold text-center">New Meeting </h2>
                    <div className="absolute top-0 right-0 z-50 text-black font-bold cursor-pointer" onClick={() => {
                        handleClose(false);
                    }}>
                        <IoClose className="text-red-600 font-bold text-2xl cursor-pointer"/>
                    </div>
                </div>
                <div className="w-full h-full bg-white mt-5">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full p-2.5">
                                <input
                                    type="text"
                                    placeholder="Type Meeting Title"
                                    className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    errors={errors}
                                    touched={touched}
                                />
                                <div className="text-red-500 text-sm">
                                    {errors.title && touched.title ? (
                                        <div >{errors.title}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full p-3">
                                <textarea
                                    id=""
                                    rows="3"
                                    className="w-full bg-chatlook-grayLight px-4 py-3 rounded-md resize-none focus-visible:outline-none"
                                    placeholder="Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    errors={errors}
                                    touched={touched}
                                ></textarea>
                                <div className="text-red-500 text-sm">
                                    {errors.description && touched.description ? (
                                        <div >{errors.description}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full p-2.5">
                                <div className="bg-chatlook-grayLight p-2 rounded-[5px] relative flex items-center">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                          format="DD-MM-YYYY"
                                          placeholder="DD-MM-YYYY"
                                          slots={{
                                              openPickerIcon: Calendar
                                          }}
                                          sx={{width: '100%'}}
                                          slotProps={{
                                              textField: {
                                                  variant: 'standard',
                                                  InputProps: {
                                                      sx: {
                                                          width: '100%',
                                                          paddingRight: '5px',
                                                          '& input': {
                                                              padding: '5px',
                                                              border: 'none',
                                                          },
                                                          '&::after': {
                                                              padding: '5px',
                                                              border: 'none'
                                                          },
                                                          '&::before': {
                                                              padding: '5px',
                                                              border: 'none !important'
                                                          }
                                                      }
                                                  },
                                                  sx: {
                                                      width: '100%',
                                                      '& input': {
                                                          padding: '5px',
                                                          border: 'none',
                                                      },
                                                      '&::after': {
                                                          border: '2px solid red',
                                                          width:"50%",
                                                      },
                                                      '&::before': {
                                                          border: '2px solid red',
                                                          width:"50%",
                                                      }
                                                  }
                                              }
                                          }}
                                          value={values.date}
                                          onChange={date => setFieldValue('date', date)}
                                          error={touched.date && Boolean(errors.date)}
                                          helperText={touched.date && errors.date} />
                                    </LocalizationProvider>
                                </div>
                                <div className="text-red-500 text-sm">
                                    {errors.date && touched.date ? (
                                        <div >{errors.date}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full p-2.5">
                                <div className="bg-chatlook-grayLight p-2 rounded-[5px] relative flex items-center">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopTimePicker
                                            placeholder="DD-MM-YYYY"
                                            slots={{
                                                openPickerIcon: Clock
                                            }}
                                            defaultValue={dayjs('2024-04-13T13:30')}
                                            sx={{width: '100%'}}
                                            slotProps={{
                                                textField: {
                                                    variant: 'standard',
                                                    InputProps: {
                                                        sx: {
                                                            width: '100%',
                                                            paddingRight: '5px',
                                                            '& input': {
                                                                padding: '5px',
                                                                border: 'none',
                                                            },
                                                            '&::after': {
                                                                padding: '5px',
                                                                border: 'none'
                                                            },
                                                            '&::before': {
                                                                padding: '5px',
                                                                border: 'none !important'
                                                            }
                                                        }
                                                    },
                                                    sx: {
                                                        width: '100%',
                                                        '& input': {
                                                            border: 'none',
                                                        },
                                                        '&::after': {
                                                            border: '2px solid red',
                                                            width:"50%",
                                                        },
                                                        '&::before': {
                                                            border: '2px solid red',
                                                            width:"50%",
                                                        }
                                                    }
                                                }
                                            }}
                                            value={values.time}
                                            onChange={time => setFieldValue('time', time)}
                                            error={touched.time && Boolean(errors.time) &&
                                            "Custom error message for time field"}
                                            helperText={touched.time && errors.time } />
                                    </LocalizationProvider>
                                </div>
                                <div className="text-red-500 text-sm">
                                    {errors.time && touched.time ? (
                                        <div >{errors.time}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-7">
                            <button type="submit" className="w-12 h-12 bg-chatlook-sky rounded-full mx-auto block">
                                <i className="icon-next-arrow text-white text-xl"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
