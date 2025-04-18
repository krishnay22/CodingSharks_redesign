"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  // State for active sections
  const [activeSection, setActiveSection] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  // Sample data
  const timelineItems = [
    {
      year: 2018,
      event: "Founded Coding Sharks with just 2 tutors and 15 students",
    },
    {
      year: 2019,
      event:
        "Expanded curriculum to include web development and mobile app tracks",
    },
    {
      year: 2020,
      event: "Launched online learning platform during the pandemic",
    },
    { year: 2021, event: "Reached 1,000 student milestone" },
    {
      year: 2022,
      event: "Opened second location and introduced advanced AI courses",
    },
    {
      year: 2023,
      event: "Partnered with 5 tech companies for internship placements",
    },
  ];

  const events = [
    {
      name: "Code Camp 2023",
      description: "3-day intensive bootcamp for beginners",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      name: "Hackathon for Good",
      description: "Building solutions for local non-profits",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      name: "Tech Talk Series",
      description: "Weekly webinars with industry experts",
      image: "/placeholder.svg?height=200&width=350",
    },
  ];

  // Auto-advance timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineIndex((prev) => (prev + 1) % timelineItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [timelineItems.length]);

  // Section variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Staggered children variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Heading with animated underline
  const SectionHeading = ({ children }) => (
    <div className="section-heading">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="heading-underline"
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.3 }}
      />
    </div>
  );

  return (
    <>
      <div
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url("https://media.gettyimages.com/id/1263676100/video/group-of-business-people-working-in-a-office.jpg?s=640x640&k=20&c=5ADwA4PPsxX_jG8QFqAwvfr_3rdn7gtlsG64VUh_Fyc=")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "auto",
          height: "100vh",
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "5rem",
        }}
      >
        <div>
          <h1
            style={{
              display: "inline-block",
              borderBottom: "1px solid white",
              color: "white",
              marginBottom: "2rem",
            }}
          >
            About Us
          </h1>
          <h2 style={{ marginBottom: "2rem", color: "white" }}>
            Where passion meets
            <br />
            programming
          </h2>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "white",
                paddingTop: "10px",
                marginBottom: "2px",
              }}
            >
              Scroll Down
            </p>
            <div className="scroll-indicator">
              <div className="scroll-line"></div>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Profile Card Section */}
      <div className="profile-card">
        {/* Left section with teal background */}
        <div className="profile-left">
          {/* Placeholder for profile image */}
        </div>

        {/* Right section with white background and text content */}
        <div className="profile-right">
          <h1 className="profile-name">Alex Morgan</h1>
          <h2 className="profile-title">
            Lead Instructor & Full-Stack Developer
          </h2>

          <div className="profile-divider"></div>

          <p className="profile-bio">
            10+ years of experience specializing in React, Node.js, and cloud
            architecture. Passionate about mentoring the next generation of
            developers.
          </p>

          <div>
            <h3 className="profile-experience-title">Previously worked at</h3>
            <p className="profile-experience-list">
              1. company 2. company 3. company
            </p>
          </div>
        </div>
      </div>

      {/* New Reversed Profile Card Section - Exact Copy with Flipped Layout */}
      <div className="profile-card">
        {/* Right section with white background and text content - now on left */}
        <div className="profile-right">
          <h1 className="profile-name">Alex Morgan</h1>
          <h2 className="profile-title">
            Lead Instructor & Full-Stack Developer
          </h2>

          <div className="profile-divider"></div>

          <p className="profile-bio">
            10+ years of experience specializing in React, Node.js, and cloud
            architecture. Passionate about mentoring the next generation of
            developers.
          </p>

          <div>
            <h3 className="profile-experience-title">Previously worked at</h3>
            <p className="profile-experience-list">
              1. company 2. company 3. company
            </p>
          </div>
        </div>

        {/* Left section with teal background - now on right */}
        <div className="profile-left">
          {/* Placeholder for profile image */}
        </div>
      </div>

      <div className="about-us-container">
        {/* Establishment Section */}
        <motion.section
          className="establishment-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading>When & Why We Started</SectionHeading>

            <motion.div className="content-card" variants={itemVariants}>
              <div className="content-year">2018</div>
              <p>
                <strong>Coding Sharks</strong> began as a small tutoring service
                in a local co-working space. What started as weekend coding
                workshops quickly evolved into a comprehensive educational
                platform as we saw the growing need for personalized,
                high-quality coding education.
              </p>
              <p>
                Our founders, both industry veterans, recognized that
                traditional computer science education often left graduates
                unprepared for real-world development challenges. They
                envisioned a learning environment that would bridge this gap by
                combining theoretical knowledge with practical, hands-on
                experience.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          className="why-choose-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading>Why Choose Coding Sharks?</SectionHeading>

            <motion.div className="features-grid" variants={containerVariants}>
              {[
                {
                  title: "Industry-Active Instructors",
                  description:
                    "Learn from professionals who work in the field and bring real-world experience to the classroom.",
                },
                {
                  title: "Project-Based Curriculum",
                  description:
                    "Build your portfolio while you learn with projects that simulate real development environments.",
                },
                {
                  title: "Small Class Sizes",
                  description:
                    "Enjoy personalized attention with our maximum 8:1 student-to-instructor ratio.",
                },
                {
                  title: "1-on-1 Mentorship",
                  description:
                    "Get paired with a dedicated mentor who guides your learning journey and career development.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="feature-number">0{index + 1}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Choosing the Right Class Section */}
        <motion.section
          className="right-class-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading>How to Choose the Right Class</SectionHeading>

            <motion.div className="tips-container" variants={containerVariants}>
              <motion.div className="tip-card" variants={itemVariants}>
                <div className="tip-icon">🎯</div>
                <h3>Assess Your Current Level</h3>
                <p>
                  Be honest about your skills. Taking a class that's too
                  advanced can be discouraging, while one that's too basic will
                  bore you.
                </p>
              </motion.div>

              <motion.div className="tip-card" variants={itemVariants}>
                <div className="tip-icon">🚀</div>
                <h3>Consider Your Goals</h3>
                <p>
                  Are you learning to change careers, enhance current skills, or
                  just for fun? Different goals require different learning
                  paths.
                </p>
              </motion.div>

              <motion.div className="tip-card" variants={itemVariants}>
                <div className="tip-icon">🔍</div>
                <h3>Try Before You Commit</h3>
                <p>
                  Take advantage of our free intro sessions to get a feel for
                  the teaching style and content before enrolling.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vision & Values Section */}
        <motion.section
          className="vision-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading>Our Vision & Values</SectionHeading>

            <motion.div
              className="values-container"
              variants={containerVariants}
            >
              {[
                { name: "Excellence", icon: "✨" },
                { name: "Innovation", icon: "💡" },
                { name: "Community", icon: "🤝" },
                { name: "Accessibility", icon: "🌐" },
                { name: "Growth Mindset", icon: "🌱" },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="value-pill"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#ff7a45",
                    boxShadow: "0 10px 20px rgba(255, 122, 69, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="value-icon">{value.icon}</span>
                  <span className="value-name">{value.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* History Timeline Section - Enhanced */}
        <motion.section
          className="timeline-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading>Our Journey</SectionHeading>

            <div className="timeline-wrapper">
              <div className="timeline-progress-container">
                <motion.div
                  className="timeline-progress"
                  animate={{
                    height: `${
                      ((activeTimelineIndex + 1) / timelineItems.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="timeline-items">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`timeline-item ${
                      activeTimelineIndex === index ? "active" : ""
                    }`}
                    initial={{ opacity: 0.6, x: 0 }}
                    animate={{
                      opacity: activeTimelineIndex === index ? 1 : 0.6,
                      x: activeTimelineIndex === index ? 0 : 0,
                      scale: activeTimelineIndex === index ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveTimelineIndex(index)}
                  >
                    <div className="timeline-marker">
                      <motion.div
                        className="timeline-dot"
                        animate={{
                          scale: activeTimelineIndex === index ? 1.5 : 1,
                          backgroundColor:
                            activeTimelineIndex === index
                              ? "#ff7a45"
                              : "#FF9A70",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      {index < timelineItems.length - 1 && (
                        <div className="timeline-line-segment" />
                      )}
                    </div>

                    <motion.div
                      className="timeline-content"
                      animate={{
                        boxShadow:
                          activeTimelineIndex === index
                            ? "0 15px 30px rgba(0, 0, 0, 0.1)"
                            : "0 5px 15px rgba(0, 0, 0, 0.05)",
                        y: activeTimelineIndex === index ? -5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="timeline-year">{item.year}</div>
                      <p>{item.event}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Events Section */}
        <motion.section
          className="events-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading>Events We've Organized</SectionHeading>

            <motion.div className="events-grid" variants={containerVariants}>
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  className="event-card"
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="event-image-container">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                    />
                    <div className="event-overlay">
                      <span>View Details</span>
                    </div>
                  </div>
                  <div className="event-info">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Connections Section */}
        <motion.section
          className="connections-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading>Our Partners</SectionHeading>

            <motion.p className="connections-intro" variants={itemVariants}>
              We're proud to collaborate with leading tech companies and
              educational institutions:
            </motion.p>

            <motion.div className="partners-grid" variants={containerVariants}>
              {["TechCorp", "EduInnovate", "DevHub", "CodeAcademy"].map(
                (partner, index) => (
                  <motion.div
                    key={index}
                    className="partner-logo"
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {partner}
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
        </motion.section>

        <style jsx>{`
          /* Scroll indicator styles */
          .scroll-indicator {
            position: relative;
            height: 60px;
            width: 2px;
            margin-left: 10px;
          }

          .scroll-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.3);
            overflow: hidden;
          }

          .scroll-line::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            animation: scrollDown 1.5s ease-in-out infinite;
          }

          .scroll-arrow {
            position: absolute;
            bottom: -5px;
            left: -4px;
            width: 10px;
            height: 10px;
            border-right: 2px solid white;
            border-bottom: 2px solid white;
            transform: rotate(45deg);
            animation: fadeInOut 1.5s ease-in-out infinite;
          }

          @keyframes scrollDown {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100%);
            }
          }

          @keyframes fadeInOut {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }

          /* Profile card styles */
          .profile-card {
            display: flex;
            width: 100%;
            height: 100vh;
            margin: 0;
            overflow: hidden;
          }

          /* Left section */
          .profile-left {
            width: 50%;
            background-color: #3a8599;
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url("https://media.istockphoto.com/id/1288039261/photo/portrait-of-a-smiling-middle-aged-man-of-indian-origin.jpg?s=1024x1024&w=is&k=20&c=d5zStFdzfq2iVZt2cXJZttDYZ0i32g400peD-pr3K0g=");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          /* Right section */
          .profile-right {
            width: 80%;
            background-color: white;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          /* Name styling */
          .profile-name {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          /* Title styling */
          .profile-title {
            font-size: 1.2rem;
            margin-bottom: 0rem;
          }

          /* Divider line */
          .profile-divider {
            width: 100%;
            height: 2px;
            background-color: #333;
            margin: 0.5rem 0 1.5rem 0;
          }

          /* Bio text */
          .profile-bio {
            font-size: 1.6rem;
            line-height: 1.6;
            font-weight: 100;
            margin-bottom: 13rem;
          }

          /* Experience section title */
          .profile-experience-title {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
          }

          /* Experience list */
          .profile-experience-list {
            font-size: 1.1rem;
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .profile-card {
              flex-direction: column;
              height: auto;
              min-height: 100vh;
              overflow-y: auto;
            }

            .profile-left,
            .profile-right {
              width: 100%;
              height: auto;
            }

            .profile-left {
              min-height: 50vh;
            }
          }

          /* Base Styles */
          .about-us-container {
            font-family: "Inter", sans-serif;
            color: #333;
            max-width: 100%;
            overflow-x: hidden;
            background-color: #fff;
          }

          section {
            padding: 100px 20px;
            position: relative;
          }

          .section-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          h1 {
            font-size: 4.5rem;
            font-weight: 800;
            margin: 0;
            line-height: 1.1;
            letter-spacing: -0.02em;
          }

          h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 15px 0;
            line-height: 1.2;
          }

          h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 15px 0;
            line-height: 1.3;
          }

          p {
            font-size: 1.1rem;
            line-height: 1.7;
            margin: 0 0 20px 0;
            color: #555;
          }

          /* Section Heading */
          .section-heading {
            text-align: center;
            margin-bottom: 60px;
            position: relative;
          }

          .heading-underline {
            height: 4px;
            background: #ff9a70;
            margin: 15px auto 0;
            border-radius: 2px;
          }

          /* Establishment Section */
          .establishment-section {
            background-color: white;
          }

          .content-card {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            position: relative;
          }

          .content-year {
            position: absolute;
            top: -20px;
            left: 40px;
            background: #ff9a70;
            color: white;
            padding: 8px 20px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 1.2rem;
          }

          /* Why Choose Us Section */
          .why-choose-section {
            background-color: #f9f9f9;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
          }

          .feature-card {
            background: white;
            padding: 40px 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            position: relative;
          }

          .feature-number {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2.5rem;
            font-weight: 800;
            color: rgba(255, 154, 112, 0.1);
          }

          /* Right Class Section */
          .right-class-section {
            background-color: white;
          }

          .tips-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }

          .tip-card {
            background: white;
            padding: 40px 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            position: relative;
          }

          .tip-icon {
            font-size: 2rem;
            margin-bottom: 20px;
          }

          /* Vision & Values Section */
          .vision-section {
            background-color: #f9f9f9;
          }

          .values-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .value-pill {
            background: #ff9a70;
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 10px 20px rgba(255, 154, 112, 0.2);
          }

          .value-icon {
            font-size: 1.2rem;
          }

          /* Timeline Section - Enhanced */
          .timeline-section {
            background-color: white;
            padding-bottom: 150px;
          }

          .timeline-wrapper {
            position: relative;
            max-width: 800px;
            margin: 80px auto 0;
            padding-left: 50px;
          }

          .timeline-progress-container {
            position: absolute;
            top: 0;
            left: 20px;
            width: 4px;
            height: 100%;
            background: #f0f0f0;
            border-radius: 2px;
            overflow: hidden;
          }

          .timeline-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #ff9a70;
            border-radius: 2px;
          }

          .timeline-items {
            position: relative;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 60px;
            cursor: pointer;
          }

          .timeline-item:last-child {
            margin-bottom: 0;
          }

          .timeline-marker {
            position: absolute;
            left: -50px;
            top: 15px;
            height: 100%;
          }

          .timeline-dot {
            width: 24px;
            height: 24px;
            background: #ff9a70;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 0 0 4px rgba(255, 154, 112, 0.2);
            z-index: 2;
          }

          .timeline-line-segment {
            position: absolute;
            top: 24px;
            left: 12px;
            width: 4px;
            height: calc(100% + 36px);
            background: transparent;
            transform: translateX(-50%);
          }

          .timeline-content {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }

          .timeline-year {
            display: inline-block;
            background: #ff9a70;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 1.1rem;
          }

          /* Events Section */
          .events-section {
            background-color: #f9f9f9;
          }

          .events-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }

          .event-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }

          .event-image-container {
            position: relative;
            height: 200px;
            overflow: hidden;
          }

          .event-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }

          .event-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 154, 112, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .event-card:hover .event-image-container img {
            transform: scale(1.1);
          }

          .event-card:hover .event-overlay {
            opacity: 1;
          }

          .event-info {
            padding: 30px;
          }

          /* Connections Section */
          .connections-section {
            background-color: white;
          }

          .connections-intro {
            text-align: center;
            margin-bottom: 40px;
          }

          .partners-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
          }

          .partner-logo {
            height: 100px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            font-weight: 700;
            color: #555;
            font-size: 1.2rem;
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            h1 {
              font-size: 3rem;
            }

            h2 {
              font-size: 2rem;
            }

            section {
              padding: 70px 20px;
            }

            .features-grid,
            .tips-container,
            .events-grid,
            .partners-grid {
              grid-template-columns: 1fr;
            }

            .timeline-wrapper {
              padding-left: 40px;
            }

            .timeline-marker {
              left: -40px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
