export function getAppointmentsForDay(state, day) {
  const select = state.days.find((d) => d.name === day);
  if (state.days.length === 0 || !select) {
    return [];
  }
  return select.appointments.map((id) => state.appointments[id]);
}
