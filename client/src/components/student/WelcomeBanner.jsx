import { useEffect, useState } from "react";

function WelcomeBanner() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
  }, []);

  const hour = new Date().getHours();

  let greeting = "Good Evening";
  let emoji = "🌙";

  if (hour < 12) {
    greeting = "Good Morning";
    emoji = "🌅";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    emoji = "☀️";
  }

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <h2 className="fw-bold">
          {emoji} {greeting}, {user?.name}
        </h2>

        <p className="text-muted mb-2">
          Welcome back to your Internship Portal.
        </p>

        <small className="text-secondary">
          {today}
        </small>

      </div>
    </div>
  );
}

export default WelcomeBanner;
