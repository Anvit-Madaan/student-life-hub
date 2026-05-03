import TaskList from '../components/tasks/TaskList';

export default function Tasks() {
  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Tasks</h1>
        <p>Track assignments, prioritize work, and maintain your completion streak.</p>
      </div>
      <TaskList />
    </section>
  );
}
