package cn.sun.sensor;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class App 
{
    private static final Logger LOGGER = LogManager.getLogger();

    public static void main( String[] args )
    {
        SensorServer acquireData = new SensorServer();
        try {
            LOGGER.info("Server start on " + Config.port);
            acquireData.start();
        }
        catch (InterruptedException e) {
            LOGGER.error(e);
        }
    }
}
