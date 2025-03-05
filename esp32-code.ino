#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <Adafruit_SSD1306.h>

#define DHT_PIN 4
#define SMOKE_SENSOR_PIN 35
#define VOLTAGE_SENSOR_PIN 34
#define OLED_SDA 21
#define OLED_SCL 22

#define OLED_WIDTH 128
#define OLED_HEIGHT 32

const char *ssid = "<replace-with-your-wifi-name>";  
const char *password = "<replace-with-your-wifi-password>"; 
const char *thingspeak_api_key = "<replace-with-your-thingspeak-write-api-key>"; 

DHT dht(DHT_PIN, DHT11);
Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

float temperature = 0;
float humidity = 0;
int smokeLevel = 0;
float voltage = 0;

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Initialize OLED
  Wire.begin(OLED_SDA, OLED_SCL);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    while (1);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("OLED Initialized!");
  display.display();
  delay(2000); 

  dht.begin();  
}

void loop() {
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  smokeLevel = analogRead(SMOKE_SENSOR_PIN);
  voltage = analogRead(VOLTAGE_SENSOR_PIN) * (5.0 / 4095.0);

  updateDisplay();
  sendToThingSpeak();

  delay(5000);
}

void sendToThingSpeak() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://api.thingspeak.com/update?api_key=" + String(thingspeak_api_key) +
                 "&field1=" + String(temperature) + 
                 "&field2=" + String(humidity) + 
                 "&field3=" + String(smokeLevel) +
                 "&field4=" + String(voltage, 2);

    http.begin(url);
    int httpCode = http.GET();
    
    if (httpCode > 0) {
      Serial.println("Data sent to ThingSpeak successfully!");
    } else {
      Serial.println("Error sending data.");
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected!");
  }
}

void updateDisplay() {
  bool smokeDetected = (smokeLevel > 1550);
  bool voltageHigh = (voltage > 3.0);

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  
  display.println("Temp: " + String(temperature) + " C");
  display.println("Humidity: " + String(humidity) + " %");
  display.println("Smoke: " + String(smokeLevel));
  display.println("Voltage: " + String(voltage, 2) + " V");

  if (voltageHigh) {
    display.println("High Voltage Detected!");
  } else {
    display.println("Normal Voltage");
  }

  if (smokeDetected) {
    display.println("Smoke Detected!");
  } else {
    display.println("No Smoke");
  }

  display.display();
}
