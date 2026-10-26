import React from "react";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="about-me" id="about-me">
      <h1 className="about-me__title">About Me</h1>
      <p>
        I’m Stephen Byrne, a software engineer with a love for building things
        for the web and exploring what AI can do. I currently work at ServiceNow,
        where I build agentic onboarding experiences that help customers get
        started faster.
      </p>
      <p>
        My curiosity about technology started early. Unfortunately for my
        parents, that included a fascination with Apple—I grew up watching Steve
        Jobs and later Tim Cook introduce whatever I’d inevitably want next. A
        two-day web development course at DCU during Transition Year gave me my
        first chance to build something myself, and I was hooked.
      </p>
      <p>
        In 2022, I graduated from Trinity College Dublin with a distinction in my
        Master’s in Computer and Electronic Engineering. My research focused on
        detecting attacks in vehicle networks using machine learning and
        deploying those models on hardware.
      </p>
      <p>
        Before ServiceNow, I worked at Imagine Robotify, developing React
        applications, backend services, and a browser-based 3D game engine. That
        experience brought together several things I enjoy: solving technical
        problems, building interactive experiences, and seeing people use what
        I’ve made.
      </p>
      <p>
        At ServiceNow, I’ve helped build an onboarding orchestrator that brings
        together specialised agents from different business units, and helped
        lead UI development using a new internal framework based on Lit. I enjoy
        working through both how a system works behind the scenes and how it
        feels to the person using it.
      </p>
      <p>
        Outside work, I keep experimenting with personal projects, from a
        full-stack car marketplace to a messaging app and an AI-powered car
        description generator. Away from the keyboard, you’ll usually find me
        playing golf, following sport, or making the most of an Irish summer
        with a sea swim.
      </p>
    </div>
  );
}
