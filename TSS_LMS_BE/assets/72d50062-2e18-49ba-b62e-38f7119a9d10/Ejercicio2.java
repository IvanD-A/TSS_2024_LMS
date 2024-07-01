class Ejercicio2 {
    public static void main(String[] args) {
        System.out.println(generarValorSimulado(1, 2, 3));
    }

    public static double generarValorSimulado(double pesimista, double probable, double optimista) {
        double a = pesimista;
        double b = probable;
        double c = optimista;
        double x = 0;
        
        congruencialMixto generador = new congruencialMixto();
        double R = generador.generarValorAleatorio();
        
        if (R <= ((b - a) / (c - a))) {
            x = c - Math.sqrt((c - a) * (b - a) * R);
        } else {
            x = c - Math.sqrt((c - a) * (c - b) * (1 - R));
        }
        
        return x;
    }
}

class congruencialMixto {
    public static double generarValor(int semilla, int cmultiplicativa, int modulo) {
        int i, numero;
        double numero2 = 0;
        
        for (i = 0; i <= 20; i++) {
            numero = (cmultiplicativa * semilla) % modulo;
            numero2 = (double) numero / (double) (modulo - 1);
            semilla = numero;
        }
        
        return numero2;
    }
    
    public static double generarValorAleatorio() {
        double numero = (double) (Math.random());
        return numero;
    }
}