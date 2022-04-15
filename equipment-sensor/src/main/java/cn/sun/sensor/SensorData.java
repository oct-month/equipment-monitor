package cn.sun.sensor;

import lombok.Data;

import java.util.Date;

@Data
public class SensorData
{
    private String deviceId;
    private Date date;
    private float temperature;      // 温度
    private float humidity;         // 湿度
    private float no2;              // 二氧化氮
    private float so2;              // 二氧化硫
    private float pm25;             // PM2.5
    private float pm10;             // PM10
    private float sh2;              // 硫化氢
    private float o3;               // 臭氧
    private double longitude;       // 经度
    private double latitude;        // 纬度

    public SensorData()
    {
        this.date = new Date();
    }
}
