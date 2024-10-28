import React, { useState } from "react";
import "./accordion.css";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    "What is PromptPie?",
    "How does it work?",
    "Are my data safe with PromptPie?",
    "Is using it free of cost?",
    "What are the benefits of premium subscription?",
  ];

  const answers = [
    "PromptPie is an innovative data analytics tool that integrates Google’s Gemini LLM to allow users to generate SQL queries through natural language input. It aims to democratize data access and analysis, making it easier for users without deep technical expertise to derive actionable insights from raw data.",
    "Users can input queries in plain language, and PromptPie translates these into SQL queries, facilitating data retrieval. Additionally, it features an automated analytics pipeline that suggests visualizations and conducts advanced statistical analyses using Python modules and Chart.js, allowing users to interpret data effortlessly.",
    "PromptPie prioritizes data security and adheres to industry standards for data protection. Users' data is typically handled with encryption and privacy measures to ensure that sensitive information remains secure.",
    "PromptPie offers a free version with essential features, but certain advanced functionalities may require a premium subscription.",
    "A premium subscription usually includes additional features such as enhanced analytics capabilities, access to more advanced statistical tools, priority support, and the ability to work with larger datasets or more complex queries, providing a more comprehensive data analysis experience.",
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-accordion">
        {questions.map((question, index) => (
          <div className="faq-accordion-item" key={index}>
            <button
              aria-expanded={activeIndex === index}
              onClick={() => toggleAccordion(index)}
              className="faq-accordion-button"
            >
              <span className="faq-accordion-title">{question}</span>
              <span className="faq-icon" aria-hidden="true"></span>
            </button>
            <div
              className={`faq-accordion-content ${
                activeIndex === index ? "faq-active" : ""
              }`}
            >
              <p>{answers[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
