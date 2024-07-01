public class SimulacionNumerosAleatorios {
    public static void main(String[] args) {
        int cantidadNumeros = 5; // Cantidad de números a generar

        // Generamos números aleatorios entre 1 y 100
        for (int i = 0; i < cantidadNumeros; i++) {
            int numeroAleatorio = (int) (Math.random() * 100) + 1; // Entre 1 y 100
            System.out.println("Número aleatorio " + (i + 1) + ": " + numeroAleatorio);
        }
    }
}
