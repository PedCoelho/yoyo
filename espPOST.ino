
#include "ESP8266WiFi.h"

#define ioio_circuit 4

const char server[] = "www.projetosmjv.com.br"; 

const char* MY_SSID = "MJVINNOVATION";
const char* MY_PWD =  "M059J408V";

bool enviando = false;
int portValue = 0;

//for continuous blink
int ledState = LOW;
unsigned long previousMillis = 0;
const long interval = 1000;


void setup()
{
  pinMode(ioio_circuit, INPUT);
  pinMode(LED_BUILTIN, OUTPUT); 
  Serial.begin(115200);
  Serial.print("Connecting to ");
  Serial.println(MY_SSID);
  WiFi.begin(MY_SSID, MY_PWD); 
  Serial.println("going into wl connect");
  
  while (WiFi.status() != WL_CONNECTED) //not connected,  ...waiting to connect
    {
      blinkLED(1,125);
      Serial.print(".");
      delay(1000);
     
    }
    
  Serial.println("wl connected");
  Serial.println("");
  Serial.println("Credentials accepted! Connected to wifi\n ");
  Serial.println("");
  blinkLED(5,125);
}

void loop() {
portValue = digitalRead(ioio_circuit);

  if(portValue == HIGH){

    if(enviando == false){
      
        blinkLED(2,125);
        
        WiFiClient client;
            
        //Serial.println("\nStarting connection to server..."); 
        // if you get a connection, report back via serial:
        if (client.connect(server, 80)) {
        //Serial.println("connected to server"); 
        String data = "Message=ESP_Ligado";
        //Serial.print("Requesting POST");
        
        // Send request to the server:
        client.println("POST /esp8266/server.php HTTP/1.1");
        client.println("Host: www.projetosmjv.com.br");
        client.println("User-Agent: ESP8266/1.0");
        client.println("Accept: */*");
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.print("Content-Length: ");
        client.println(data.length());
        client.println();
        client.print(data);

        enviando = true;
        // if (client.connected()) { 
        //   client.stop();  // DISCONNECT FROM THE SERVER
        // }
        // Serial.println("closing connection");
        }
    }
  }else{
    if(enviando == true){
      enviando = false;
      //digitalWrite(LED_BUILTIN, HIGH);
    }
   } 
  delay(100);
}


void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void blinkLED(int vezes, int timedDelay)
{
  for (int i = 1; i <= vezes; i++)
  {
     digitalWrite(LED_BUILTIN, LOW);
    delay(timedDelay);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(timedDelay);
  }

}
