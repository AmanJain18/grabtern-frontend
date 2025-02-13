import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BiSolidUser, BiTime, BiCalendar } from "react-icons/bi";
import { BsTwitter, BsLinkedin } from "react-icons/bs";
import { MdNotifications, MdPayment } from "react-icons/md";

const Home = ({ setComponent, setIsSidebarOpen, mentor, setMentor }) => {
  const [Notification, setNotification] = useState(false);

  // 'https://grabtern-backend-demo.vercel.app/api/mentors/mentorDetail/${mentorUsername}';   // GET request to get mentor details

  useEffect(() => {
    const getMentor = async () => {
      const res = await axios
        .get(
          `https://grabtern-backend-demo.vercel.app/api/mentors/mentorDetail/anmode`,
        )
        .then((res) => {
          setMentor(res.data.mentorDetail);
          setMentorDetails(res.data.mentorDetail);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMentor();
  }, []);
  // console.log(mentor);

  const reference = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        Notification &&
        reference.current &&
        !reference.current.contains(e.target)
      ) {
        setNotification(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [Notification]);

  const cards = [
    {
      name: mentor?.name,
      icon: (
        <Image
          src={mentor?.image}
          width={100}
          height={100}
          className="tw-rounded-full"
        />
      ),
      path: "profile",
      socials: {
        linkedin: mentor.social?.linkedin,
        twitter: mentor.social?.twitter,
      },
      heading: "Edit Profile",
    },
    {
      icon: <BiTime className="tw-w-14 tw-h-14 tw-text-[#00C9A7]" />,
      path: "sessions",
      heading: "Your Sessions",
      session: {
        title: mentor?.sessions?.[0]?.name,
        type: mentor?.sessions?.[0]?.type,
        duration: mentor?.sessions?.[0]?.duration,
        desc: mentor?.sessions?.[0]?.description,
      },
    },
    {
      icon: <BiCalendar className="tw-w-14 tw-h-14 tw-text-[#00C9A7]" />,
      path: "calendar",
      heading: "View Calendar",
      schedule: {
        day: mentor?.schedules?.[0]?.day,
        start: mentor?.schedules?.[0]?.startsAt,
        end: mentor?.schedules?.[0]?.endsAt,
        timezone: mentor?.schedules?.[0]?.timezone,
      },
    },
    {
      name: "Payments",
      icon: <MdPayment className="tw-w-14 tw-h-14 tw-text-[#00C9A7]" />,
      path: "payments",
      heading: "View Payments",
    },
  ];

  return (
    <>
      <header className="max-[762px]:tw-justify-center max-[762px]:tw-items-center tw-gap-4 tw-py-10 min-[513px]:tw-pl-28 min-[513px]:tw-pr-12 tw-flex tw-justify-between tw-flex-wrap">
        <h1 className="tw-text-4xl tw-font-bold">
          Welcome <span>{mentor.name?.split(" ")[0]}</span>!
        </h1>{" "}
        {/*  Mentor = MENTOR's NAME */}
        <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 min-[513px]:tw-pl-10">
          {mentor ? (
            <p className="tw-flex tw-justify-center tw-gap-2 tw-bg-primary-100 hover:tw-bg-primary-200 tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-p-2 tw-rounded-md tw-items-center">
              <h2 className="tw-font-semibold tw-text-white">{mentor.name}</h2>
              <Image
                src={mentor?.image}
                alt="Picture of the mentor"
                width={30}
                height={30}
                className="tw-rounded-full"
              />
            </p>
          ) : (
            <p className="tw-flex tw-justify-center tw-gap-2 tw-bg-primary-100 hover:tw-bg-primary-200 tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-p-2 tw-rounded-md tw-items-center">
              <h2 className="tw-font-semibold tw-text-white">Mentor</h2>
              <BiSolidUser className="tw-w-7 tw-h-7 tw-text-[#FBEAFF]" />
            </p>
          )}

          {/* Notification */}
          <div
            onClick={() => setNotification(!Notification)}
            title="Notifications"
            className="tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out hover:tw-bg-primary-200 tw-bg-primary-100 tw-justify-center tw-items-center tw-relative tw-p-2 tw-rounded-md"
          >
            <MdNotifications className="tw-w-7 tw-h-7 tw-text-[#FBEAFF]" />
          </div>
          {Notification && (
            <div
              ref={reference}
              className="tw-z-50 tw-absolute tw-top-[90px] tw-right-[47px] tw-w-[300px] tw-h-[500px] tw-bg-[#FBEAFF] tw-rounded-md tw-shadow-xl tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-overflow-y-scroll"
            >
              <h2 className="tw-text-2xl tw-font-semibold tw-text-center tw-mb-5">
                Notifications
              </h2>
              <p className="tw-text-lg tw-font-medium tw-text-center">
                Coming Soon...
              </p>
            </div>
          )}
        </div>
      </header>

      <main className="max-[512px]:tw-pl-6 tw-pl-28 tw-flex tw-flex-col max-[708px]:tw-justify-center max-[708px]:tw-items-center">
        <p className="tw-flex tw-justify-start tw-items-center tw-text-center tw-text-xl tw-font-semibold">
          Here you can view your sessions, edit your profile, and view your
          calendar.
        </p>
        <div className="tw-flex-wrap tw-mt-10 tw-flex tw-gap-10 max-[512px]:tw-justify-center max-[512px]:tw-items-center">
          {cards.map((card) => {
            return (
              <div className="tw-w-[300px] tw-h-[300px] tw-bg-white tw-shadow-xl tw-gap-2 tw-p-6 tw-flex tw-flex-col tw-justify-around tw-items-center tw-rounded-md hover:tw-scale-110 tw-ease-in-out tw-duration-150 tw-transition-all max-[763px]:tw-w-[200px] max-[601px]:tw-w-[150px]">
                <div className="tw-justify-center tw-items-center tw-flex tw-flex-col tw-gap-2">
                  {card.icon}
                  <h2 className="tw-font-semibold tw-text-xl">{card.name}</h2>
                  {card.socials && (
                    <div className="tw-flex tw-gap-8 tw-mt-2">
                      <a
                        href={card.socials?.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="tw-cursor-pointer hover:tw-scale-110 tw-ease-in-out tw-transition-all tw-duration-100"
                      >
                        <BsLinkedin className="tw-w-6 tw-h-6 tw-text-[#0072b1]" />
                      </a>
                      <a
                        href={card.socials?.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="tw-cursor-pointer hover:tw-scale-110 tw-ease-in-out tw-transition-all tw-duration-100"
                      >
                        <BsTwitter className="tw-w-6 tw-h-6 tw-text-[#1D9BF0]" />
                      </a>
                    </div>
                  )}
                  {card.session && (
                    <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center">
                      <h2 className="tw-font-semibold tw-text-md">
                        Title:{" "}
                        <span className="tw-text-sm tw-text-primary-200">
                          {card.session.title}
                        </span>
                      </h2>
                      <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
                        <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                          {card.session.type}
                        </p>
                        <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                          {card.session.duration} minutes
                        </p>
                        <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                          {card.session.desc}
                        </p>
                      </div>
                    </div>
                  )}
                  {card.schedule && (
                    <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center">
                      <h2 className="tw-font-semibold tw-text-md">
                        Day:{" "}
                        <span className="tw-text-sm tw-text-primary-200">
                          {card.schedule.day}
                        </span>
                      </h2>
                      <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
                        <p className="tw-text-sm tw-font-semibold tw-flex tw-gap-2  tw-items-center tw-justify-center tw-text-primary-200">
                          <span>
                            <BiTime className="tw-text-slate-900 tw-text-xl" />
                          </span>
                          {card.schedule.start} - {card.schedule.end}
                        </p>
                        <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                          {card.schedule.timezone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="tw-p-2 tw-text-center tw-relative tw-rounded-md tw-font-semibold hover:tw-bg-primary-200 tw-transition-all tw-duration-150 tw-cursor-pointer tw-ease-in-out tw-w-full tw-bg-primary-100">
                  <Link href={`/dashboard/mentor?tab=${card.path}`}>
                    <p className="tw-text-white">{card.heading}</p>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="tw-flex tw-justify-center tw-w-[250px] tw-items-center">
            <h2
              onClick={() => setIsSidebarOpen(true)}
              className="tw-text-xl tw-font-semibold tw-italic hover:tw-text-primary-100 tw-cursor-pointer tw-transition-all tw-ease-in-out tw-duration-150 max-[707px]:tw-hidden"
            >
              View More...
            </h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
