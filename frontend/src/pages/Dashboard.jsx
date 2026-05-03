export default function Dashboard() {
  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Dashboard</h1>
        <p>Overview of today&apos;s classes, tasks, streaks, and community highlights.</p>
      </div>
      <div className="grid two-up">
        <article className="card">
          <h2>Today&apos;s Schedule</h2>
          <p>9:00 AM - Linear Algebra<br />11:00 AM - Chemistry Lab<br />2:00 PM - Study session</p>
        </article>
        <article className="card">
          <h2>To-Dos</h2>
          <p>3 pending tasks, 1 urgent assignment due tomorrow.</p>
        </article>
      </div>
      <div className="grid three-up">
        <article className="card">
          <h3>Study Streak</h3>
          <p>6 days in a row</p>
        </article>
        <article className="card">
          <h3>Resource bookmarks</h3>
          <p>4 saved notes</p>
        </article>
        <article className="card">
          <h3>Community activity</h3>
          <p>2 new answers in your feed</p>
        </article>
      </div>
    </section>
  );
}
