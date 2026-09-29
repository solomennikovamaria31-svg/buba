import java.util.Scanner;
import java.util.Random;

import static java.lang.System.out;

public class Main
{
    public static int[][] createMatrix(int row, int column)
    {
        Random random = new Random();
        int[][] entier = new int[row][column];
        for(int i = 0; i < row; i++)
        {
            for(int j = 0; j < column; j++) {
                entier[i][j] = random.nextInt(101) - 50;
            }
        }
        return entier;
    }

    public static void printMatrix(int[][] matrix)
    {
        for (int[] row : matrix)
        {
            for (int val : row)
            {
                System.out.printf("%5d", val);
            }
            System.out.println();
        }
    }
}