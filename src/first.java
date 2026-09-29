import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;
import static java.lang.System.out;

public class first {
    public static void main(String[] args) {
        Scanner sr = new Scanner(System.in);
        out.println("Введите количество строк: ");
        int row = sr.nextInt();
        out.println("Введите количество столбцов: ");
        int column = sr.nextInt();
        int[][] matrix = Main.createMatrix(row, column);
        out.println("До сортировки: ");
        Main.printMatrix(matrix);
        matrix = sortNeg(matrix);
        out.println("После сортировки: ");
        Main.printMatrix(matrix);
        sr.close();
    }

    public static int countNegative(int[] row) {
        int c = 0;
        for (int i : row) {
            if (i < 0) {
                c++;
            }
        }
        return c;
    }

    public static int countZero(int[] row) {
        int c = 0;
        for (int i : row) {
            if (i == 0) {
                c++;
            }
        }
        return c;
    }

    public static int[][] sortNeg(int[][] matrix) {
        return Arrays.stream(matrix)
                .sorted(
                        Comparator
                                .comparingInt((int[] r) -> countNegative(r))
                                .thenComparingInt(r -> countZero(r))
                                .reversed()
                )
                .toArray(int[][]::new);
    }
}