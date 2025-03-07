# Fire Hazard Detector

The Fire Hazard Detection System is a real-time fire detection and monitoring solution that integrates sensor-based data collection with AI-powered fire detection. It enhances early warning mechanisms and rapid response to fire hazards, reducing potential damage and risks.

## System Components
### ESP32-based Monitoring Module
- Equipped with DHT22 (temperature & humidity), Smoke Sensor, Voltage Sensor, and an OLED screen.
- Continuously records environmental data and applies threshold-based alerts.
- Sends real-time sensor data to ThingSpeak for cloud storage and remote monitoring.

### Raspberry Pi-based Fire Detection
- Hosts the frontend and manages real-time video feed from a connected camera.
- Uses an Inception model to analyze the video stream for fire detection.
- Displays alerts and notifications when fire is detected.

## Installation & Setup of the Components
### Setting up the ESP32 Module
1. Connect DHT22, Smoke Sensor, Voltage Sensor, and OLED Screen to the ESP32.
2. Flash the ESP32 with code to read sensor values and send data to ThingSpeak.
3. Set threshold values for fire hazard alerts.

### Configuring the Raspberry Pi
1. Install necessary dependencies (OpenCV, TensorFlow, Flask for the frontend).
2. Connect a USB camera to the Raspberry Pi for live feed processing.
3. Deploy the Inception model to detect fire in video frames.
4. Start the web application to display sensor data and fire alerts.

## Run Locally

### Frontend

Clone the project

```bash
git clone https://github.com/lohithgsk/Fire-Hazard-Detector.git
```

Go to the project directory

```bash
cd fire-hazard-detector
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

By Default, the last recorded sample from Thingspeak will be displayed. 

### Model

Install all the requirements for the model.
```bash
pip install -r requirements.txt
```
Start up the server.
```bash
python app.py
```

## Application Screenshots

The About Page serves as the landing page of the application. 

![About Page](https://github.com/lohithgsk/Fire-Hazard-Detector/blob/main/images/About.png)


## References

The Inception Model was built with complete reference to Toby Breckon's paper on real time fire detection.
```
[1] A. J. Dunnings and T. P. Breckon, “Experimentally Defined Convolutional Neural Network Architecture Variants for Non-Temporal Real-Time Fire Detection,” IEEE Xplore, Oct. 01, 2018. https://ieeexplore.ieee.org/document/8451657
[2] A. Ganesh, N. Bhowmik, and T. P. Breckon, “Experimental Exploration of Compact Convolutional Neural Network Architectures for Non-Temporal Real-Time Fire Detection,” Durham Research Online (Durham University), Dec. 2019, doi: https://doi.org/10.1109/icmla.2019.00119.‌
```

## Feedback

If you have any feedback or queries, please raise an issue.
