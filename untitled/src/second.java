import java.util.Scanner;

public class second
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
       for(int i = min; i < max; i++)
       {
         int product = productCount(i);
         System.out.println(i + " - Произведение: " + product);
       }
    }
    public static int productCount(int n)
    {
        String s = String.valueOf(n);
        int product = 1;
        for(int i = 0; i < s.length(); i++)
        {
            int right = s.length();
            if((right - i) % 2 == 0)
            {
                int count = s.charAt(i) - '0';
                 product *= count;
            }
        }
        return product;
    }
}
