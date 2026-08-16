import useRenderCount from "../hooks/useRenderCount";

function PerformanceMonitor({ events, lastAction }) {
  const renderCount = useRenderCount();

  return (
    <div className="performance-monitor">
      <h3>Performance Monitor</h3>

      <div className="monitor-stat">
        <span>Calendar Renders</span>
        <strong>{renderCount}</strong>
      </div>

      <div className="monitor-stat">
        <span>Total Events</span>
        <strong>{events.length}</strong>
      </div>

      <div className="monitor-stat">
        <span>Last Action</span>
        <strong>{lastAction}</strong>
      </div>

      <div className="monitor-stat">
        <span>Optimization</span>
        <strong>Active</strong>
      </div>
    </div>
  );
}

export default PerformanceMonitor;