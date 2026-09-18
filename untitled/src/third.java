import java.util.Scanner;

public class third
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        int max;
        int min;
        int count = 0;
        while(true) {
            System.out.println("Введите минимум: ");
            min = sc.nextInt();
            System.out.println("Введите максимум: ");
            max = sc.nextInt();
            if (max >= min) {
                break;
            }
            System.out.println("Неверный ввод попробуйте еще раз! ");
        }
        for(int i = 1000; i < 2000; i++)
        {
          boolean even = isEven(i);
          System.out.println(i + " - " + even);
        }
    }
    public static int maximum(int n) {
        int max = 0;
        int count = 0;
        String s = String.valueOf(n);
        int[] d = new int[s.length()];
        for (int i = 0; i < s.length(); i++) {
            d[i] = s.charAt(i) - '0';
        }
        for (int j : d) {
            if (j > max) {
                max = j;
            }
        }
        for (int i = 0; i < d.length; i++)
        {
            if(d[i] == max)
            {
                count++;
            }
        }
        return count;
    }
    public static int minimum(int n)
    {
        int min = 9;
        int count = 0;
        String s = String.valueOf(n);
        int[] d = new int[s.length()];
        for(int i = 0; i < s.length(); i++)
        {
            d[i] = s.charAt(i) - '0';
        }
        for(int i = 0; i < d.length; i++)
        {
            if(d[i] < min)
            {
                min = d[i];
            }
        }
        for (int i = 0; i < d.length; i++)
        {
            if(d[i] == min)
            {
                count++;
            }
        }
        return count;
    }
    public static boolean isEven(int n)
    {
        int max = maximum(n);
        int min = minimum(n);
        return (max - min) % 2 == 0;
    }
}
