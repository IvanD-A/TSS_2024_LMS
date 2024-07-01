public class SimulacionNumerosAleatorios {
    public static void main(String[] args) {
        int cantidadNumeros = 10; // Cantidad de números a generar

        // Generamos números aleatorios entre 0 y 1
        for (int i = 0; i < cantidadNumeros; i++) {
            double numeroAleatorio = Math.random(); // Genera un número entre 0 (inclusive) y 1 (exclusivo)
            System.out.println("Número aleatorio " + (i + 1) + ": " + numeroAleatorio);
        }
    }
}
