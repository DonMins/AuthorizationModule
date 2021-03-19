package com.example.testspring.demo;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@SpringBootTest
class DemoApplicationTests {
    public static void main(String[] args) {
        int m = 0 ;
        int stream = 0;
        int forr = 0;

        while (m<5) {
            List<Integer> list = new Random()
                    .ints(0, 1000)
                    .limit(1000000)
                    .boxed()
                    .collect(Collectors.toList());

            long startTime = System.currentTimeMillis();
            long f = list.stream().filter(row->row>80).reduce(0, Integer::sum);
            long endTime = System.currentTimeMillis();
            long different1 = endTime - startTime;
            System.out.println("stream time  " + different1);

            startTime = System.currentTimeMillis();
            int k = 0;
            for (int i : list) {
                if (i > 80) k+=i;
            }

            endTime = System.currentTimeMillis();
            long different2 = endTime - startTime;
            System.out.println("for time  " + different2);

            if (different2 > different1) {
                stream++;
            } else {
                forr++;
            }

            m++;
        }
        System.out.println("stream " + stream +" vs  for " + forr );
    }

}
