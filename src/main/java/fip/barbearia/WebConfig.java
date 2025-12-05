package fip.barbearia;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // permite todos os endpoints
                .allowedOrigins("http://localhost:3000") // seu frontend Next.js
                .allowedMethods("*"); // GET, POST, PUT, DELETE...
    }
}
