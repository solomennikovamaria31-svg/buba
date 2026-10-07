package org.example;

public record Point(double x, double y) {

    public double distanceTo(Point other) {
        double difX = this.x - other.x;
        double difY = this.y - other.y;
        return (Math.sqrt(difX * difX + difY * difY));
    }
}
