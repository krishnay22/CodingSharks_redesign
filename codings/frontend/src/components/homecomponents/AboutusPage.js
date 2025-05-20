"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Rocket,
  Target,
  Search,
  Sparkles,
  Lightbulb,
  Users,
  Globe,
  Sprout,
  Calendar,
  Code,
  Presentation,
} from "lucide-react";
import PSirimage from "../../images/images for project/pradeepsir.jpg";
import Asirimage from "../../images/images for project/adarshsir.jpg";

export default function AboutUs() {
  // State for active sections
  const [activeSection, setActiveSection] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  // Ref to track which headings have been animated
  const animatedHeadings = useRef(new Set());

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
      icon: <Code className="h-6 w-6 text-white" />,
    },
    {
      name: "Hackathon for Good",
      description: "Building solutions for local non-profits",
      image: "/placeholder.svg?height=200&width=350",
      icon: <Calendar className="h-6 w-6 text-white" />,
    },
    {
      name: "Tech Talk Series",
      description: "Weekly webinars with industry experts",
      image: "/placeholder.svg?height=200&width=350",
      icon: <Presentation className="h-6 w-6 text-white" />,
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

  // Heading with animated underline that only animates once
  const SectionHeading = ({ children, id }) => {
    const headingId = id || children.toString();
    const hasAnimated = animatedHeadings.current.has(headingId);

    return (
      <div className="section-heading">
        <motion.h2
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            animatedHeadings.current.add(headingId);
          }}
        >
          {children}
        </motion.h2>
        <motion.div
          className="heading-underline"
          initial={hasAnimated ? { width: "80px" } : { width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("https://media.gettyimages.com/id/1263676100/video/group-of-business-people-working-in-a-office.jpg?s=640x640&k=20&c=5ADwA4PPsxX_jG8QFqAwvfr_3rdn7gtlsG64VUh_Fyc=")',
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: "inline-block",
              borderBottom: "1px solid white",
              color: "white",
              marginBottom: "2rem",
            }}
          >
            About Us
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginBottom: "2rem", color: "white" }}
          >
            Where passion meets
            <br />
            programming
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
          </motion.div>
        </div>
      </div>

      {/* Original Profile Card Section */}
      <div className="profile-card">
        {/* Left section with teal background */}
        <div
          className="profile-left"
          style={{ backgroundImage: `url(${PSirimage})` }}
        >
          {/* Placeholder for profile image */}
        </div>

        {/* Right section with white background and text content */}
        <motion.div
          className="profile-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="profile-name">Pradeep Patidar</h1>
          <h2 className="profile-title">
            NodeJS | ExpressJs | MongoDB | MySql |
          </h2>

          <div className="profile-divider"></div>

          <p className="profile-bio">
            20+ years of experience specializing in React, Node.js, and cloud
            architecture. Passionate about mentoring the next generation of
            developers.
          </p>

          <div>
            <h3 className="profile-experience-title">Previously worked at</h3>
            <p className="profile-experience-list">
              <span className="company-tag">
                Apoliums infotech india private limited
              </span>
              <span className="company-tag">
                FXBytes Technologies Pvt. Ltd.
              </span>
              <span className="company-tag">Joister</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* New Reversed Profile Card Section - Exact Copy with Flipped Layout */}
      <div className="profile-card">
        {/* Right section with white background and text content - now on left */}
        <motion.div
          className="profile-right"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="profile-name">Adarsh Kewat</h1>
          <h2 className="profile-title">
            Curriculum Director & Front End developer
          </h2>

          <div className="profile-divider"></div>

          <p className="profile-bio">
            My journey as a software developer started with a strong foundation
            in programming languages such as JavaScript. Over the years, I have
            honed my skills in FullStack development, with over 5+ years of
            experience.
          </p>

          <div>
            <h3 className="profile-experience-title">Previously worked at</h3>
            <p className="profile-experience-list">
              <span className="company-tag">Aventior</span>
              <span className="company-tag">Apexon</span>
              <span className="company-tag">Pfizer</span>
            </p>
          </div>
        </motion.div>

        {/* Left section with teal background - now on right */}
        <div
          className="profile-left profile-left-alt"
          style={{ backgroundImage: `url(${Asirimage})` }}
        >
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
            <SectionHeading id="establishment">
              When & Why We Started
            </SectionHeading>

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
            <SectionHeading id="why-choose">
              Why Choose Coding Sharks?
            </SectionHeading>

            <motion.div className="features-grid" variants={containerVariants}>
              {[
                {
                  title: "Industry-Active Instructors",
                  description:
                    "Learn from professionals who work in the field and bring real-world experience to the classroom.",
                  icon: <Award className="feature-icon" />,
                },
                {
                  title: "Project-Based Curriculum",
                  description:
                    "Build your portfolio while you learn with projects that simulate real development environments.",
                  icon: <Code className="feature-icon" />,
                },
                {
                  title: "Small Class Sizes",
                  description:
                    "Enjoy personalized attention with our maximum 8:1 student-to-instructor ratio.",
                  icon: <Users className="feature-icon" />,
                },
                {
                  title: "1-on-1 Mentorship",
                  description:
                    "Get paired with a dedicated mentor who guides your learning journey and career development.",
                  icon: <Rocket className="feature-icon" />,
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
                  <div className="feature-icon-wrapper">{feature.icon}</div>
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
            <SectionHeading id="right-class">
              How to Choose the Right Class
            </SectionHeading>

            <motion.div className="tips-container" variants={containerVariants}>
              <motion.div className="tip-card" variants={itemVariants}>
                <div className="tip-icon-wrapper">
                  <Target className="tip-icon" />
                </div>
                <h3>Assess Your Current Level</h3>
                <p>
                  Be honest about your skills. Taking a class that's too
                  advanced can be discouraging, while one that's too basic will
                  bore you.
                </p>
              </motion.div>

              <motion.div className="tip-card" variants={itemVariants}>
                <div className="tip-icon-wrapper">
                  <Rocket className="tip-icon" />
                </div>
                <h3>Consider Your Goals</h3>
                <p>
                  Are you learning to change careers, enhance current skills, or
                  just for fun? Different goals require different learning
                  paths.
                </p>
              </motion.div>

              <motion.div className="tip-card" variants={itemVariants}>
                <div className="tip-icon-wrapper">
                  <Search className="tip-icon" />
                </div>
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
            <SectionHeading id="vision">Our Vision & Values</SectionHeading>

            <motion.div
              className="values-container"
              variants={containerVariants}
            >
              {[
                {
                  name: "Excellence",
                  icon: <Sparkles className="value-icon-svg" />,
                },
                {
                  name: "Innovation",
                  icon: <Lightbulb className="value-icon-svg" />,
                },
                {
                  name: "Community",
                  icon: <Users className="value-icon-svg" />,
                },
                {
                  name: "Accessibility",
                  icon: <Globe className="value-icon-svg" />,
                },
                {
                  name: "Growth Mindset",
                  icon: <Sprout className="value-icon-svg" />,
                },
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

        {/* History Timeline Section */}
        <motion.section
          className="history-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="section-container">
            <SectionHeading id="history">Our Journey</SectionHeading>

            <motion.div
              className="timeline-container"
              variants={containerVariants}
            >
              <div className="timeline-line">
                <motion.div
                  className="timeline-line-progress"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                ></motion.div>
              </div>

              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`timeline-item ${
                    activeTimelineIndex === index ? "active" : ""
                  }`}
                  variants={itemVariants}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>{item.year}</h3>
                    <p>{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
            <SectionHeading id="events">Events We've Organized</SectionHeading>

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
                    <div className="event-icon-wrapper">{event.icon}</div>
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
            <SectionHeading id="partners">Our Partners</SectionHeading>

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
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          .profile-left-alt {
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
            margin-bottom: 8rem;
          }

          /* Experience section title */
          .profile-experience-title {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
          }

          /* Experience list */
          .profile-experience-list {
            font-size: 1.1rem;
            display: flex;
            gap: 10px;
          }

          .company-tag {
            background-color: #f5f5f5;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
            color: #555;
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
            background-image: url("https://media.istockphoto.com/id/1331350008/photo/business-team-working-on-a-laptop-computer.jpg?s=1024x1024&w=is&k=20&c=kiAEBApRWT_qgVrM0MHF3wMxh5H14vfsaDHg8354Y_Y=");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh;
            width: 100%;
          }

          .content-card {
            background: white;
            margin-top: 140px;
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

          .feature-icon-wrapper {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background-color: #ff9a70;
            border-radius: 50%;
            margin-bottom: 20px;
          }

          .feature-icon {
            width: 24px;
            height: 24px;
            color: white;
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

          .tip-icon-wrapper {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background-color: #ff9a70;
            border-radius: 50%;
            margin-bottom: 20px;
          }

          .tip-icon {
            width: 24px;
            height: 24px;
            color: white;
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
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .value-icon-svg {
            width: 20px;
            height: 20px;
            color: white;
          }

          /* Timeline Section - Enhanced */
          /* Timeline Section - Fixed */
          .history-section {
            background-color: white;
            padding: 100px 20px;
          }

          .timeline-container {
            position: relative;
            max-width: 1000px;
            margin: 60px auto 0;
            padding: 20px 0;
          }

          .timeline-line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 3px;
            background: rgba(255, 154, 112, 0.3);
            transform: translateX(-50%);
            overflow: hidden;
          }

          .timeline-line-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #ff9a70;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 50px;
            opacity: 0.7;
            transition: all 0.5s ease;
          }

          .timeline-item.active {
            opacity: 1;
          }

          .timeline-dot {
            position: absolute;
            left: 50%;
            width: 20px;
            height: 20px;
            background: #ff9a70;
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 2;
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .timeline-item.active .timeline-dot {
            transform: translateX(-50%) scale(1.3);
            background: #ff7a45;
            box-shadow: 0 0 15px rgba(255, 122, 69, 0.5);
          }

          .timeline-content {
            width: 45%;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease;
          }

          .timeline-item:nth-child(odd) .timeline-content {
            margin-left: auto;
          }

          .timeline-item.active .timeline-content {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          /* Responsive timeline for mobile */
          @media (max-width: 768px) {
            .timeline-line {
              left: 30px;
            }

            .timeline-dot {
              left: 30px;
            }

            .timeline-content {
              width: calc(100% - 60px);
              margin-left: 60px !important;
            }
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
            position: relative;
          }

          .event-icon-wrapper {
            position: absolute;
            top: -25px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #ff9a70;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(255, 154, 112, 0.3);
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
