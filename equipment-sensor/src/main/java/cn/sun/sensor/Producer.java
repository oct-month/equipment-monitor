package cn.sun.sensor;

import com.google.gson.Gson;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Properties;
import java.util.concurrent.Future;

public class Producer
{
    private static final Logger LOGGER = LogManager.getLogger();
    private static final Gson gson = new Gson();

    private static Properties config = new Properties();
    static {
        config.put("client.id", Config.kafkaClientId);
        config.put("bootstrap.servers", Config.kafkaServer);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    }
    private static KafkaProducer producer = new KafkaProducer<>(config);


    public static void send(SensorData sd)
    {
        String sdJson = gson.toJson(sd);
        LOGGER.debug(sdJson);
        final ProducerRecord<String, String> record = new ProducerRecord<>(Config.kafkaTopic, Config.KafkaKey, sdJson);
        Future future = producer.send(record, (md, e) -> {
            if (e != null) {
                LOGGER.error(e.getStackTrace());
            }
            else {
                producer.flush();
            }
        });
        try {
            future.get();
        }
        catch (Exception e) {
            LOGGER.error(e.getStackTrace());
        }
    }

    public static void close()
    {
        producer.close();
    }
}
