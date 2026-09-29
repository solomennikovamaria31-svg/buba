import java.util.Scanner;
import java.util.Random;
import static java.lang.System.out;

public class second
{
    public static void main(String[] args)
    {
        Scanner sr = new Scanner(System.in);
        int row;
        int column;
        int changeR;
        int changeC;
       System.out.println("Введите количество строк:");
      row = sr.nextInt();
        System.out.println("Введите количество столбцов:");
        column = sr.nextInt();
        System.out.println("Начальная матрица: ");
        int[][] matrix = Main.createMatrix(row, column);
        Main.printMatrix(matrix);
        System.out.println("Введите координаты строки и столбцов: ");
        changeR = sr.nextInt() - 1;
        changeC = sr.nextInt() - 1;
        System.out.println("Матрица после преобразования: ");
        findMin(matrix, changeC, changeR);
        Main.printMatrix(matrix);
        sr.close();
    }

    public static void findMin(int[][] matrix, int changeC, int changeR) {
        int minR = 0, minC = 0;
        int min = matrix[0][0];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (min > matrix[i][j]) {
                    min = matrix[i][j];
                    minR = i;
                    minC = j;
                }
            }
        }
        if(minR != changeR)
        {
            int[] curR = matrix[changeR];
            matrix[changeR] = matrix[minR];
            matrix[minR] = curR;
        }
        if(minC != changeC)
        {
            for(int i = 0; i < matrix.length; i++) {
                int curC = matrix[i][changeC];
                matrix[i][changeC] = matrix[i][minC];
                matrix[i][minC] = curC;
            }
        }
    }
}
