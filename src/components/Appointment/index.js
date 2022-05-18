import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW, true))
      .catch((error) => {console.log(error);
      transition(ERROR_SAVE,true)});
  }

  function onDelete() {
    transition(DELETING,true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE,true);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"ARE YOU SURE YOU WOULD LIKE TO DELETE?"}
          onCancel={back}
          onConfirm={onDelete}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={Object.values(props.interviewers)}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && <Error onClose={back} message={"Could not delete appointment"}/>}
      {mode === ERROR_SAVE && <Error onClose={back} message={"Could not save appointment"}/>}
    </article>
  );
};

export default Appointment;
