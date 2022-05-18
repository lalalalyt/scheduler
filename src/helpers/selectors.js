export function getAppointmentsForDay(state, day) {
  const select = state.days.find((d) => d.name === day);
  if (state.days.length === 0 || !select) {
    return [];
  }
  return select.appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  const select = state.days.find((d) => d.name === day);
  if (state.days.length === 0 || !select) {
    return [];
  }
  // return select.interviewers;
  const dailyInterviewer=select.interviewers.map((interviewer)=>state.interviewers[interviewer])
  return dailyInterviewer
}

export function getInterview(state, interview) {
  if (!interview || !state.interviewers[interview.interviewer]) {
    return null;
  }
  const select = state.interviewers[interview.interviewer];
  return { ...interview, interviewer: select };
}
