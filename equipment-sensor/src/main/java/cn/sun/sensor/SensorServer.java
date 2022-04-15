package cn.sun.sensor;

import java.io.*;
import java.text.SimpleDateFormat;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.jnrsmcu.sdk.netdevice.*;

public class SensorServer
{
    private static final Logger LOGGER = LogManager.getLogger();

    private RSServer rsServer;

    public SensorServer()
    {
        File temp = null;
        InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(Config.paramPath);
        try {
            temp = File.createTempFile("param-temp", ".dat");
            LOGGER.info("param-temp file in: " + temp.getAbsolutePath());
            temp.deleteOnExit();
            int idx = 0;
            byte[] bytes = new byte[1024];
            FileOutputStream fo = new FileOutputStream(temp);
            while ((idx = is.read(bytes)) != -1){
                fo.write(bytes, 0, idx);
                fo.flush();
            }
            fo.close();
            is.close();
        }
        catch (IOException e) {
            LOGGER.error(e);
        }

        if (temp != null) {
            this.rsServer = RSServer.Initiate(Config.port, temp.getAbsolutePath());
        }
        else {
            LOGGER.error("param-temp file write error.");
        }
    }

    public SensorServer(int port, String filePath)
    {
        this.rsServer = RSServer.Initiate(port, filePath);
    }

    public SensorServer(int port)
    {
        this.rsServer = RSServer.Initiate(port);
    }

    public void addDataListener()
    {
        // 添加监听
        rsServer.addDataListener(new IDataListener() {
            // 校时指令应答处理
            public void receiveTimmingAck(TimmingAck data) {
                LOGGER.debug("校时应答->设备编号:" + data.getDeviceId()
                        + "\t执行结果：" + data.getStatus());
            }

            // 遥控指令应答处理
            public void receiveTelecontrolAck(TelecontrolAck data) {
                LOGGER.debug("遥控应答->设备编号:" + data.getDeviceId()
                        + "\t继电器编号:" + data.getRelayId() + "\t执行结果:"
                        + data.getStatus());
            }

            // 已存储数据接收处理
            public void receiveStoreData(StoreData data) {
                // 遍历节点数据。数据包括网络设备的数据以及各个节点数据。温湿度数据存放在节点数据中
                for (NodeData nd : data.getNodeList()) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
                    String str = sdf.format(nd.getRecordTime());
                    LOGGER.debug("存储数据->设备地址:" + data.getDeviceId()
                            + "\t节点:" + nd.getNodeId() + "\t温度:" + nd.getTem()
                            + "\t湿度:" + nd.getHum() + "\t存储时间:" + str);
                }
            }

            // 实时数据接收处理
            public void receiveRealtimeData(RealTimeData data) {
                SensorData sensorData = new SensorData();
                sensorData.setDeviceId("" + data.getDeviceId());
                // 遍历节点数据。数据包括网络设备的数据以及各个节点数据。温湿度数据存放在节点数据中
                sensorData.setLongitude(data.getLng());
                sensorData.setLatitude(data.getLat());

                for (NodeData nd : data.getNodeList()) {
                    switch (nd.getNodeId()) {
                        case 1: // PM节点
                            sensorData.setPm10(nd.getTem() * 10);
                            sensorData.setPm25(nd.getHum() * 10);
                            sensorData.setLatitude(nd.getLat());
                            sensorData.setLongitude(nd.getLng());
                            break;
                        case 2:     // 温湿度节点
                            sensorData.setTemperature(nd.getTem());
                            sensorData.setHumidity(nd.getHum());
                            break;
                        case 8:     // 臭氧节点
                            sensorData.setO3(nd.getTem());
                            break;
                        case 10:    // 硫化氢节点
                            sensorData.setSh2(nd.getTem());
                            break;
                        case 13:    // 二氧化氮节点
                            sensorData.setNo2(nd.getTem());
                            break;
                        case 14:    // 二氧化硫节点
                            sensorData.setSo2(nd.getTem());
                            break;
                    }
                    // LOGGER.debug("实时数据->设备地址:" + data.getDeviceId()
                    //         + "\t节点:" + nd.getNodeId() + "\t温度:" + nd.getTem()
                    //         + "\t湿度:" + nd.getHum() + "\t经度:" + data.getLng()
                    //         + "\t纬度:" + data.getLat() + "\t坐标类型:"
                    //         + data.getCoordinateType() + "\t继电器状态:"
                    //         + data.getRelayStatus());
                }

                Producer.send(sensorData);
            }

            // 登录数据接收处理
            public void receiveLoginData(LoginData data) {
                LOGGER.debug("登录->设备地址:" + data.getDeviceId());
            }

            public void receiveParamIds(ParamIdsData data) {
                String str = "设备参数编号列表->设备编号：" + data.getDeviceId()
                        + "\t参数总数量：" + data.getTotalCount() + "\t本帧参数数量："
                        + data.getCount() + "\r\n";
                for (int paramId : data.getPararmIdList())// 遍历设备中参数id编号
                {
                    str += paramId + ",";
                }
                LOGGER.debug(str);
            }

            public void receiveParam(ParamData data) {
                String str = "设备参数->设备编号：" + data.getDeviceId() + "\r\n";

                for (ParamItem pararm : data.getParameterList()) {
                    str += "参数编号："
                            + pararm.getParamId()
                            + "\t参数描述："
                            + pararm.getDescription()
                            + "\t参数值："
                            + (pararm.getValueDescription() == null ? pararm
                            .getValue() : pararm.getValueDescription()
                            .get(pararm.getValue())) + "\r\n";
                }
                LOGGER.debug(str);
            }

            public void receiveWriteParamAck(WriteParamAck data) {
                String str = "下载设备参数->设备编号：" + data.getDeviceId() + "\t参数数量："
                        + data.getCount() + "\t"
                        + (data.isSuccess() ? "下载成功" : "下载失败");
                LOGGER.debug(str);
            }

            public void receiveTransDataAck(TransDataAck data) {
                String str = "数据透传->设备编号：" + data.getDeviceId() + "\t响应结果："
                        + data.getData() + "\r\n字节数：" + data.getTransDataLen();
                LOGGER.debug(str);
            }
        });
    }

    public void start() throws InterruptedException
    {
        addDataListener();
        rsServer.start();
        Producer.close();
    }
}
