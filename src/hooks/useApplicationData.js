import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({});
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const select = state.days.find((d) => d.name === state.day);
    const dailyAppointments = select.appointments.map((id) => appointments[id]);
    let spots = 0;
    for (let appoint of dailyAppointments) {
      if (!appoint.interview) {
        spots += 1;
      }
    }
    console.log("spots:", spots);
    const days = [...state.days];
    days[select.id - 1] = { ...select, spots };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  function cancelInterview(id) {
    console.log("delete", id);
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const select = state.days.find((d) => d.name === state.day);
    const dailyAppointments = select.appointments.map((id) => appointments[id]);
    let spots = 0;
    for (let appoint of dailyAppointments) {
      if (!appoint.interview) {
        spots += 1;
      }
    }
    console.log("spots:", spots);
    const days = [...state.days];
    days[select.id - 1] = { ...select, spots };


    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments,days }));
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
