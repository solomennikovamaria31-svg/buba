package org.example;

import org.junit.Assert;
import org.junit.Test;
import static org.junit.Assert.*;

public class TriangleTest {

    private static final double eps = 1e-9;

    @Test
    public void perimeter() {
        Triangle t = new Triangle(
                new Point(0, 0),
                new Point(4, 0),
                new Point(0, 3)
        );
        Assert.assertEquals(12.0, t.perimeter(), eps);
    }

    @Test
    public void area() {
        Triangle t = new Triangle(
                new Point(0, 0),
                new Point(4, 0),
                new Point(0, 3)
        );
        Assert.assertEquals(6.0, t.area(), eps);
    }

    @Test
    public void isEquilateral() {
        Triangle t = new Triangle(
                new Point(0, 0),
                new Point(1, 0),
                new Point(0.5, Math.sqrt(3) / 2)
        );
        assertTrue(t.isEquilateral());
    }

    @Test
    public void isIsosceles() {
        Triangle t = new Triangle(
                new Point(0, 0),
                new Point(2, 0),
                new Point(1, 3)
        );
        assertTrue(t.isIsosceles());
    }

    @Test
    public void isRight() {
        Triangle t = new Triangle(
                new Point(0, 0),
                new Point(4, 0),
                new Point(0, 3)
        );
        assertTrue(t.isRight());
    }

    @Test
    public void type() {
        Triangle t = new Triangle(
                new Point(0, 0),
                new Point(4, 0),
                new Point(0, 3)
        );
        Assert.assertEquals("прямоугольный", t.type());
    }

    @Test
    public void isTriangle() {
        Triangle ok = new Triangle(
                new Point(0, 0),
                new Point(4, 0),
                new Point(0, 3)
        );
        assertTrue(ok.isTriangle());
        Triangle bad = new Triangle(
                new Point(0, 0),
                new Point(1, 0),
                new Point(2, 0)
        );
        assertFalse(bad.isTriangle());
    }
}