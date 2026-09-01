function PerformanceMonitor({
  events,
  lastAction,
  optimized,
  renderCount,
}) {
  return (
    <div className="performance-monitor">

      <div className="performance-header">
        <div>
          <h2>Performance Monitor</h2>
          <p>
            React rendering and optimization metrics
          </p>
        </div>

        <span
          className={
            optimized
              ? "performance-status optimized"
              : "performance-status normal"
          }
        >
          {optimized
            ? "OPTIMIZED"
            : "NON-OPTIMIZED"}
        </span>
      </div>


      <div className="performance-grid">

        <div className="metric-card">
          <span>Calendar Renders</span>
          <strong>{renderCount}</strong>
          <small>
            {optimized
              ? "Stable rendering"
              : "Additional rendering"}
          </small>
        </div>


        <div className="metric-card">
          <span>Total Events</span>
          <strong>{events.length}</strong>
          <small>
            Currently scheduled posts
          </small>
        </div>


        <div className="metric-card">
          <span>Optimization</span>
          <strong>
            {optimized ? "ON" : "OFF"}
          </strong>
          <small>
            {optimized
              ? "Memoization enabled"
              : "Standard rendering"}
          </small>
        </div>


        <div className="metric-card">
          <span>Last Action</span>
          <strong className="action-text">
            {lastAction}
          </strong>
          <small>
            Most recent interaction
          </small>
        </div>

      </div>


      <div className="render-info">

        <div>
          <strong>
            Render Tracking
          </strong>

          <p>
            Drag a post or interact with the
            calendar to compare rendering impact.
          </p>
        </div>

        <div className="render-rule">

          <span>
            Optimized
          </span>

          <strong>
            +1
          </strong>

          <span>
            Non-Optimized
          </span>

          <strong>
            +2
          </strong>

        </div>

      </div>

    </div>
  );
}

export default PerformanceMonitor;