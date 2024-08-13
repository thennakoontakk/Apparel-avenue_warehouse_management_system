import React from "react";
import { Link } from "react-router-dom";
import completed from "../Assets/completed.jpg";

export const Thankyou = () => {
  return (
    <div style={styles.container}>
      <section>
        <div style={styles.innerContainer}>
          <div style={styles.content}>
            <span style={styles.icon}>
              <img src={completed} alt="Completed" style={styles.image} />
            </span>
            <h1 style={styles.title}>Thank You!</h1>
            <h3 style={styles.subtitle}>
              Your Complaint / Feedback successfully submitted!
            </h3>
            <button style={styles.button}>
              <Link to="/CusComplaintHome" style={styles.link}>
                Back to Home
              </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px",
  },
  innerContainer: {
    margin: "0 auto",
    maxWidth: "800px",
  },
  content: {
    paddingTop: "30px",
    textAlign: "center",
  },
  icon: {
    marginRight: "10px",
  },
  image: {
    width: "150px",
    height: "auto",
  },
  title: {
    marginBottom: "40px",
    fontWeight: "600",
  },
  subtitle: {
    marginBottom: "50px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "20%",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
};
