import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function ScheduleBoard() {
  const [blocks, setBlocks] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', type: 'class' });

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await api.get('/schedule');
        setBlocks(response.data);
      } catch (error) {
        console.error('Failed to load schedule:', error);
      }
    };
    loadSchedule();
  }, []);

  const parseTimeToISO = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute ?? 0, 0, 0);
    return date.toISOString();
  };

  const handleDragStart = (id) => setDraggingId(id);

  const handleDrop = (index) => {
    const dragged = blocks.find((item) => item._id === draggingId);
    const filtered = blocks.filter((item) => item._id !== draggingId);
    filtered.splice(index, 0, dragged);
    setBlocks(filtered);
    setDraggingId(null);
  };

  const addEvent = async (event) => {
    event.preventDefault();
    if (!newEvent.title.trim() || !newEvent.time.trim()) return;
    try {
      const start = parseTimeToISO(newEvent.time);
      const end = new Date(new Date(start).getTime() + 3600 * 1000).toISOString();
      const response = await api.post('/schedule', {
        title: newEvent.title.trim(),
        type: newEvent.type,
        start,
        end
      });
      setBlocks((current) => [response.data, ...current]);
      setNewEvent({ title: '', time: '', type: 'class' });
    } catch (error) {
      console.error('Failed to add schedule event:', error);
    }
  };

  const removeEvent = async (id) => {
    try {
      await api.delete(`/schedule/${id}`);
      setBlocks((current) => current.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Failed to remove schedule event:', error);
    }
  };

  return (
    <div className="schedule-board card">
      <div className="board-header">
        <h2>Drag & drop timetable</h2>
        <p>Reorder your schedule and add classes, study sessions, or exams in seconds.</p>
      </div>
      <form className="inline-form" onSubmit={addEvent}>
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="time"
          placeholder="Time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}>
          <option value="class">Class</option>
          <option value="study">Study</option>
          <option value="exam">Exam</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" className="button primary">Add</button>
      </form>
      <div className="board-list">
        {blocks.map((block, index) => (
          <div
            key={block._id}
            className={`schedule-block ${block.type}`}
            draggable
            onDragStart={() => handleDragStart(block._id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            <div>
              <strong>{block.title}</strong>
              <span>{new Date(block.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="schedule-actions">
              <span className="chip">{block.type}</span>
              <button type="button" className="button secondary" onClick={() => removeEvent(block._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
