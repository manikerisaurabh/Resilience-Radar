import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./LandingPage.css";

const LandingPage = () => {
  const sections = [
    {
      title: "Be part of the solution",
      description:
        "Contribute to a thriving community by reporting and mapping community challenges."
    },
    {
      title: "Shine a light on issues",
      description:
        "Report and map community challenges to raise awareness and prioritize solutions."
    },
    {
      title: "Strength in numbers",
      description:
        "See what concerns your neighbors share and join forces to advocate for change."
    },
    {
      title: "Awareness Raising",
      description:
        "Contribute to a thriving community by reporting and mapping community challenges"
    },
    {
      title: "A Comprehensive Guide",
      description:
        "This platform is a powerful tool to build a stronger, more informed community"
    }
  ];

  return (
    <div className="landing-page">
      <motion.div
        className="logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="r-letter text-9xl mb-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          RESILIENCE RADAR
        </motion.div>
        <motion.div
          className="r-letter mb-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
           Welcome to the Community Challenge Platform, a dynamic website designed to address various social challenges faced by our community.
        </motion.div>
      </motion.div>

      <motion.div
        transition={{ delay: 5 }}
      >
      <div className="sections">
        {sections.map((section, index) => (
          <SectionBlock key={index} section={section} index={index} />
        ))}
        </div>
      </div>
        </motion.div>
    </div>
  );
};

const SectionBlock = ({ section, index=1 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <motion.div
      ref={ref}
      className="section"
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <h2>{section.title}</h2>
      <p>{section.description}</p>
    </motion.div>
  );
};

export default LandingPage;
