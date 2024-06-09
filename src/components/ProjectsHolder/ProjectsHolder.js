import "./ProjectsHolder.css"
import Project from "../Project/project"
export default function ProjectsHolder () {
    const description1 = "The project's goal was to use machine learning to create an intrusion detection systems (IDS) for vehicular networks and deploy the model on hardware. The project was broke down into different phases. Dataset Selection and Model Training: Datasets were researched to train the models. I decided on a dataset which had never been used for research before. Utilizing Convolutional Neural Network (CNN), models were created and fine-tuned to detect various network attacks, including Targeted ID attacks and Fuzzing attacks. Hardware Selection and Model Deployment: An FPGA was chosen for deploying the models as it was the best compromise between performance and power consumption. Following this, the trained models were quantized, demonstrating minimal performance impact post-quantization. Subsequently, the models were successfully implemented on an Ultra 96 board using Vitis-AI, which could be then added to a vehicles CANBUS without drawing excessive power. Performance Optimization and Analysis: To achieve optimal performance, latency and power consumption across different DPU’s were recorded and analysed. This analysis enabled the optimal compromise between performance and resource utilization."
    const description2 = "I recently completed a personal project - full stack car advertising application similar to CarZone. The application allows users to register an account, granting them the ability to create detailed adverts with image uploads. Users can seamlessly update their profiles and advert information. A PostgreSQL database is used to store user profiles and advert data efficiently. Django was used for interfacing with the database, as it aligns with our tech stack at Imagine Robotify and it enabled me to gain experience using it.  On the frontend, React was used for its component-based architecture and its popularity in the tech world."
    const description3 = "The main project I have been working on at my time at Imagine Robotify has been re-developing the digital game based learning platform. The project is currently still in progress. Firstly, a browser based game engine was developed from the ground up using Javascript libraries THREE JS and CANNON ES for the 3D and physics respectively. The engine is based on the entity component system architecture. Currently, the internal toolset for creating learning games for the engine (Unity Alternative) are being developed. We are storing everything in an AWS S3 bucket for the project MVP, as we have limited developer resources. The plan is to use a postgreSQL database once MVP is complete. We are developing out the frontend of the toolset using React. We are also developing out an API server for interfacing with the s3 bucket. This is being developed using Express JS in a RESTFUL Architecture. I have also gained experience of using Docker, CI/CD pipelines and Jest testing framework while working on this project."
    return(
        <div className="projects-holder__container" id="project__container">
            <h1 className="projects-holder__title">Projects</h1>
            <Project title="Full Stack Car Advertising App" year="2024" description={description2} techStack={["React", "Django", "PostgreSQL", "JavaScript", "CSS", "Docker"]} />
            <Project title="Digital Game Based Learning Platform" year="2023-2024" description={description3} techStack={["React", "Express JS", "Node JS", "JavaScript", "CSS", "Docker", "AWS" ]} />
            <Project title="Masters Project" year="2021-2022" description={description1} techStack={["Machine Learning", "Python", "TensorFlow", "Vitis AI", ]} />
        </div>
    )
    
}
