import java.util.Scanner;

public class Main
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
            if ( min >= 1000 && max >= min && max <= 10000 ) {
                break;
            }
            System.out.println("Неверный ввод попробуйте еще раз! ");
        }
         for (int i = min; i < max; i++) {
                int tenth = (i / 10) % 10;
                int hundred = (i / 100) % 10;
                if (tenth == 9 && hundred == 7 && i % 45 == 0) {
                    System.out.println(i);
                    count++;
                }
            }
        System.out.println("Количество: " + count);
    }
}