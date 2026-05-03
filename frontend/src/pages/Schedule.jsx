import ScheduleBoard from '../components/schedule/ScheduleBoard';

export default function Schedule() {
  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Schedule</h1>
        <p>Create your own timetable, manage lectures, and keep track of upcoming study sessions.</p>
      </div>
      <ScheduleBoard />
      <div className="grid two-up">
        <article className="card">
          <h3>Upcoming exams</h3>
          <p>Review the next 7 days of classroom and exam events once you add them.</p>
        </article>
        <article className="card">
          <h3>Tips</h3>
          <p>Drag an event to reorder your day. Add new classes, study sessions, or exams directly above.</p>
        </article>
      </div>
    </section>
  );
}
