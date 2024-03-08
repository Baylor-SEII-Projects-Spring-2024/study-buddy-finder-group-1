package studybuddy.api.location;

import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.*;

@Data
@Entity
@Table(name = studybuddy.api.location.Location.TABLE_NAME)
public class Location {
    public static final String TABLE_NAME = "LOCATIONS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "LOCATION_ID")
    Long id;

    @Getter
    @Column(name = "NAME")
    String name;

    @Getter
    @Column(name = "ADDRESS")
    String address;

    @Getter
    @Column(name = "CAPCITY")
    int capacity;

    @Getter
    @Column(name = "AVAILABLE_START")
    Date hoursAvailableStart;

    @Getter
    @Column(name = "AVAILABLE_END")
    Date hoursAvailableEnd;




    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setHoursAvailableStart(Date hoursAvailableStart) {
        this.hoursAvailableStart = hoursAvailableStart;
    }

    public void setHoursAvailableEnd(Date hoursAvailableEnd) {
        this.hoursAvailableEnd = hoursAvailableEnd;
    }

    @Override
    public boolean equals(Object p){
        if(p == this){
            return true;
        }

        if (p == null || p.getClass() != this.getClass()){
            return false;
        }

        Location other = (Location) p;

        return (other.id == this.id) && (other.name == this.name) && ( other.address == this.address)
                && (other.capacity == this.capacity) && (other.hoursAvailableStart == this.hoursAvailableStart)
                && (other.hoursAvailableEnd == this.hoursAvailableEnd);
    }

    @Override
    public int hashCode() {
        final int prime = 7;
        int result =1;

        long num = id.longValue();

        result = prime * result + ((int) num);

        result = (prime * result) + ((name == null) ? 0: name.hashCode());
        result = (prime * result) + ((address == null) ? 0: address.hashCode());
        result = prime * result + capacity;
        result = (prime * result) + ((hoursAvailableStart == null) ? 0: hoursAvailableStart.hashCode());
        result = (prime * result) + ((hoursAvailableEnd == null) ? 0: hoursAvailableEnd.hashCode());

        return result;
    }

}
