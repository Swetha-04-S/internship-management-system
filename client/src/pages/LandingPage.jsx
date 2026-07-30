import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div
            className="container-fluid d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh",
                background: "#f8f9fa",
            }}
        >
            <div className="text-center">

                <div className="mb-4">

                    <img
                        src="/logo.png"
                        alt="InterFlow"
                        style={{
                            width: "120px",
                        }}
                        className="mb-4"
                    />

                    <h1
                        className="fw-bold"
                        style={{
                            color: "#4B2E83",
                            fontSize: "58px",
                            letterSpacing: "1px",
                        }}
                    >
                        INTERFLOW
                    </h1>

                    <p
                        className="text-muted mb-2"
                        style={{
                            fontSize: "24px",
                            fontWeight: "500",
                        }}
                    >
                        Smart Internship Management Platform
                    </p>

                    <p
                        className="text-secondary mx-auto mb-5"
                        style={{
                            maxWidth: "720px",
                            fontSize: "17px",
                            lineHeight: "1.7",
                        }}
                    >
                        Simplifying internship management through project assignment,
                        task tracking, submission review, announcements and
                        performance monitoring.
                    </p>

                </div>

                <div className="row justify-content-center">

                    <div className="col-md-5 mb-4">

                        <div className="card shadow border-0 h-100">

                            <div className="card-body p-5">

                                <div
                                    style={{
                                        fontSize: "60px",
                                    }}
                                >
                                    👨‍💼
                                </div>

                                <h3 className="mt-3">
                                    Coordinator
                                </h3>

                                <p className="text-muted">
                                    Create internship projects, assign students,
                                    review submissions, publish announcements
                                    and monitor internship progress.
                                </p>

                                <Link
                                    to="/login"
                                    className="btn btn-primary mt-3"
                                >
                                    Continue as Coordinator
                                </Link>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-5 mb-4">

                        <div className="card shadow-lg border-0 h-100">

                            <div className="card-body p-5 text-center">

                                <div
                                    style={{
                                        fontSize: "60px",
                                    }}
                                >
                                    👨‍🎓
                                </div>

                                <h3 className="mt-3">
                                    Student
                                </h3>

                                <p className="text-muted">
                                    Access assigned projects, complete tasks,
                                    submit work and track your internship
                                    progress with ease.
                                </p>

                                <Link
                                    to="/student-portal"
                                    className="btn btn-success mt-3"
                                >
                                    Continue as Student
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default LandingPage;