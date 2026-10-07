package org.example;

public record Triangle(Point a, Point b, Point c) {

    private static final double eps = 1e-9;

    public double sideAB() {
        return a.distanceTo(b);
    }

    public double sideAC() {
        return a.distanceTo(c);
    }

    public double sideBC() {
        return b.distanceTo(c);
    }

    public double perimeter() {
        return sideAB() + sideAC() + sideBC();
    }

    public double area() {
        double ab = sideAB();
        double bc = sideBC();
        double ac = sideAC();
        double p = (ab + bc + ac) / 2.0;
        return Math.sqrt(p * (p - ab) * (p - bc) * (p - ac));
    }

    public boolean isEquilateral() {
      return Math.abs(sideAB() - sideBC()) < eps
              && Math.abs(sideAB() - sideAC()) < eps;
    }

    public boolean isIsosceles(){
        return Math.abs(sideAB() - sideAC()) < eps ||
                Math.abs(sideAB() - sideBC()) < eps ||
                Math.abs(sideBC() - sideAC()) < eps;
    }

    public boolean isRight(){
        double squareAB = sideAB()*sideAB();
        double squareAC = sideAC()*sideAC();
        double squareBC = sideBC()*sideBC();
        return Math.abs(squareAB - squareAC - squareBC) < eps
                || Math.abs(squareAC - squareAB - squareBC) < eps
                || Math.abs(squareBC - squareAB - squareAC) < eps;
    }

    public String type(){
       if(isEquilateral())
       {
           return "равносторонний";
       }
        if (isRight()) {
            return "прямоугольный";
        }
       if (isIsosceles()) {
           return "равнобедренный";
       }
           return "произвольный";
    }

    public boolean isTriangle(){
        return sideAB() < sideAC() + sideBC() - eps
                && sideAC() < sideBC() + sideAB() - eps
                && sideBC() < sideAB() + sideAC() - eps;
    }
}

