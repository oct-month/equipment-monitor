package cn.sun.sensor;

public class Config
{
    public static final int port = 8083;
    public static final String paramPath = "param.dat";
    public static final String kafkaServer = "equipment-kafka:9092";
    public static final String kafkaTopic = "sensor";
    public static final String KafkaKey = "sensor";
    public static final String kafkaClientId = "equipment-sensor";
}
