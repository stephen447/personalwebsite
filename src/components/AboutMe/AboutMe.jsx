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
        I’m Stephen Byrne, a software engineer who loves building for the web
        and exploring what AI can do. I currently work within Impact at
        ServiceNow, helping customers maximise their value from the platform.
        I’ve helped build a new offering from the ground up, contributing to
        both the agentic configuration orchestrator and the UI console that
        guides customers through the configuration process.
      </p>
      <p>
        My curiosity about technology started early. Unfortunately for my
        parents, that included a fascination with Apple - I grew up watching
        Steve Jobs and later Tim Cook introduce whatever I’d inevitably want
        next. A two-day web development course at DCU during Transition Year
        gave me my first chance to build something myself, and I was hooked.
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
          Before ServiceNow, I worked at Imagine Robotify, building interactive
          educational games for primary school students. I developed React
          applications, backend services, and contributed to a browser-based 3D
          game engine. The role brought together several things I enjoy: solving
          technical problems, creating engaging experiences, and working with
          new technology.
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
          At ServiceNow, I’ve helped build an agent orchestrator that enables
          teams across business units to integrate specialised agents for
          configuring their products. I’ve also helped lead development of the
          second-generation UI using a new internal framework built on Lit. I’ve
          thoroughly enjoyed my first professional experience building agentic
          systems, tackling the challenges they introduce, and exploring the
          opportunities that come with working at ServiceNow’s global scale.
        </p>
        <img
          className="about-me__servicenow-logo"
          src={ServiceNowLogo}
          alt="ServiceNow logo"
          loading="lazy"
        />
      </div>
      <p>
        Outside work, I enjoy experimenting with personal projects, learning new
        technologies, and building on my skills. Away from the keyboard, you’ll
        usually find me playing or following sport, catching up with friends, or
        getting outdoors.
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
