package gzh.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;


/**
 * @Author:gzh
 * @Date: 2022/4/20 10:35
 */
@Configuration
public class WebSocketConfig {
    /**
     * 使用springboot内置tomcat需要该bean，打war包则注释掉该bean
     */
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

}