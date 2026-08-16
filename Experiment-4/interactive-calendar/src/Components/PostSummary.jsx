import { useMemo } from "react";

function PostSummary({ events }) {
  const summary = useMemo(() => {
    return {
      total: events.length,
      instagram: events.filter(
        (event) => event.platform === "Instagram"
      ).length,
      youtube: events.filter(
        (event) => event.platform === "YouTube"
      ).length,
      facebook: events.filter(
        (event) => event.platform === "Facebook"
      ).length,
    };
  }, [events]);

  return (
    <div className="post-summary">
      <div className="summary-card">
        <span>Total Posts</span>
        <strong>{summary.total}</strong>
      </div>

      <div className="summary-card">
        <span>Instagram</span>
        <strong>{summary.instagram}</strong>
      </div>

      <div className="summary-card">
        <span>YouTube</span>
        <strong>{summary.youtube}</strong>
      </div>

      <div className="summary-card">
        <span>Facebook</span>
        <strong>{summary.facebook}</strong>
      </div>
    </div>
  );
}

export default PostSummary;