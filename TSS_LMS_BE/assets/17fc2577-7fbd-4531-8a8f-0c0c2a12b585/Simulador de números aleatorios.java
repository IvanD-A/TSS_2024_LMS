import java.util.Random;

public class RandomNumbersExample {
    public static void main(String[] args) {
        // Crear un objeto Random
        Random random = new Random();

        // Generar 5 números aleatorios entre 1 y 10
        for (int i = 0; i < 5; i++) {
            int numero = random.nextInt(10) + 1; // Genera un número entre 1 y 10 (ambos inclusive)
            System.out.println(numero);
        }
    }
}
