import React from "react";
import friendsPhoto from "../../media/Me+Friends.JPG";
import skiingPhoto from "../../media/Me Skiing.jpg";
import graduationPhoto from "../../media/Graduation.JPG";
import ServiceNowLogo from "../../media/Servicenow.png";
import RobotifyImage from "../../media/Robotify.jpeg";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="about-me" id="about-me">
      <h1 className="about-me__title">Dia Duit, I'm Stephen</h1>
      <p>
        I’m Stephen Byrne, a software engineer with a love for building things
        for the web and exploring what AI can do. I currently work at
        ServiceNow, where I build agentic onboarding experiences that help
        customers get started faster.
      </p>
      <p>
        My curiosity about technology started early. Unfortunately for my
        parents, that included a fascination with Apple—I grew up watching Steve
        Jobs and later Tim Cook introduce whatever I’d inevitably want next. A
        two-day web development course at DCU during Transition Year gave me my
        first chance to build something myself, and I was hooked.
      </p>
      <div className="about-me__split about-me__graduation">
        <p>
          In 2022, I graduated from Trinity College Dublin with a distinction in
          my Master’s in Computer and Electronic Engineering. My research
          focused on detecting attacks in vehicle networks using machine
          learning and deploying those models on hardware.
        </p>
        <figure className="about-me__graduation-photo">
          <img
            src={graduationPhoto}
            alt="Stephen at his graduation at Trinity College Dublin"
            loading="lazy"
          />
          <figcaption>Trinity College Dublin, 2022</figcaption>
        </figure>
      </div>
      <div className="about-me__robotify">
        <p>
          Before ServiceNow, I worked at Imagine Robotify, developing React
          applications, backend services, and a browser-based 3D game engine.
          That experience brought together several things I enjoy: solving
          technical problems, building interactive experiences, and seeing
          people use what I’ve made.
        </p>
        <img
          className="about-me__robotify-image"
          src={RobotifyImage}
          alt="Robotify banner with illustrated robots and a space landscape"
          loading="lazy"
        />
      </div>
      <div className="about-me__split about-me__servicenow">
        <p>
          At ServiceNow, I’ve helped build an onboarding orchestrator that
          brings together specialised agents from different business units, and
          helped lead UI development using a new internal framework based on
          Lit. I enjoy working through both how a system works behind the scenes
          and how it feels to the person using it.
        </p>
        <img
          className="about-me__servicenow-logo"
          src={ServiceNowLogo}
          alt="ServiceNow logo"
          loading="lazy"
        />
      </div>
      <p>
        Outside work, I keep experimenting with personal projects, from a
        full-stack car marketplace to a messaging app and an AI-powered car
        description generator. Away from the keyboard, you’ll usually find me
        playing golf, following sport, or making the most of an Irish summer
        with a sea swim.
      </p>

      <div
        className="about-me__photos"
        aria-label="A couple of moments outside work"
      >
        <figure className="about-me__photo">
          <img src={friendsPhoto} alt="Stephen with friends" loading="lazy" />
          <figcaption>Good times with friends</figcaption>
        </figure>
        <figure className="about-me__photo">
          <img
            src={skiingPhoto}
            alt="Stephen skiing in the mountains"
            loading="lazy"
          />
          <figcaption>Out on the slopes</figcaption>
        </figure>
      </div>
    </div>
  );
}
