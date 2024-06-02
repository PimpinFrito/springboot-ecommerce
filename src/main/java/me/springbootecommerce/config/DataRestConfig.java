package me.springbootecommerce.config;

import me.springbootecommerce.entity.*;
import org.aspectj.weaver.ast.Or;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Arrays;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};
        Class[] classesToBlock = {Product.class, ProductCategory.class, Country.class, State.class, Order.class};
        Arrays.asList(classesToBlock).forEach(target -> disableHttpMethods(target, config, theUnsupportedActions));

        //Expose ids for sidebar menu
        this.exposeIds(config);

    }

    private void  disableHttpMethods(Class theClass, RepositoryRestConfiguration config,  HttpMethod[] unsupportedActions){

        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));

    }

    private void exposeIds(RepositoryRestConfiguration config){
        config.exposeIdsFor(ProductCategory.class);
        config.exposeIdsFor(Product.class);
    }

}
