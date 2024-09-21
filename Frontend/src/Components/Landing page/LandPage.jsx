import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Avatar, Typography, Box } from "@mui/material";

const LandingPage = () => {
  const sections = [
    {
      title: "Be part of the solution",
      description:
        "Contribute to a thriving community by reporting and mapping community challenges.",
    },
    {
      title: "Shine a light on issues",
      description:
        "Report and map community challenges to raise awareness and prioritize solutions.",
    },
    {
      title: "Strength in numbers",
      description:
        "See what concerns your neighbors share and join forces to advocate for change.",
    },
    {
      title: "Awareness Raising",
      description:
        "Contribute to a thriving community by reporting and mapping community challenges",
    },
    {
      title: "A Comprehensive Guide",
      description:
        "This platform is a powerful tool to build a stronger, more informed community",
    },
  ];

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen py-8 bg-white mt-[8vh]">
      <motion.div
        className="text-center mb-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography letterSpacing={5}>
          <motion.div
            className="text-4xl mb-10 font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            RESILIENCE RADAR
          </motion.div>
        </Typography>
        <Typography
          variant="h5"
          className="mb-20 text-gray-400"
          // Tailwind classes for responsive text size
          style={{
            fontSize: "1.6vw",
            "@media (min-width: 768px)": { fontSize: "36px" },
          }}
        >
          Welcome to the Community Challenge Platform, a dynamic website
          designed to address various social challenges faced by our community.
        </Typography>

        <motion.div transition={{ delay: 5 }} className="mt-16">
          <div className="sections">
            {sections.map((section, index) => (
              <SectionBlock key={index} section={section} index={index} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Box>
  );
};

const SectionBlock = ({ section, index = 1 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className="section overflow-hidden"
      initial={{ opacity: 0, x: 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Typography
        variant="h4"
        className="text-md md:text-lg lg:text-xl text-gray-700" // Tailwind classes for responsive text size
      >
        {section.title}
      </Typography>
      <Typography
        variant="body1"
        className="text-sm md:text-base lg:text-lg text-gray-400" // Tailwind classes for responsive text size
      >
        {section.description}
      </Typography>
    </motion.div>
  );
};

export default LandingPage;
