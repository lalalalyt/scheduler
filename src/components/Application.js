import React from "react";
import { useState, useEffect } from "react";
import DayList from "./DayList";
import axios from "axios";

import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({});
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  // const setAppointments = (appointments) =>
  //   setState((prev) => ({ ...prev, appointments }));

  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments")]).then(
      (all) => {
        setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data }));
      }
    );
  }, []);

  // const appointmentArray = Object.values(state.appointments);
  const schedule = dailyAppointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      // id={appointment.id}
      // time={appointment.time}
      // interview={appointment.interview}
      {...appointment}
    />
  ));

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
