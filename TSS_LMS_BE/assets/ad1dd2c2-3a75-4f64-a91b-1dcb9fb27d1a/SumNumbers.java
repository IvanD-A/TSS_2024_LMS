class SumNumbers {
    public static void main(String[] args) {
        System.out.println(calcularSuma(1, 10));
    }
    
    public static int calcularSuma(int inicio, int fin) {
        int sum = 0;
        
        // Sumar los números desde 'inicio' hasta 'fin'
        for (int i = inicio; i <= fin; i++) {
            sum += i;
        }
        
        return sum;
    }
}