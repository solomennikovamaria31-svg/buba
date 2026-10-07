package org.example;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args)
    {
        Scanner sr = new Scanner(System.in);
        int n;
        System.out.println("Введите количество треугольников:");
        n = sr.nextInt();
        List<Triangle> triangles = new ArrayList<>();
        for(int i = 0; i < n; i++)
        {
            System.out.println("Треугольник " + (i + 1) + " : ");
            Triangle t;
            do {
                Point a = writePoint(sr, "A");
                Point b = writePoint(sr, "B");
                Point c = writePoint(sr, "C");
                t = new Triangle(a, b, c);

                if (!t.isTriangle()) {
                    System.out.println("Такого треугольника не существует! Попробуйте ещё раз:\n");
                }
            } while (!t.isTriangle());
            triangles.add(t);
        }

        Map<String, List<Triangle>> groups = new LinkedHashMap<>();
        groups.put("равносторонний", new ArrayList<>());
        groups.put("прямоугольный", new ArrayList<>());
        groups.put("равнобедренный", new ArrayList<>());
        groups.put("произвольный", new ArrayList<>());

        for (Triangle t : triangles) {
            groups.get(t.type()).add(t);
        }

        for(String type : groups.keySet()){
            List<Triangle> list  = groups.get(type);
            int size = list.size();
            System.out.println("Количество треугольников вида " + type + " : " + size);

            if(list.isEmpty()){
                System.out.println("Нет треугольников такого вида! \n");
                continue;
            }
            double maxA = list.getFirst().area();
            double minA = maxA;
            double maxP = list.getFirst().perimeter();
            double minP = maxP;
            for (Triangle triangle : list) {
                if (maxA < triangle.area()) {
                    maxA = triangle.area();
                }
                if (minA > triangle.area()) {
                    minA = triangle.area();
                }
                if(maxP < triangle.perimeter()){
                    maxP = triangle.perimeter();
                }
                if(minP > triangle.perimeter()){
                    minP = triangle.perimeter();
                }
            }
            System.out.println("Наибольшая площадь: " + maxA);
            System.out.println("Наименьшая площадь: " + minA);
            System.out.println("Наибольший периметр: " + maxP);
            System.out.println("Наименьший периметр: " + minP);
        }
        sr.close();
    }

    private static Point writePoint(Scanner sr, String name)
    {
        System.out.println("  Точка " + name + " (x, y): ");
        double x = sr.nextDouble();
        double y = sr.nextDouble();
        return new Point(x,y);
    }
}
