package cn.sun.sensor;


import com.google.gson.Gson;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Properties;
import java.util.Random;
import java.util.concurrent.Future;

public class Demo
{
    private static final Logger LOGGER = LogManager.getLogger();
    private static final String server = "www.ablocker.top:9092";
    private static final String topic = "test";

    public static void producer() throws Exception
    {
        Properties config = new Properties();
        config.put("client.id", InetAddress.getLocalHost().getHostName() + new Random().nextInt());
        config.put("bootstrap.servers", server);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        config.put("retries", 3);

        KafkaProducer producer = new KafkaProducer<>(config);
        final ProducerRecord<String, String> record = new ProducerRecord<>(topic, "key", new Gson().toJson(new SensorData()));
        Future<RecordMetadata> future = producer.send(record, (md, ex) -> {
            if (ex != null) {
                LOGGER.error(ex.getStackTrace());
            }
            else {
                LOGGER.debug("Sent msg to " + md.partition() + " with offset " + md.offset() + " at " + md.timestamp());;
            }
            producer.flush();
        });
        future.get();
        producer.close();
    }

    public static void consumer() throws UnknownHostException
    {
        Properties config = new Properties();
        config.put("client.id", InetAddress.getLocalHost().getHostName() + new Random().nextInt());
        config.put("bootstrap.servers", server);
        config.put("group.id", "foo");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());

        KafkaConsumer consumer = new KafkaConsumer<>(config);
        consumer.subscribe(Collections.singletonList(topic));
        while (true) {
            try {
                final ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(100));
                for (ConsumerRecord<String, String> record : records) {
                    LOGGER.debug("收到消息：(" + record.key() + ", " + record.value() + ") at offset " + record.offset());
                }
                consumer.commitSync();
            }
            catch (Exception e) {
                consumer.close();
                LOGGER.error(e.getStackTrace());
            }
        }
    }

    public static void main(String[] args)
    {
        try {
            // producer();
            Date date = new Date();
            LOGGER.debug(date);
        }
        catch (Exception e) {
            LOGGER.error(e.getStackTrace());
        }
    }
}
